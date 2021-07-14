import { AnyAction } from 'redux'
import { ThunkAction } from 'redux-thunk'
import { push } from 'connected-react-router'
import { db, FirebaseTimestamp } from '../../firebase'
import { Image, Size } from 'components/Products/types'
import { OrderedProduct, OrderHistoty, ProductData } from './types'
import { deleteProductAction, fetchProductsAction } from './actions'
import { AppState } from 'reducks/store/store'
import { AddedProduct } from 'reducks/users/types'

const productsRef = db.collection('products')

export const fetchProducts = (): ThunkAction<void, void, unknown, AnyAction> => {
  return async (dispatch) => {
    productsRef
      .orderBy('updated_at', 'desc')
      .get()
      .then((snapshots) => {
        const productsList: ProductData[] = []
        snapshots.forEach((snapshot) => {
          const productData = snapshot.data()
          productsList.push(productData as ProductData)
        })
        dispatch(fetchProductsAction(productsList))
      })
  }
}

export const orderProduct = (
  productsInCart: AddedProduct[],
  amount: number
): ThunkAction<void, AppState, unknown, AnyAction> => {
  return async (dispatch, getState) => {
    const uid = getState().users.uid
    const userRef = db.collection('users').doc(uid)
    const timestamp = FirebaseTimestamp.now()

    const batch = db.batch()

    const soldOutProducts: string[] = []
    const orderedProducts: OrderedProduct[] = []

    for (const productInCart of productsInCart) {
      const snapshot = await productsRef.doc(productInCart.productId).get()
      const sizes = snapshot.data()?.sizes as Size[]

      const updatedSizes: Size[] = sizes.map((size) => {
        if (size.size === productInCart.size) {
          if (size.quantity < productInCart.quantity) {
            soldOutProducts.push(productInCart.name)
            return size
          }

          return {
            size: size.size,
            quantity: size.quantity - productInCart.quantity,
          }
        }
        return size
      })

      orderedProducts.push({
        id: productInCart.productId,
        images: productInCart.images,
        name: productInCart.name,
        price: productInCart.price,
        size: productInCart.size,
      })

      batch.update(productsRef.doc(productInCart.productId), { sizes: updatedSizes })
      batch.delete(userRef.collection('cart').doc(productInCart.cartId))
    }

    if (soldOutProducts.length > 0) {
      const errorMsg = soldOutProducts.length > 1 ? soldOutProducts.join('と') : soldOutProducts[0]
      alert(`大変申し訳ありませ。${errorMsg}が在庫切れとなったため注文処理を中断しました`)
      return false
    }
    batch
      .commit()
      .then(() => {
        const orderRef = userRef.collection('orders').doc()
        const date = timestamp.toDate()
        const shippingDate = FirebaseTimestamp.fromDate(new Date(date.setDate(date.getDate() + 3)))

        const history: OrderHistoty = {
          id: orderRef.id,
          amount: amount,
          created_at: timestamp,
          products: orderedProducts,
          shippingDate: shippingDate,
          updated_at: timestamp,
        }

        orderRef.set(history)
        dispatch(push('/order/complete'))
      })
      .catch(() => {
        alert('注文処理に失敗しました。通信環境をご確認のうえ、もう一度お試しください')
      })
  }
}

export const deleteProduct = (id: string): ThunkAction<void, AppState, unknown, AnyAction> => {
  return async (dispatch, getState) => {
    productsRef
      .doc(id)
      .delete()
      .then(() => {
        const prevProducts = getState().products.list
        const nextProducts = prevProducts.filter((product) => product.id !== id)
        dispatch(deleteProductAction(nextProducts))
      })
  }
}

export const saveProduct = (
  id: string,
  name: string,
  description: string,
  category: string,
  gender: string,
  price: string,
  images: Image[],
  sizes: Size[]
): ThunkAction<void, void, unknown, AnyAction> => {
  return async (dispatch) => {
    const timeStamp = FirebaseTimestamp.now()
    const isNewCreate = id === ''

    const data: ProductData = {
      id: '',
      category: category,
      description: description,
      gender: gender,
      name: name,
      price: parseInt(price, 10),
      images: images,
      sizes: sizes,
      updated_at: timeStamp,
    }

    let commitId = id
    if (isNewCreate) {
      data.created_at = timeStamp
      data.id = productsRef.doc().id
      commitId = data.id
    }

    return productsRef
      .doc(commitId)
      .set(data, { merge: true })
      .then(() => {
        dispatch(push('/'))
      })
      .catch((error) => {
        throw new Error(error)
      })
  }
}
