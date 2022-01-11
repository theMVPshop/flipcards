import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from 'react-bootstrap/Button';
// import Dropdown from 'react-bootstrap/Dropdown';
import Dropdown from 'react-bootstrap/Dropdown';
import "./Login.css";
import logo from './logo.svg';
// import { Link } from 'react-router-dom';


export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
  }

  return (
    <div className="login">
      <div class="text-center" className='imgLogo'>
        <img src={logo} className="logo" alt="logo" />
      </div>
      <Form className="loginForm" onSubmit={handleSubmit}>
        <Form.Group size="lg" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            autoFocus
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group size="lg" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <br/>
        <div class='text-center'>
        <Dropdown size="sm" align='left' className="specialty-dropdown" autoClose="inside">
            <Dropdown.Toggle id="dropdown-autoclose-inside">
             Course
            </Dropdown.Toggle>

        <Dropdown.Menu size="sm" align='left'>
            <Dropdown.Item href="#">Medical</Dropdown.Item>
            <Dropdown.Item href="#">Dental</Dropdown.Item>
             <Dropdown.Item href="#">Coding</Dropdown.Item>
        </Dropdown.Menu>
     </Dropdown>
     </div>
     <br/>
     <div class='text-center'>
     <Button className="loginButton" class="btn btn-primary" align="center" block size="md"  type="submit" disabled={!validateForm()}>
          Login
        </Button>
        </div>
      </Form>
      <div class="dropdown-divider"></div>
      <div class='text-center'>
      <a class="dropdown-item" className="signUp" href="#">New around here? Sign up</a>
      </div>
      <div class='text-center'>
      {/* <Link to="/ResetPassword">Reset Password</Link> */}
      {/* <a class="dropdown-item" className="password" href="#">Forgot password?</a> */}
      </div>
    </div>
  );
};