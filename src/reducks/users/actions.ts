import { SignInAction, SignOutAction, SIGN_IN, SIGN_OUT, UserState } from './types'

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
