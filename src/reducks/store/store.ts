import { createStore as reduxCreateStore, combineReducers, Store, applyMiddleware, Reducer, compose } from 'redux'
import { UsersReducer } from 'reducks/users/reducers'
import { ProductsReducer } from 'reducks/products/reducers'
import { connectRouter, routerMiddleware, RouterState } from 'connected-react-router'
import { History } from 'history'
import { UserState } from 'reducks/users/types'
import thunk from 'redux-thunk'
import { ProductsState } from 'reducks/products/types'

export type AppState = {
  router: Reducer<RouterState>
  products: ProductsState
  users: UserState
}

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export default function createStore(history: History): Store {
  return reduxCreateStore(
    combineReducers({
      router: connectRouter(history),
      products: ProductsReducer,
      users: UsersReducer,
    }),
    composeEnhancers(applyMiddleware(routerMiddleware(history), thunk))
  )
}
