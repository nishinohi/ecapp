import { UserState } from 'reducks/store/initialState'

export const SIGN_IN = 'SIGN_IN'
export const signInAction = (userState: UserState): SignInAction => {
  return {
    type: SIGN_IN,
    payload: {
      isSignedIn: true,
      uid: userState.uid,
      username: userState.username,
    },
  }
}

type SignInAction = {
  type: typeof SIGN_IN
  payload: UserState
}

export const SIGN_OUT = 'SIGN_OUT'
export const signOutAction = (): SignOutAction => {
  return {
    type: SIGN_OUT,
    payload: {
      isSignedIn: false,
      uid: '',
      username: '',
    },
  }
}

type SignOutAction = {
  type: typeof SIGN_OUT
  payload: UserState
}

export type UserAction = SignInAction | SignOutAction
