import { fetchOrdersHistoryAction, fetchProductsInCartActoin, signInAction, signOutAction } from './actions'
import { push } from 'connected-react-router'
import { AnyAction } from 'redux'
import { ThunkAction } from 'redux-thunk'
import { auth, db, FirebaseTimestamp } from '../../firebase/index'
import { AppState } from 'reducks/store/store'
import { AddedProduct, UserState } from './types'
import { OrderHistoty } from 'reducks/products/types'

export const fetchProductsInCart = (products: AddedProduct[]): ThunkAction<void, void, unknown, AnyAction> => {
  return async (dispatch) => {
    dispatch(fetchProductsInCartActoin(products))
  }
}

export const fetchOrderedHistory = (): ThunkAction<void, AppState, unknown, AnyAction> => {
  return async (dispatch, getState) => {
    const uid = getState().users.uid
    const list: OrderHistoty[] = []

    db.collection('users')
      .doc(uid)
      .collection('orders')
      .orderBy('updated_at', 'desc')
      .get()
      .then((snapshots) => {
        snapshots.forEach((snapshot) => {
          const data = snapshot.data() as OrderHistoty
          list.push(data)
        })
        dispatch(fetchOrdersHistoryAction(list))
      })
  }
}

export const addProductToCart = (addedProduct: AddedProduct): ThunkAction<void, AppState, unknown, AnyAction> => {
  return async (dispatch, getState) => {
    const uid = getState().users.uid
    const cartRef = db.collection('users').doc(uid).collection('cart').doc()
    addedProduct['cartId'] = cartRef.id
    await cartRef.set(addedProduct)
    dispatch(push('/'))
  }
}

export const listenAuthState = (): ThunkAction<void, void, unknown, AnyAction> => {
  return async (dispatch) => {
    return auth.onAuthStateChanged((user) => {
      if (user) {
        const uid = user.uid
        db.collection('users')
          .doc(uid)
          .get()
          .then((snapshot) => {
            const data = snapshot.data() as UserState
            if (!data) return
            dispatch(
              signInAction({
                isSignedIn: true,
                orders: data.orders ? data.orders : [],
                role: data.role,
                uid: uid,
                username: data.username,
                cart: data.cart ? data.cart : [],
              })
            )
          })
      } else {
        dispatch(push('/signin'))
      }
    })
  }
}

export const signIn = (email: string, password: string): ThunkAction<void, void, unknown, AnyAction> => {
  return async (dispatch) => {
    if (email === '' || password === '') {
      alert('???????????????????????????????????????')
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
            orders: data.orders ? data.orders : [],
            role: data.role,
            uid: data.uid,
            username: data.username,
            cart: data.cart ? data.cart : [],
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
      alert('???????????????????????????????????????')
      return false
    }

    if (password !== confirmPassword) {
      alert('????????????????????????????????????????????????????????????????????????')
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

export const signOut = (): ThunkAction<void, void, unknown, AnyAction> => {
  return async (dispatch) => {
    auth.signOut().then(() => {
      dispatch(signOutAction())
      dispatch(push('/signin'))
    })
  }
}

export const resetPassword = (email: string): ThunkAction<void, void, unknown, AnyAction> => {
  return async (dispatch) => {
    if (email === '') {
      alert('??????????????????????????????')
      return false
    }
    auth
      .sendPasswordResetEmail(email)
      .then(() => {
        alert('?????????????????????????????????????????????????????????????????????????????????????????????')
        dispatch(push('/signin'))
      })
      .catch(() => {
        alert('????????????????????????????????????????????????')
      })
  }
}
