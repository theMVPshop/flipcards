import React from "react";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useState, useEffect } from "react";
import Form from 'react-bootstrap/Form';
import { useNavigate, useParams } from "react-router-dom"; 
// import users from '../data/db.json';


const ApproveUsers = () => {

    let navigate = useNavigate();
    let { id } = useParams();
    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);
    const [users, setUsers] = useState(null);
    const [isApproved, setIsApproved] = useState(false);
    const [isChecked, setIsChecked] = useState(false);


  //   useEffect(() => {
  //     // @todo - switch to fetch call to get users from db
  //     setUsers(data);
  // }, [])

  useEffect(() => {
    let url = "../data/db.json";
    fetch(url)
        .then(res =>  {return res.json() })
        .then(data => setUsers(data))
    }, []);
  
    const handleClose = () => {
      setIsApproved(false);
      setShow(false);}

    const handleChange = (e) => {
     const { value, isChecked } = e.target;
    //  const { id, name } = users;

     console.log(`${value} is ${isChecked}`)

     if(isChecked) {
       setIsChecked(true);
       setUsers({
         //maybe just needs to be users: [...users]
        users: [...users]
       })
     } else {
       setIsChecked(false);
       setUsers({
        users: users.filter((e) => e !== value), 
       })
     }
    }

    const handleSubmit = (e) => {
      e.preventDefault();
      navigate('/dashboard');


      if(isChecked === true){
        setIsApproved(true);
      }
      console.log(`${this.user.name} is approved`)
    }

    return (
        <div>
            <Button variant="primary" onClick={handleShow}>
        Users to Approve
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        className="userApproval"
      >
        <Modal.Header closeButton>
          <Modal.Title>Users Waiting for Approval</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form className="userApproval">
  {users && users.map((user, id) => (
    <div key={user.id} className="mb-3">
      <Form.Check type={user} id={`check-api-${id}`}>
        <Form.Check.Input type={'checkbox'} isValid checked={isChecked[user.id]} value={user.id}  onChange={handleChange}/>
        <Form.Check.Label>{`${user.name}`}</Form.Check.Label>
      </Form.Check>
    </div>
  ))}
</Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
          <i class="bi bi-trash"></i>
          </Button>
          <Button variant="success" onClick={handleSubmit}>Approve Users</Button>
        </Modal.Footer>
      </Modal>
        </div>
    )
}

export default ApproveUsers