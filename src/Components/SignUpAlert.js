import React from 'react'; 
import {useState} from 'react'; 
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import { useNavigate } from 'react-router-dom';

function SignUpAlert() {
    const [show, setShow] = useState(true);
    let navigate = useNavigate();

    const handleClick = () => {
        setShow(false);
        navigate('/')
    }
  return (
    <div>
        <Alert show={show} variant="success">
        <Alert.Heading>Thanks for registering!</Alert.Heading>
        <p>
            You'll be notified when you've been approved. 
        </p>
        <hr />
        <div className="d-flex justify-content-end">
          <Button onClick={handleClick} variant="outline-success">
            Home
          </Button>
        </div>
      </Alert>
    </div>
  )
}

export default SignUpAlert