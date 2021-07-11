import { Image, Size } from 'components/Products/types'
import firebase from 'firebase/app'

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

export type ProductsAction = {
  type: typeof FETCH_PRODUCTS
  payload: ProductData[]
}
