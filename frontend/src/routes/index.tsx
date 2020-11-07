import React from 'react'
import { Switch, Route, Redirect, BrowserRouter } from 'react-router-dom'
import Dashboard from '../pages/Dashboard'
import Signin from '../pages/Signin'

const Routes: React.FC = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" exact component={Dashboard} />
      <Route path="/signin" exact component={Signin} />
      <Redirect to="/signin" from="*" />
    </Switch>
  </BrowserRouter>
)

export default Routes
