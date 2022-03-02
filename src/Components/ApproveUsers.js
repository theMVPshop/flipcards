import React from "react";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useState, useEffect } from "react";
import Form from 'react-bootstrap/Form';
import { useNavigate, useParams } from "react-router-dom"; 


const ApproveUsers = () => {

    let navigate = useNavigate();
    let { id } = useParams();
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [users, setUsers] = useState([]);
    const [isApproved, setIsApproved] = useState(false);
    const [isChecked, setIsChecked] = useState(false)

  //   useEffect(() => {
  //     // @todo - switch to fetch call to get users from db
  //     setUsers(data);
  // }, [])

  useEffect(() => {
    let foundUsers = users.find(user => user.id === Number(id));
  setUsers(foundUsers);
  })
  

    const handleSubmit = (e) => {
      e.preventDefault();
      navigate('/dashboard');

      if(isChecked)
      setIsApproved(true);
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
  {users.map((user, id) => (
    <div key={id} className="mb-3">
      <Form.Check type={user} id={`check-api-${id}`}>
        <Form.Check.Input type={'checkbox'} isValid />
        <Form.Check.Label>{`${user}`}</Form.Check.Label>
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