import { AnyAction } from 'redux'
import { ThunkAction } from 'redux-thunk'
import { push } from 'connected-react-router'
import { db, FirebaseTimestamp } from '../../firebase'

const productRef = db.collection('products')

export const saveProduct = (
  name: string,
  description: string,
  category: string,
  gender: string,
  price: string
): ThunkAction<void, void, unknown, AnyAction> => {
  return async (dispatch) => {
    const timeStamp = FirebaseTimestamp.now()

    const data = {
      id: '',
      category: category,
      description: description,
      gender: gender,
      name: name,
      price: parseInt(price, 10),
      updated_at: timeStamp,
      created_at: timeStamp,
    }
    const ref = productRef.doc()
    const id = ref.id
    data.id = id

    return productRef
      .doc(id)
      .set(data)
      .then(() => {
        dispatch(push('/'))
      })
      .catch((error) => {
        throw new Error(error)
      })
  }
}
