import React from "react";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

import EditCardForm from "./EditCardForm";
import { useState } from "react";

import styles from './EditCard.module.css';


export default function EditCard({
  // From Study Set
  studySetInfo
}) {

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  return (
    <div>
      <Button className="btn-edit" onClick={handleShow}>
        Edit Cards
      </Button>

      <Modal
        size="lg"
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        className={styles.editCardModal}
      >
        <Modal.Header closeButton>
          <Modal.Title>{studySetInfo.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <EditCardForm studySetInfo={studySetInfo} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>Close</Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

