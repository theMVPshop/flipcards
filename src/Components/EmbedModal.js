import React from "react";
import { useState } from 'react';

import Modal from 'react-bootstrap/Modal';
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';

import styles from './EmbedModal.module.css';

const EmbedModal = ({
    studySetId
}) => {
    const [showModal, setShowModal] = useState(false);

    const handleShow = () => {
        setShowModal(true);
    }

    const handleClose = () => {
        setShowModal(false);
    }

    return (
        <>
            <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                    <i class="bi bi-three-dots-vertical"></i>
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item onClick={handleShow}>Embed</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>

            <Modal
                size="lg"
                show={showModal}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                className={styles.embedModal}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Embed Code</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <code>{`
                        <iframe
                            class="embed-code"
                            id="studySetIframe"
                            src="http://localhost:3000/flashcards-embed/${studySetId}"
                            width="650"
                            height="600"
                            frameBorder="0"
                            scrolling="no"></iframe>
                    `}</code>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleClose}>Close</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default EmbedModal;