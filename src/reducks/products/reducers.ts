import initialState from '../store/initialState'
import { FETCH_PRODUCTS, ProductsAction, ProductsState } from './types'

export const ProductsReducer = (
  state: ProductsState = initialState.products,
  action: ProductsAction
): ProductsState => {
  switch (action.type) {
    case FETCH_PRODUCTS:
      return {
        ...state,
        list: [...action.payload],
      }
    default:
      return state
  }
}
