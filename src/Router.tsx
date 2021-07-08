import React from 'react'
import { Switch, Route } from 'react-router'
import { Home, SignIn, SignUp } from './templates/index'
import Auth from 'Auth'

const Router = (): JSX.Element => {
  return (
    <Switch>
      <Route exact path={'/signup'} component={SignUp} />
      <Route exact path={'/signin'} component={SignIn} />
      <Auth>
        <Route exact path={'(/)?'} component={Home} />
      </Auth>
    </Switch>
  )
}

export default Router
