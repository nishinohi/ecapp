import { OrderHistoty } from 'reducks/products/types'
import {
  AddedProduct,
  FetchOrdersHistoryAction,
  FetchProductsInCartActoin,
  FETCH_ORDERS_HISTORY,
  FETCH_PRODUCTS_IN_CART,
  SignInAction,
  SignOutAction,
  SIGN_IN,
  SIGN_OUT,
  UserState,
} from './types'

export const signInAction = (userState: UserState): SignInAction => {
  return {
    type: SIGN_IN,
    payload: {
      isSignedIn: true,
      orders: userState.orders,
      role: userState.role,
      uid: userState.uid,
      username: userState.username,
      cart: userState.cart,
    },
  }
}

export const signOutAction = (): SignOutAction => {
  return {
    type: SIGN_OUT,
    payload: {
      isSignedIn: false,
      orders: [],
      role: '',
      uid: '',
      username: '',
      cart: [],
    },
  }
}

export const fetchProductsInCartActoin = (products: AddedProduct[]): FetchProductsInCartActoin => {
  return {
    type: FETCH_PRODUCTS_IN_CART,
    payload: products,
  }
}

export const fetchOrdersHistoryAction = (history: OrderHistoty[]): FetchOrdersHistoryAction => {
  return {
    type: FETCH_ORDERS_HISTORY,
    payload: history,
  }
}
