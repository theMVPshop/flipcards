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
import LoginAlert from "./LoginAlert";

const LOGIN_API = 'https://flipcardzdb.herokuapp.com/user/login';

const Login = () => {
  // const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState('')
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

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
        document.cookie = `token=${data.token};max-age=60*60";`;
        document.cookie = `firstname=${data.user.first_name};max-age=60*60";`;
        document.cookie = `lastname=${data.user.last_name};max-age=60*60";`;
        document.cookie = `email=${data.user.email};max-age=60*60";`;
        document.cookie = `program=${data.user.program};max-age=60*60";`;
        document.cookie = `userId=${data.user.User_ID};max-age=60*60;`;
        document.cookie = `loggedIn=true;max-age=60*60";`;
        navigate('/dashboard')
      })
      .catch(error => {
        setLoginError('Unable to login, please try again');
        console.log('Failed to Login User: ', error)
      })
  }

  return (
    <div className="login">
      <div className="text-center">
        <img src={logo} className="logo" alt="logo" />
      </div>
      <Form className="loginForm" onSubmit={handleSubmit}>
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
        <div className='text-center'>
          <Button className="loginButton btn btn-primary" block size="md" type="submit" >
            Login
          </Button>
        </div>
      </Form>
      <div className="dropdown-divider"></div>
      <div className='text-center'>
        <Link to="/signup">New around here? Sign up</Link>
      </div>
      <div className='text-center'>
        <Link to="/resetpassword">Forgot Password?</Link>
      </div>
      <div className="loginAlert">
      {loginError && <LoginAlert />}
      </div>
    </div>
  );
};

export default Login