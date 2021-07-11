import { AnyAction } from 'redux'
import { ThunkAction } from 'redux-thunk'
import { push } from 'connected-react-router'
import { db, FirebaseTimestamp } from '../../firebase'
import { Image, Size } from 'components/Products/types'
import { ProductData } from './types'
import { fetchProductsAction } from './actions'

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
