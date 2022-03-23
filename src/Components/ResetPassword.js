import React, { useEffect, useState } from 'react';
import './ResetPassword.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';

//need to import email & current password for verification and updating

const updatedState = {
  email: "",
  password: "",
  newPass: "",
  confirmNewPass: "",
};

const emailVerError = {
  hasSymbols: false,
}

const passVerError = {
  isLenthy: false,
  hasUpper: false,
  hasLower: false,
  hasNumber: false,
  hasSpclChr: false,
  confirmNewPass: false,
};


const ResetPassword = () => {
  const [validated, setValidated] = useState(false);
  const [updateUser, setUpdateUser] = useState(updatedState);
  const [passwordError, setPasswordError] = useState(passVerError);
      const [emailError, setEmailError] = useState(emailVerError);
      const [submitError, setSubmitError] = useState('')
  // const [newPassword, setNewPassword] = useState('');
  // const [oldPassword, setOldPassword] = useState('');
  let navigate = useNavigate();
  useEffect(() => {}, [updateUser]);
  let Reset_API = 'https://flipcardzdb.herokuapp.com/resetpassword'

  fetch(Reset_API, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
    body: JSON.stringify(updateUser)
})
    .then(response => response.json())
  //   .then(data => {
  //     // cookies expire in 3 hours
  //     document.cookie = `token=${data.token};max-age=60*60";`;
  //     document.cookie = `username=${data.user.username};max-age=60*60";`;
  //     document.cookie = `userId=${data.user.id};max-age=60*60;`;
  //     document.cookie = `loggedIn=true;max-age=60*60";`;
   
  // })
    .catch(error => {
        setSubmitError('Error, please check that all fields are correct');
        console.log('Form not correct: ', error)
    })




  const handleUpdate = (e) => {
    const { name, value } = e.target;
    setUpdateUser({ ...updateUser, [name]: value });

    if (name === "email") {
      const hasSymbols = /[@,.]/.test(value);

      setEmailError({
        ...emailError,
        hasSymbols
      })
    }

    if (name === "newPass") {
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

    if (name === "confirmNewPass") {
      setPasswordError({
        ...passwordError,
        confirmNewPass: updateUser.newPass === value,
      });
    }
  }

  const handleSubmit = (event) => {
    const { email, newPass } = updateUser;

    const updateRegistration = {
      email,
      newPass,
    };
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
          <Form.Control required type="email" name="email" value={updateUser.email} onChange={handleUpdate} />
          {!emailError.hasSymbols && <li className="text-danger">Please enter your email</li>}
        </Form.Group>
        {/* <Form.Group className="mb-3" controlId="formGroupPassword">
    <Form.Label>Current Password</Form.Label>
    <Form.Control required type="password" name="currentPass" value={updateUser.currentPass} onChange={handleUpdate}  />
  </Form.Group> */}
        <Form.Group className="mb-3" controlId="formGroupPassword">
          <Form.Label>New Password</Form.Label>
          <Form.Control required type="password" name="newPass" value={updateUser.newPass} onChange={handleUpdate} />
          {!passwordError.isLenthy && <li className="text">Min 8 characters</li>}
          {!passwordError.hasUpper && <li className="text">At least one upper case </li>}
          {!passwordError.hasLower && <li className="text">At least one lower case</li>}
          {!passwordError.hasNumber && <li className="text">At least one number</li>}
          {!passwordError.hasSpclChr && <li className="text">  At least on of the special characters i.e @ # $ % &</li>}
        </Form.Group>
        <Form.Group className="mb-3" controlId="formGroupConfirmPassword">
          <Form.Label>Confirm New Password</Form.Label>
          <Form.Control required type="password" name="confirmNewPass" value={updateUser.confirmNewPass} onChange={handleUpdate} />
          {updateUser.confirmNewPass !== updateUser.newPass && <li className="text-danger">That password doesn't match</li>}
        </Form.Group>
        <div class="text-center">
          <Button align='center' className='resetButton' variant="primary" type="submit" size="lg">
            Reset
          </Button>
        </div>
      </Form>
    </div>
  )
}

export default ResetPassword
