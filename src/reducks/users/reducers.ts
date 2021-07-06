import initialState, { UserState } from 'reducks/store/initialState'
import { UserAction } from './actions'
import * as Actions from './actions'

export const UsersReducer = (state: UserState = initialState.users, action: UserAction): UserState => {
  switch (action.type) {
    case Actions.SIGN_IN:
      return {
        ...state,
        ...action.payload,
      }
    default:
      return state
  }
}
