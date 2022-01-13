import React, {useState} from 'react';
import './ResetPassword.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';



const ResetPassword = () => {
  const [validated, setValidated] = useState(false);
  let navigate = useNavigate();

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
    navigate('/')
  };
    return (
        <div className="resetPassword">
            <Form noValidate validated={validated} className='align-items-center' onSubmit={handleSubmit}>
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
        <div class="text-center">
          <Button align='center' className='resetButton' variant="primary"  type="submit" size="lg">
          Reset
        </Button>
        </div>
  </Form>
        </div>
    )
}

export default ResetPassword
