import React from 'react'
import { Switch, Route } from 'react-router'
import { Home, SignIn, SignUp } from './templates/index'

const Router = (): JSX.Element => {
  return (
    <Switch>
      <Route exact path={'/signup'} component={SignUp} />
      <Route exact path={'/signin'} component={SignIn} />
      <Route exact path={'(/)?'} component={Home} />
    </Switch>
  )
}

export default Router
