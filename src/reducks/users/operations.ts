import { signInAction } from './actions'
import { push } from 'connected-react-router'
import { AnyAction } from 'redux'
import { ThunkAction } from 'redux-thunk'
import { auth, db, FirebaseTimestamp } from '../../firebase/index'

export const signIn = (email: string, password: string): ThunkAction<void, void, unknown, AnyAction> => {
  return async (dispatch) => {
    if (email === '' || password === '') {
      alert('必須項目を入力してください')
      return false
    }

    const { user } = await auth.signInWithEmailAndPassword(email, password)
    if (user) {
      const uid = user.uid
      const snapshot = await db.collection('users').doc(uid).get()
      const data = snapshot.data()
      if (data) {
        dispatch(
          signInAction({
            isSignedIn: true,
            role: data.role,
            uid: data.uid,
            username: data.username,
          })
        )
        dispatch(push('/'))
      }
    }
  }
}

export const signUp = (
  username: string,
  email: string,
  password: string,
  confirmPassword: string
): ThunkAction<void, void, unknown, AnyAction> => {
  return async (dispatch) => {
    // Validation
    if (username === '' || email === '' || password === '' || confirmPassword === '') {
      alert('必須項目を入力してください')
      return false
    }

    if (password !== confirmPassword) {
      alert('パスワードが一致しません。もう一度お試しください')
      return false
    }

    return auth.createUserWithEmailAndPassword(email, password).then((result) => {
      const user = result.user
      if (user) {
        const uid = user.uid
        const timestamp = FirebaseTimestamp.now()

        const userInitialData = {
          created_at: timestamp,
          email: email,
          role: 'customer',
          uid: uid,
          updated_at: timestamp,
          username: username,
        }

        db.collection('users')
          .doc(uid)
          .set(userInitialData)
          .then(() => {
            dispatch(push('/'))
          })
      }
    })
  }
}
