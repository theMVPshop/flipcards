import React from 'react'
import { Routes, Route, Navigate } from 'react-router'

import cookie from 'cookie';

import Login from './Components/Login'
import App from './App'
// import Details from './Containers/Details'
import Dashboard from './Components/Dashboard';
// import Listing from './Containers/Listing'
// import { checkAuth } from './checkAuth';
import ResetPassword from './Components/ResetPassword';
import SignUp from './Components/SignUp';
import Flashcards from './Components/Flashcards';


const ProtectedRoute = ({ children }) => {
    const cookies = cookie.parse(document.cookie);
    return cookies['loggedIn'] ? children : <Navigate to="/" />;
}


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
            {/* <Route
                path="/dashboard"
                element={
                    <ProtectedRoute>
                        <Dashboard />
                    </ProtectedRoute>
                }
            /> */}

            <Route path="/flashcards/:id" element={<Flashcards />} />
            {/* <Route
                path="/flashcards/:id"
                element={
                    <Flashcards />
                }
            /> */}
        </Routes>
    );
};

export default Router;