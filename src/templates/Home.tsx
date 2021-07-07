import React from 'react'
import { useSelector } from 'react-redux'
import { AppState } from 'reducks/store/store'
import { getUserId } from 'reducks/users/selectors'

const Home = (): JSX.Element => {
  const selector = useSelector((state: AppState) => state)
  const uid = getUserId(selector)

  return (
    <div>
      <h2>Home</h2>
      <h3>{uid}</h3>
    </div>
  )
}

export default Home
