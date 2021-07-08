import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppState } from 'reducks/store/store'
import { signOut } from 'reducks/users/operations'
import { getUserId, getUsername } from 'reducks/users/selectors'

const Home = (): JSX.Element => {
  const dispatch = useDispatch()
  const selector = useSelector((state: AppState) => state)
  const uid = getUserId(selector)
  const username = getUsername(selector)

  return (
    <div>
      <h2>Home</h2>
      <p>uid:{uid}</p>
      <p>username:{username}</p>
      <button onClick={() => dispatch(signOut())}>SIGN OUT</button>
    </div>
  )
}

export default Home
