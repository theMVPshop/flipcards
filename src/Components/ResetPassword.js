import React from 'react';
import './ResetPassword.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';



function ResetPassword() {
    return (
        <div className="resetPassword">
            <Form className='align-items-center'>
            <Form.Group className="mb-3" controlId="formGroupEmail">
    <Form.Label>Email address</Form.Label>
    <Form.Control type="email"  />
  </Form.Group>
  <Form.Group className="mb-3" controlId="formGroupPassword">
    <Form.Label>Current Password</Form.Label>
    <Form.Control type="password" />
  </Form.Group>
  <Form.Group className="mb-3" controlId="formGroupPassword">
    <Form.Label>New Password</Form.Label>
    <Form.Control type="password"/>
  </Form.Group>
  <Form.Group className="mb-3" controlId="formGroupPassword">
    <Form.Label>Confirm New Password</Form.Label>
    <Form.Control type="password" />
  </Form.Group>
          <Button variant="primary" align="center" type="submit">
          Update
        </Button>
  </Form>
        </div>
    )
}

export default ResetPassword
