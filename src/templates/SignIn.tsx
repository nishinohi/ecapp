import React from 'react'
import { TextInput, PrimaryButton } from 'components/UIkit'
import { useState } from 'react'
import { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { signIn } from 'reducks/users/operations'
import { push } from 'connected-react-router'

const SignIn = (): JSX.Element => {
  const dispatch = useDispatch()

  const [email, setEmail] = useState(''),
    [password, setPassword] = useState('')

  const inputEmail = useCallback((event) => setEmail(event.target.value), [setEmail])
  const inputPassword = useCallback((event) => setPassword(event.target.value), [setPassword])

  return (
    <div className="c-section-container">
      <h2 className="u-text__headline u-text-center">サインイン</h2>
      <div className="module-spacer--medium" />
      <TextInput
        fullWidth={true}
        label={'メールアドレス'}
        multiline={false}
        required={true}
        rows={1}
        value={email}
        type={'email'}
        onChange={inputEmail}
      />
      <TextInput
        fullWidth={true}
        label={'パスワード'}
        multiline={false}
        required={true}
        rows={1}
        value={password}
        type={'password'}
        onChange={inputPassword}
      />
      <div className="module-spacer--medium" />
      <div className="center">
        <PrimaryButton label={'サインイン'} onClick={() => dispatch(signIn(email, password))} />
        <div className="module-spacer--small" />
        <p className="clickable" onClick={() => dispatch(push('/signup'))}>
          アカウント登録
        </p>
        <p className="clickable" onClick={() => dispatch(push('/signin/reset'))}>
          パスワードを忘れた場合
        </p>
      </div>
    </div>
  )
}

export default SignIn
