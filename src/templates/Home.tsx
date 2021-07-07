import React from 'react'
import { useSelector } from 'react-redux'
import { AppState } from 'reducks/store/store'
import { getUserId, getUsername } from 'reducks/users/selectors'

const Home = (): JSX.Element => {
  const selector = useSelector((state: AppState) => state)
  const uid = getUserId(selector)
  const username = getUsername(selector)

  return (
    <div>
      <h2>Home</h2>
      <h3>uid:{uid}</h3>
      <h3>username:{username}</h3>
    </div>
  )
}

export default Home
