import initialState from 'reducks/store/initialState'
import { SIGN_IN, UserAction, UserState } from './types'

export const UsersReducer = (state: UserState = initialState.users, action: UserAction): UserState => {
  switch (action.type) {
    case SIGN_IN:
      return {
        ...state,
        ...action.payload,
      }
    default:
      return state
  }
}
