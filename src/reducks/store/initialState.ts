import { UserState } from 'reducks/users/types'

const initialState: UsersState = {
  users: {
    isSignedIn: false,
    role: '',
    uid: '',
    username: '',
  },
}

type UsersState = {
  users: UserState
}

export default initialState
