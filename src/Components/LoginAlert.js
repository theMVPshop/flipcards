import React from 'react'; 
import {useState} from 'react'; 
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import { useNavigate } from 'react-router-dom';

function LoginAlert() {
    const [show, setShow] = useState(true);
    let navigate = useNavigate();

    const handleClick = () => {
        setShow(false);
        navigate('/')
    }
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