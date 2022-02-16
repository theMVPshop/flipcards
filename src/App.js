// import NavbarHeader from './Components/NavbarHeader';
import './App.css';
import React, { Component } from "react";
import Login from './Components/Login';
import Router from './Router';
import 'bootstrap/dist/css/bootstrap.min.css';
// import Dashboard from './Components/Dashboard';
// import EditCard from './Components/EditCard';
// import CreateCards from './Components/CreateCards';
// import UpdateProfile from './Components/UpdateProfile';
// import ResetPassword from './Components/ResetPassword'

class App extends Component {
  constructor() {
    super();

    this.state = {
      loggedIn: false,
    }
  };

  handleClick = () => {
    this.setState({
      loggedIn: !this.state.loggedIn,
    })
    this.handleClick.bind(this)
  };

  render() {
    return this.state.loggedIn ? (
      <div>
        {/* <ButtonAppBar />
        <Dashboard /> */}
      </div>
    ) : (
      <div classname="login">
        <Router>
          {/* <CreateCards /> */}
        {/* <NavbarHeader /> */}
        <Login />
        </Router>
        {/* <Card /> */}
        </div>
      // </div>
    );
  }
}

export default App;