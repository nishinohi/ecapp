import { ProductsState } from 'reducks/products/types'
import { UserState } from 'reducks/users/types'

const initialState: InitialState = {
  products: {
    list: [],
  },
  users: {
    isSignedIn: false,
    role: '',
    uid: '',
    username: '',
    cart: [],
  },
}

type InitialState = {
  products: ProductsState
  users: UserState
}

export default initialState
