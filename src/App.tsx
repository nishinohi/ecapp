// import React from 'react'
// import logo from './logo.svg'
// import './App.css'
// import { useDispatch, useSelector } from 'react-redux'
// import { AppState } from 'reducks/store/store'
// import { signInAction } from 'reducks/users/actions'

// function App(): JSX.Element {
//   const dispatch = useDispatch()
//   const selector = useSelector((state: AppState) => state)

//   console.log(selector.users)

//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.tsx</code> and save to reload.
//         </p>
//         <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
//           Learn React
//         </a>
//         <button onClick={() => dispatch(signInAction({ uid: 'user01', username: 'nishinohi' }))}>Sign in</button>
//       </header>
//     </div>
//   )
// }

// export default App

import React from 'react'
import Router from 'Router'

const App = (): JSX.Element => {
  return (
    <main>
      <Router />
    </main>
  )
}

export default App
