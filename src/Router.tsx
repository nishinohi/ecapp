import React from 'react'
import { Switch, Route } from 'react-router'
import { Home, SignIn, SignUp, Reset, ProductEdit } from './templates/index'
import Auth from 'Auth'

const Router = (): JSX.Element => {
  return (
    <Switch>
      <Route exact path={'/signup'} component={SignUp} />
      <Route exact path={'/signin'} component={SignIn} />
      <Route exact path={'/signin/reset'} component={Reset} />
      <Auth>
        <Route exact path={'(/)?'} component={Home} />
        <Route path="/product/edit(/:id)?" component={ProductEdit} />
      </Auth>
    </Switch>
  )
}

export default Router
