import { AnyAction } from 'redux'
import initialState from '../store/initialState'
import { ProductsState } from './types'

export const ProductsReducer = (state: ProductsState = initialState.products, action: AnyAction): ProductsState => {
  switch (action.type) {
    default:
      return state
  }
}
