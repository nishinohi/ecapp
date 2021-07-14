import initialState from 'reducks/store/initialState'
import { FETCH_ORDERS_HISTORY, FETCH_PRODUCTS_IN_CART, SIGN_IN, SIGN_OUT, UserAction, UserState } from './types'

export const UsersReducer = (state: UserState = initialState.users, action: UserAction): UserState => {
  switch (action.type) {
    case SIGN_IN:
      return {
        ...state,
        ...action.payload,
      }
    case SIGN_OUT:
      return {
        ...action.payload,
      }
    case FETCH_PRODUCTS_IN_CART:
      return {
        ...state,
        cart: [...action.payload],
      }
    case FETCH_ORDERS_HISTORY:
      return {
        ...state,
        orders: [...action.payload],
      }
    default:
      return state
  }
}
