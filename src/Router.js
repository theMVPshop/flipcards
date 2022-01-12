import React from 'react'
import { Routes, Route, Navigate } from 'react-router'
import Login from './Components/Login'
import App from './App'
// import Details from './Containers/Details'
import Dashboard from './Components/Dashboard';
// import Listing from './Containers/Listing'
// import { checkAuth } from './checkAuth';
import ResetPassword from './Components/ResetPassword';




// const ProtectedRoute = ({ component: Component, ...rest }) => {
//     return (
//         <Route 
//         {...rest}
//         render={(props) => 
//         checkAuth() ? <Component {...props} /> : <Navigate to="/Login" />
//         }
//         />
//     )
// }

const Router = () => {
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            {/* <Route path="/Login" element={<Login />} /> */}
            <Route path="/resetpassword" element={<ResetPassword />} />
            {/* <Route path="/Details/:id" component={Details} /> */}
            {/* <ProtectedRoute path="/Dashboard" element={<Dashboard />} /> */}
        </Routes>
    );
};

export default Router;