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


const Login = (props) => {
  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validated, setValidated] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
      document.cookie = "loggedIn=true";
      props.userLogin(user)
    }

    setValidated(true);
    navigate('/dashboard')
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
        <br />
        {/* <div class='text-center'>
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
        <br /> */}
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