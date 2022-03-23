import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from 'react-bootstrap/Button';
// import Dropdown from 'react-bootstrap/Dropdown';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import "./Login.css";
import logo from './logo.svg';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

const LOGIN_API = 'https://flipcardzdb.herokuapp.com/user/login';

const Login = (props) => {
  // const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validated, setValidated] = useState(false);
  const [loginError, setLoginError] = useState('')
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    // const form = event.currentTarget;
    // if (form.checkValidity() === false) {
    //   event.preventDefault();
    //   event.stopPropagation();
    //   document.cookie = "loggedIn=true";
    //   props.userLogin(user)
    // }

    // setValidated(true);
    // navigate('/dashboard')

    let user = {
      email: email,
      password: password
    }

    fetch(LOGIN_API, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(user)
    })
      .then(response => response.json())
      .then(data => {
        // cookies expire in 3 hours
        // document.cookie = `token=${data.token};max-age=60*60";`;
        // document.cookie = `username=${data.user.username};max-age=60*60";`;
        // document.cookie = `userId=${data.user.id};max-age=60*60;`;
        document.cookie = `loggedIn=true;max-age=60*60";`;

      })
      .catch(error => {
        setLoginError('Unable to login, please try again');
        console.log('Failed to Login User: ', error)
      })
  }

  return (
    <div className="login">
      <div class="text-center">
        <img src={logo} className="logo" alt="logo" />
      </div>
      <Form noValidate validated={validated} className="loginForm" onSubmit={handleSubmit}>
        <Form.Group size="lg" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            autoFocus
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setLoginError('');
            }}
          />
        </Form.Group>
        <Form.Group size="lg" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setLoginError('');
            }}
          />
        </Form.Group>
        <br />
        <br />
        <div class='text-center'>
          <Button className="loginButton" class="btn btn-primary" block size="md" type="submit" >
            Login
          </Button>
        </div>
      </Form>
      <div class="dropdown-divider"></div>
      <div class='text-center'>
        <Link to="/signup">New around here? Sign up</Link>
      </div>
      <div class='text-center'>
        <Link to="/resetpassword">Forgot Password?</Link>
      </div>
    </div>
  );
};

export default Login