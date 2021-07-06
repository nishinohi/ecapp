const initialState: UsersState = {
  users: {
    isSignedIn: false,
    uid: '',
    username: '',
  },
}

export type UsersState = {
  users: UserState
}

export type UserState = {
  isSignedIn: boolean
  uid: string
  username: string
}

export default initialState
