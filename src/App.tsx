import { Header } from 'components/Header'
import React from 'react'
import Router from 'Router'
import './assets/reset.css'
import './assets/style.css'

const App = (): JSX.Element => {
  return (
    <>
      <Header />
      <main className="c-main">
        <Router />
      </main>
    </>
  )
}

export default App
