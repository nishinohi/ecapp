import { createStore as reduxCreateStore, combineReducers, Store, applyMiddleware, Reducer } from 'redux'
import { UsersReducer } from 'reducks/users/reducers'
import { connectRouter, routerMiddleware, RouterState } from 'connected-react-router'
import { History } from 'history'
import { UserState } from 'reducks/users/types'

export type AppState = {
  router: Reducer<RouterState>
  users: UserState
}

export default function createStore(history: History): Store {
  return reduxCreateStore(
    combineReducers({
      router: connectRouter(history),
      users: UsersReducer,
    }),
    applyMiddleware(routerMiddleware(history))
  )
}
