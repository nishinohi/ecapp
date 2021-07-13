import { Image, Size } from 'components/Products/types'
import firebase from 'firebase/app'
import { AddedProduct } from 'reducks/users/types'

export type ProductsState = {
  list: ProductData[]
}

export type ProductData = {
  id: string
  category: string
  description: string
  gender: string
  name: string
  price: number
  images: Image[]
  sizes: Size[]
  updated_at: firebase.firestore.Timestamp
  created_at?: firebase.firestore.Timestamp
}

export const FETCH_PRODUCTS = 'FETCH_PRODUCTS'
export const DELETE_PRODUCTS = 'DELETE_PRODUCTS'

export type ProductsAction = {
  type: typeof FETCH_PRODUCTS | typeof DELETE_PRODUCTS
  payload: ProductData[]
}
