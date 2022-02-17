import React from 'react'
import { Routes, Route, Navigate } from 'react-router'
import Login from './Components/Login'
import App from './App'
// import Details from './Containers/Details'
import Dashboard from './Components/Dashboard';
// import Listing from './Containers/Listing'
// import { checkAuth } from './checkAuth';
import ResetPassword from './Components/ResetPassword';
import SignUp from './Components/SignUp';
import CreateCards from './Components/CreateCards'




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
            <Route path="/signup" element={<SignUp />} />
            {/* <Route path="/Details/:id" component={Details} /> */}
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/createcards" element={<CreateCards />} />
        </Routes>
    );
};

export default Router;