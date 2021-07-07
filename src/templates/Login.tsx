import { push } from 'connected-react-router'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppStore } from 'reducks/store/store'

const Login = (): JSX.Element => {
  const dispath = useDispatch()
  const selector = useSelector((state: AppStore) => state)

  console.log(selector.router)

  return (
    <div>
      <h2>ログイン</h2>
      <button onClick={() => dispath(push('/'))}>ログインするお</button>
    </div>
  )
}

export default Login
