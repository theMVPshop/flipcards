import React from 'react'
import { Switch, Route, Redirect } from 'react-router'
import Login from './Components/Login'
import App from './App'
// import Details from './Containers/Details'
import Dashboard from './Components/Dashboard'
// import Listing from './Containers/Listing'
import { checkAuth } from './checkAuth'



const ProtectedRoute = ({ component: Component, ...rest }) => {
    return (
        <Route 
        {...rest}
        render={(props) => 
        checkAuth() ? <Component {...props} /> : <Redirect to="/Login" />
        }
        />
    )
}

const Router = () => {
    return (
        <Switch>
            <Route exact path="/" component={App} />
            <Route path="/Login" component={Login} />
            {/* <Route path="/Details/:id" component={Details} /> */}
            <ProtectedRoute path="/Dashboard" component={Dashboard} />
        </Switch>
    );
};

export default Router;