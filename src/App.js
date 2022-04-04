import React from "react"
import "./App.css"

import { BrowserRouter } from "react-router-dom"
import Router from "./Router"
import { QueryClient, QueryClientProvider } from "react-query"

import NavbarHeader from "./Components/NavbarHeader"
// import Login from './Components/Login';
import "bootstrap/dist/css/bootstrap.min.css"

const queryClient = new QueryClient()

// import Dashboard from './Components/Dashboard';
// import EditCard from './Components/EditCard';
// import CreateCards from './Components/CreateCards';
// import UpdateProfile from './Components/UpdateProfile';
// import ResetPassword from './Components/ResetPassword'

function App() {
  const [loggedIn, setLoggedIn] = React.useState(false)

  const handleClick = () => setLoggedIn(!loggedIn)

  //   return this.state.loggedIn ? (
  //     <div>
  //       {/* <ButtonAppBar />
  //       <Dashboard /> */}
  //     </div>
  //   ) : (
  //     <div classname="login">
  //       <Router>
  //         {/* <CreateCards /> */}
  //         <NavbarHeader />
  //         <Login />
  //       </Router>
  //       {/* <Card /> */}
  //     </div>
  //     // </div>
  //   );

  return (
    <div className="App">
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <NavbarHeader />
          <Router />
        </QueryClientProvider>
      </BrowserRouter>
    </div>
  )
}

export default App
