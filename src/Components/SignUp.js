import React, {useState} from 'react';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import './Signup.css';
import { useNavigate } from 'react-router-dom';

const SignUp = (props) => {
    const [validated, setValidated] = useState(false);
    let navigate = useNavigate();

    // const navigate = useNavigate();
    // const [error, setError] = React.useState(null);

    // async function handleClick(event) {
    //     event.preventDefault();
    //     let result = await submitForm(event.target);
    //     if (result.error) {
    //       setError(result.error);
    //     } else {
    //       navigate('success');
    //     }
    //   }

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
            <div className='signup'>
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="formGridFirstName">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control required type="firstName" placeholder="First name" />
                            <Form.Control.Feedback type="invalid">
              Please enter your first name.
            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridLastName">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control required type="lastName" placeholder="Last name" />
                            <Form.Control.Feedback type="invalid">
              Please enter your last name.
            </Form.Control.Feedback>
                        </Form.Group>
                    </Row>

                    <Form.Group className="mb-3" controlId="formGridEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control required type="email" placeholder="Enter email" />
                        <Form.Control.Feedback type="invalid">
              Please enter your email.
            </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formGridPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control required type="password" placeholder="Password" />
                        <Form.Control.Feedback type="invalid">
              Please enter your password.
            </Form.Control.Feedback>
                    </Form.Group>
                    <div class="text-center">
                        {/* <Link class="btn btn-info" role="button">Link Button</Link> */}
                    <Button className="mt-5" variant="primary" type="submit">
        Register
      </Button>
                    </div>
                </Form>
            </div>
        )
    }
  
export default SignUp

