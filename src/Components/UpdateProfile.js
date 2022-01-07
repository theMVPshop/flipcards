import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
// import "./UpdateProfile.css";
import logo from './logo.svg';

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
    <div className="updateProfile">
      <div class="text-center">
      <img src={logo} className="logo" alt="logo" />
      </div> 
      <br />
      <Form>
      <div class="text-center">
        <h1 className="profileTitle">Update Your Profile</h1>
        </div>
        <br />
        <Row className="align-items-center">
          <Form.Label column="lg" lg={2}>
            First Name
          </Form.Label>
          <Col>
            <Form.Control type="firstName" placeholder="First Name" />
          </Col>
        </Row>
        <br />
        <Row>
          <Form.Label column="lg" lg={2}>
            First Name
          </Form.Label>
          <Col>
            <Form.Control type="lastName" placeholder="Last Name" />
          </Col>
        </Row>
        <br />
        <Row>
          <Form.Label column="lg" lg={2}>
            Last Name
          </Form.Label>
          <Col>
            <Form.Control type="email" placeholder="Email" />
          </Col>
        </Row>
        <br />
        <Row>
          <Form.Label column="lg" lg={2}>
            First Name
          </Form.Label>
          <Col>
            <Form.Control type="password" placeholder="password" />
          </Col>
        </Row>
        <br />
        <div class="text-center">
        <Button variant="primary" align="center" type="submit">
          Update
        </Button>
        </div>
      </Form>
    </div>
  );
}

//   return (
//     <div className="updateProfile">
//         <img src={logo} className="logo" alt="logo" />
//         <Form>
//           <Form.Label className="profileTitle">Update Your Profile</Form.Label>
//           <Form.Group className="mb-3" controlId="formFirstName">
//     <Form.Label>First Name</Form.Label>
//     <Form.Control type="firstName" placeholder="First Name" />
//   </Form.Group>
//   <Form.Group className="mb-3" controlId="formLastName">
//     <Form.Label>Last Name</Form.Label>
//     <Form.Control type="lastName" placeholder="Last Name" />
//   </Form.Group>
//   <Form.Group className="mb-3" controlId="formBasicEmail">
//     <Form.Label>Email address</Form.Label>
//     <Form.Control type="email" placeholder="Enter email" />
//   </Form.Group>
//   <Form.Group className="mb-3" controlId="formBasicPassword">
//     <Form.Label>Password</Form.Label>
//     <Form.Control type="password" placeholder="Password" />
//   </Form.Group>
//   <Button variant="primary" align="center" type="submit">
//     Update
//   </Button>
// </Form>
//     </div>
//   );
// }