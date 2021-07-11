import { FETCH_PRODUCTS, ProductData, ProductsAction } from './types'

export const fetchProductsAction = (products: ProductData[]): ProductsAction => {
  return {
    type: FETCH_PRODUCTS,
    payload: products,
  }
}
