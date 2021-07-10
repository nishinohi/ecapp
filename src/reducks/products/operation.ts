import { AnyAction } from 'redux'
import { ThunkAction } from 'redux-thunk'
import { push } from 'connected-react-router'
import { db, FirebaseTimestamp } from '../../firebase'
import { Image, Size } from 'components/Products/types'

const productRef = db.collection('products')

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

    const data = isNewCreate
      ? {
          id: '',
          category: category,
          description: description,
          gender: gender,
          name: name,
          price: parseInt(price, 10),
          images: images,
          sizes: sizes,
          updated_at: timeStamp,
          created_at: timeStamp,
        }
      : {
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

    if (isNewCreate) {
      const ref = productRef.doc()
      const id = ref.id
      data.id = id
    }

    return productRef
      .doc(id)
      .set(data, { merge: true })
      .then(() => {
        dispatch(push('/'))
      })
      .catch((error) => {
        throw new Error(error)
      })
  }
}
