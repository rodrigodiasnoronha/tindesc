import React from 'react'
import { isAuthenticated } from '../../services/auth'
import { Redirect, Route } from 'react-router-dom'

const PrivateRoute = (props) =>
{   
    return isAuthenticated() ? <Route {...props}/> : <Redirect to="/login"/>
}

export default PrivateRoute