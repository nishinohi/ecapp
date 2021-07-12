import { DELETE_PRODUCTS, FETCH_PRODUCTS, ProductData, ProductsAction } from './types'

export const fetchProductsAction = (products: ProductData[]): ProductsAction => {
  return {
    type: FETCH_PRODUCTS,
    payload: products,
  }
}

export const deleteProductAction = (products: ProductData[]): ProductsAction => {
  return {
    type: DELETE_PRODUCTS,
    payload: products,
  }
}
