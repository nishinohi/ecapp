import { push } from 'connected-react-router'
import React from 'react'
import { useDispatch } from 'react-redux'
import { signInAction } from 'reducks/users/actions'

const Login = (): JSX.Element => {
  const dispath = useDispatch()

  return (
    <div>
      <h2>ログイン</h2>
      <button
        onClick={() => {
          dispath(signInAction({ uid: '0001', username: 'nishinohi' }))
          dispath(push('/'))
        }}
      >
        ログインするお
      </button>
    </div>
  )
}

export default Login
