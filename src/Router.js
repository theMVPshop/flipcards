import React from "react"
import { Routes, Route, Navigate } from "react-router"

import cookie from "cookie"

import Login from "./Components/Login"
import Dashboard from "./Components/Dashboard"
import ResetPassword from "./Components/ResetPassword"
import SignUp from "./Components/SignUp"
import Flashcards from "./Components/Flashcards"
import FlashcardsEmbed from "./Components/FlashcardsEmbed"
import CreateCards from "./Components/CreateCards"
import EditCard from "./Components/EditCard"
import UpdateProfile from "./Components/UpdateProfile"
import ApproveUsers from "./Components/ApproveUsers"

const ProtectedRoute = ({ children }) => {
  const cookies = cookie.parse(document.cookie)
  return cookies["loggedIn"] ? children : <Navigate to="/" />
}

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/resetpassword" element={<ResetPassword />} />
      <Route path="/signup" element={<SignUp />} />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/createcards"
        element={
          <ProtectedRoute>
            <CreateCards />
          </ProtectedRoute>
        }
      />

      <Route
        path="/editcard"
        element={
          <ProtectedRoute>
            <EditCard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/updateprofile"
        element={
          <ProtectedRoute>
            <UpdateProfile />
          </ProtectedRoute>
        }
      />

      <Route
        path="/approveusers"
        element={
          <ProtectedRoute>
            <ApproveUsers />
          </ProtectedRoute>
        }
      />

      <Route
        path="/flashcards/:id"
        element={
          // <ProtectedRoute>
          <Flashcards />
          // </ProtectedRoute>
        }
      />

      <Route path="/flashcards-embed/:id" element={<FlashcardsEmbed />} />
    </Routes>
  )
}

export default Router
