import { AppState } from 'reducks/store/store'
import { createSelector } from 'reselect'

const productsSelector = (state: AppState) => state.products

export const getProducts = createSelector([productsSelector], (state) => state.list)
