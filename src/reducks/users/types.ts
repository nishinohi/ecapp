import { Image } from 'components/Products/types'
import firebase from 'firebase/app'

export type UserAction = SignInAction | SignOutAction | FetchProductsInCartActoin

export type UserState = {
  isSignedIn?: boolean
  role: string
  uid: string
  username: string
  cart: AddedProduct[]
}

export const SIGN_IN = 'SIGN_IN'
export type SignInAction = {
  type: typeof SIGN_IN
  payload: UserState
}

export const SIGN_OUT = 'SIGN_OUT'
export type SignOutAction = {
  type: typeof SIGN_OUT
  payload: UserState
}

export type AddedProduct = {
  cartId: string
  added_at: firebase.firestore.Timestamp
  description: string
  gender: string
  images: Image[]
  name: string
  price: number
  productId: string
  quantity: number
  size: string
}

export const FETCH_PRODUCTS_IN_CART = 'FETCH_PRODUCTS_IN_CART'

export type FetchProductsInCartActoin = {
  type: typeof FETCH_PRODUCTS_IN_CART
  payload: AddedProduct[]
}
