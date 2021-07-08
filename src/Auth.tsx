import React, { ReactNode } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppState } from 'reducks/store/store'
import { listenAuthState } from 'reducks/users/operations'
import { getIsSignedIn } from 'reducks/users/selectors'

type AuthProps = {
  children: ReactNode
}

const Auth = ({ children }: AuthProps): JSX.Element => {
  const dispatch = useDispatch()
  const selector = useSelector((state: AppState) => state)
  const isSignedIn = getIsSignedIn(selector)

  useEffect(() => {
    if (!isSignedIn) {
      dispatch(listenAuthState())
    }
  }, [])

  if (!isSignedIn) {
    return <></>
  }
  return <>{children}</>
}

export default Auth
