import React, { Component } from "react";
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import Router from './Router'
import NavbarHeader from './Components/NavbarHeader';
import 'bootstrap/dist/css/bootstrap.min.css';


class App extends Component {
  // constructor() {
  //   super();

  //   this.state = {
  //     loggedIn: false,
  //   }
  // };

  // handleClick = () => {
  //   this.setState({
  //     loggedIn: !this.state.loggedIn,
  //   })
  //   this.handleClick.bind(this)
  // };

  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <NavbarHeader />
          <Router />
        </BrowserRouter>
      </div>
    )
  }
}

export default App;