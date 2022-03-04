import React from 'react'
import { Routes, Route, Navigate } from 'react-router'

import cookie from 'cookie';

import Login from './Components/Login'
import Dashboard from './Components/Dashboard';
import ResetPassword from './Components/ResetPassword';
import SignUp from './Components/SignUp';
import Flashcards from './Components/Flashcards';
import FlashcardsEmbed from './Components/FlashcardsEmbed';
import CreateCards from './Components/CreateCards';
import EditCard from './Components/EditCard';
import UpdateProfile from './Components/UpdateProfile';
import ApproveUsers from './Components/ApproveUsers';


// import App from './App'
// import Details from './Containers/Details'
// import Listing from './Containers/Listing'
// import { checkAuth } from './checkAuth';


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
            <Route path="/resetpassword" element={<ResetPassword />} />
            <Route path="/signup" element={<SignUp />} />
            {/* <Route path="/Details/:id" component={Details} /> */}

            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/createcards" element={<CreateCards />} />
            <Route path="/editcard" element={<EditCard />} />
            <Route path="/updateprofile" element={<UpdateProfile />} />
            <Route path="/approveusers" element={<ApproveUsers />} />

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
            <Route path="/flashcards-embed/:id" element={<FlashcardsEmbed />} />
        </Routes>
    );
};

export default Router;