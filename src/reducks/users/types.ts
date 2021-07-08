export type UserState = {
  isSignedIn?: boolean
  role: string
  uid: string
  username: string
}

export const SIGN_IN = 'SIGN_IN'
export type SignInAction = {
  type: typeof SIGN_IN
  payload: UserState
}

export const SIGN_OUT = 'SIGN_OUT'
export type SignOutAction = {
  type: typeof SIGN_OUT
  payload: UserState
}

export type UserAction = SignInAction | SignOutAction
