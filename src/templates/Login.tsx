import React from 'react'
import { useDispatch } from 'react-redux'
import { signIn } from 'reducks/users/operations'

const Login = (): JSX.Element => {
  const dispath = useDispatch()

  return (
    <div>
      <h2>ログイン</h2>
      <button onClick={() => dispath(signIn())}>ログインするお</button>
    </div>
  )
}

export default Login
