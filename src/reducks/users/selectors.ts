import { AppState } from 'reducks/store/store'
import { createSelector } from 'reselect'

const usersSelector = (state: AppState) => state.users

export const getUserId = createSelector([usersSelector], (state) => state.uid)
