import React from 'react'
import { Redirect, Route, Switch, BrowserRouter } from 'react-router-dom'

import PrivateRoute from './components/PrivateRoute'

import Login from './pages/Login'
import Logo from './components/Logo'
import Navbar from './components/Navbar'
import Header from './components/Header'
import Home from './pages/Home'
import Register from './pages/Register'

const Routes = () => {
    return (
            <BrowserRouter>
                <Header>
                    <Logo />
                    <Navbar isLogged={!!localStorage.getItem('token')} />
                </Header>
                <Switch>
                    <PrivateRoute path="/" exact component={Home} />
                    <Route path="/login" exact component={Login} />
                    <Route path="/register" exact component={Register} />
                    <Redirect to="/login" from="*" />
                </Switch>
            </BrowserRouter>
    )
}

export default Routes
