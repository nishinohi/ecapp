import { signInAction } from './actions'
import { push } from 'connected-react-router'
import { AppState } from 'reducks/store/store'
import { AnyAction } from 'redux'
import { ThunkAction } from 'redux-thunk'

export const signIn = (): ThunkAction<void, AppState, unknown, AnyAction> => {
  return async (dispatch, getState) => {
    const state = getState()
    const isSignedIn = state.users.isSignedIn

    if (!isSignedIn) {
      const url = 'https://api.github.com/users/deatiger'
      const response = await fetch(url)
        .then((res) => res.json())
        .catch(() => null)

      const username = response!.login
      dispatch(
        signInAction({
          isSignedIn: true,
          uid: '100',
          username: username,
        })
      )
      dispatch(push('/'))
    }
  }
}
