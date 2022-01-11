import React from 'react'
import { Routes, Route, Redirect } from 'react-router'
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
        <Routes>
            <Route exact path="/" element={<App />} />
            <Route path="/Login" element={<Login />} />
            {/* <Route path="/Details/:id" component={Details} /> */}
            <ProtectedRoute path="/Dashboard" element={<Dashboard />} />
        </Routes>
    );
};

export default Router;