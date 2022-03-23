import React, { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import './Signup.css';
import { useNavigate } from 'react-router-dom';
import SignUpAlert from './SignUpAlert';

const SIGNUP_API = 'https://flipcardzdb.herokuapp.com/user/register';

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  program: "",
  password: "",
  confirmPassword: "",
};


const passVerificationError = {
  isLenthy: false,
  hasUpper: false,
  hasLower: false,
  hasNumber: false,
  hasSpclChr: false,
  confirmPassword: false,
};

const emailVerificationError = {
  hasSymbols: false,
}

const SignUp = () => {
  const [validated, setValidated] = useState(false);
  const [newUser, setNewUser] = useState(initialState);
  const [passwordError, setPasswordError] = useState(passVerificationError);
  const [emailError, setEmailError] = useState(emailVerificationError);
  const [signupError, setSignupError] = useState('');
  const [formSubmit, setFormSubmit] = useState(false)
  let navigate = useNavigate();
  useEffect(() => { }, [newUser])
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });

    if (name === "email") {
      const hasSymbols = /[@,.]/.test(value);

      setEmailError({
        ...emailError,
        hasSymbols
      })
    }

    if (name === "password") {
      const isLenthy = value.length > 8;
      const hasUpper = /[A-Z]/.test(value);
      const hasLower = /[a-z]/.test(value);
      const hasNumber = /[0-9]/.test(value);
      const hasSpclChr = /[@,#,$,%,&]/.test(value);

      setPasswordError({
        ...passwordError,
        isLenthy,
        hasUpper,
        hasLower,
        hasNumber,
        hasSpclChr,
      });
    }

    if (name === "confirmPassword") {
      setPasswordError({
        ...passwordError,
        confirmPassword: newUser.password === value,
      });
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(newUser);
    const { firstName, lastName, email, program, password } = newUser;

    const newRegistration = {
      first_name: firstName,
      last_name: lastName,
      email,
      program,
      password,
    };

    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }

    setValidated(true);
    setFormSubmit(true);

    fetch(SIGNUP_API, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(newRegistration)
    })
      .then(response => response.json())
      .catch(error => {
        setSignupError('Unable to sign up, please try again.')
        console.log(error)
      })
  };
  return (
    <div className='signup'>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridFirstName">
            <Form.Label>First Name</Form.Label>
            <Form.Control required type="text" name="firstName" value={newUser.firstName} onChange={handleChange} placeholder="First name" />
            <Form.Control.Feedback type="invalid">
              Please enter your first name.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group as={Col} controlId="formGridLastName">
            <Form.Label>Last Name</Form.Label>
            <Form.Control required type="text" name="lastName" value={newUser.lastName} onChange={handleChange} placeholder="Last name" />
            <Form.Control.Feedback type="invalid">
              Please enter your last name.
            </Form.Control.Feedback>
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Col md={6}>
            <Form.Group className="mb-3" controlId="formGridEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control required type="email" name="email" value={newUser.email} onChange={handleChange} placeholder="Enter email" />
              <ul className="mb-4">
                {!emailError.hasSymbols && <li className="text-danger">Please enter your email</li>}</ul>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Label for="program">Program</Form.Label>
            <Form.Select controlId="formGridProgram" aria-label="Select a program" name="program" id="program" onChange={handleChange}>
              <option>Select a program</option>
              <option value="medical">Medical</option>
              <option value="coding">Coding</option>
              <option value="dental">Dental</option>
            </Form.Select>
          </Col>
        </Row>

        <Form.Group className="mb-3" controlId="formGridPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control required type="password" name="password" value={newUser.password} onChange={handleChange} placeholder="Enter Password" />
          <Form.Control.Feedback type="invalid">
            Please enter your password.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formGridConfirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control required type="password" name="confirmPassword" defaultValue={newUser.confirmPass} onChange={handleChange} placeholder="Confirm Password" />
          {newUser.confirmPassword !== newUser.password && <li className="text-danger">That password doesn't match</li>}
        </Form.Group>
        <ul className="mb-4">
          {!passwordError.isLenthy && <li className="text">Min 8 characters</li>}
          {!passwordError.hasUpper && <li className="text">At least one upper case </li>}
          {!passwordError.hasLower && <li className="text">At least one lower case</li>}
          {!passwordError.hasNumber && <li className="text">At least one number</li>}
          {!passwordError.hasSpclChr && <li className="text">  At least on of the special characters i.e @ # $ % &</li>}
        </ul>
        <div class="text-center">
          {/* <Link class="btn btn-info" role="button">Link Button</Link> */}
          <Button className="mt-5" variant="primary" type="submit" >
            Register
          </Button>
          <p>{signupError}</p>
          {formSubmit && <SignUpAlert />}
        </div>
      </Form>
    </div>
  )
}

export default SignUp

