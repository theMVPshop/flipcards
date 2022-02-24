import React, {useEffect, useState} from 'react';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import './Signup.css';
import { useNavigate } from 'react-router-dom';


const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPass: "",
};


const passVerificationError = {
  isLenthy: false,
  hasUpper: false,
  hasLower: false,
  hasNumber: false,
  hasSpclChr: false,
  confirmPass: false,
};

const emailVerificationError = {
  hasSymbols: false,
}

const SignUp = (props) => {
    const [validated, setValidated] = useState(false);
    const [newUser, setNewUser] = useState(initialState);
    const [passwordError, setPasswordError] = useState(passVerificationError);
    const [emailError, setEmailError] = useState(emailVerificationError);
    let navigate = useNavigate();
    useEffect(() => {}, [newUser])
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
    const {name, value} = e.target;
    setNewUser({...newUser, [name]: value});

    if(name === "email") {
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

    if (name === "confirmPass") {
      setPasswordError({
        ...passwordError,
        confirmPass: newUser.password === value,
      });
    }


  }

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(newUser);
    const { name, phone, email, company, address, password } = newUser;

    const newRegistration = {
      name,
      phone,
      email,
      company,
      address,
      password,
    };
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
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

                    <Form.Group className="mb-3" controlId="formGridEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control required type="email" name="email" value={newUser.email} onChange={handleChange} placeholder="Enter email" />
                        <ul className="mb-4">
                   <li
                className={
                  emailError.hasSymbols ? "text-success" : "text-danger"
                }
              >Please enter a valid email</li> </ul>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formGridPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control required type="password" name="password" value={newUser.password} onChange={handleChange} placeholder="Enter Password" />
                        <Form.Control.Feedback type="invalid">
              Please enter your password.
            </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formGridConfirmPassword">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control required type="password" name="confirmPassword" value={newUser.confirmPass} onChange={handleChange} placeholder="Confirm Password" />
                        {/* <Form.Text>
              {!passwordError.confirmPass && (
                <div className="text-danger mb-3">Password doesn't match!</div>
              )}
            </Form.Text> */}
                        <Form.Control.Feedback type="invalid">
              Please enter your password.
            </Form.Control.Feedback>
                    </Form.Group>
                   <ul className="mb-4">
              <li
                className={
                  passwordError.isLenthy ? "text-success" : "text-danger"
                }
              >
                Min 8 characters
              </li>
              <li
                className={
                  passwordError.hasUpper ? "text-success" : "text-danger"
                }
              >
                At least one upper case
              </li>
              <li
                className={
                  passwordError.hasLower ? "text-success" : "text-danger"
                }
              >
                At least one lower case
              </li>
              <li
                className={
                  passwordError.hasNumber ? "text-success" : "text-danger"
                }
              >
                At least one number
              </li> 
              <li
                className={
                  passwordError.hasSpclChr ? "text-success" : "text-danger"
                }
              >
                At least on of the special characters i.e @ # $ % &{" "}
              </li>
            </ul> 
                    <div class="text-center">
                        {/* <Link class="btn btn-info" role="button">Link Button</Link> */}
                    <Button className="mt-5" variant="primary" type="submit" >
        Register
      </Button>
                    </div>
                </Form>
            </div>
        )
    }
  
export default SignUp

