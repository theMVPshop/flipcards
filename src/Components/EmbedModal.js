import React from "react"
import { useState } from "react"
import Modal from "react-bootstrap/Modal"
import Dropdown from "react-bootstrap/Dropdown"
import Button from "react-bootstrap/Button"
import styles from "./EmbedModal.module.css"
import { CopyToClipboard } from "react-copy-to-clipboard"

const EmbedModal = ({ studySetId }) => {
  const [showModal, setShowModal] = useState(false)
  const [text, setText] = useState("")
  const [embedCode, setEmbedCode] = useState(
    `<iframe class="embed-code" id="studySetIframe" src="https://flipcardz.herokuapp.com/flashcards-embed/${studySetId}" width="650" height="600" frameBorder="0" scrolling="no"></iframe>`
  )

  const handleShow = () => {
    setShowModal(true)
  }

  const handleClose = () => {
    setShowModal(false)
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
        className={styles.embedModal}>
        <Modal.Header closeButton>
          <Modal.Title>Embed Code</Modal.Title>
        </Modal.Header>
        <Modal.Body id="embed">
          <code>{`
                        <iframe
                            class="embed-code"
                            id="studySetIframe"
                            allow="clipboard-read; clipboard-write"
                            src="https://flipcardz.herokuapp.com/flashcards-embed/${studySetId}"
                            width="650"
                            height="600"
                            frameBorder="0"
                            scrolling="no"
                             value={text}
                            ></iframe>
                    `}</code>
        </Modal.Body>
        <Modal.Footer>
          <CopyToClipboard text={embedCode}>
            <Button
              variant="secondary"
              className="button"
              data-clipboard-action="copy"
              data-clipboard-target="#studySetIframe">
              Copy Link
            </Button>
          </CopyToClipboard>
          <Button variant="primary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default EmbedModal
