import React from "react";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useState } from "react";


export default function EditCard() {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <div>
            <Button variant="primary" onClick={handleShow}>
        Edit Cards
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Title of card set</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        Cards enclosed
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
          <i class="bi bi-trash"></i>
          </Button>
          <Button variant="primary">Close</Button>
        </Modal.Footer>
      </Modal>
        </div>
    )
}

