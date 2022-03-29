import React from 'react'; 
import {useState} from 'react'; 
import Alert from 'react-bootstrap/Alert';

function LoginAlert() {
    const [show, setShow] = useState(true);

  return (
    <div>
        <Alert show={show} variant="danger">
        <Alert.Heading className="d-flex justify-content-center">Oh no!</Alert.Heading>
        <hr />
        <p>
           Incorrect username or password. Please check your credentials and try again.
        </p>
        <hr />
      </Alert>
    </div>
  )
}

export default LoginAlert