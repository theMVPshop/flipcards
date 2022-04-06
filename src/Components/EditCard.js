import React from "react";
import { useState, useEffect } from "react";

import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/esm/Container";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import styles from "./EditCard.module.css";

export default function EditCard({
  // From Study Set
  studySetInfo,
  handleUpdateStudySets,
}) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [cards, setCards] = useState([]);
  const [title, setTitle] = useState("");
  const [course, setCourse] = useState("");
  const EDIT_CARDSET_API = `https://flipcardzdb.herokuapp.com/cardset/${studySetInfo.set_id}`;
  const FLASHCARD_API = "https://flipcardzdb.herokuapp.com/card";

  useEffect(() => {
    setCards(studySetInfo.cards || {});
    setTitle(studySetInfo.set_name || "");
    setCourse(studySetInfo.course || "");
  }, []);

  const handleChange = (e, index) => {
    const newCards = [...cards];
    newCards[index][e.target.name] = e.target.value;
    setCards(newCards);
  };

  const addCard = (id) => {
    setCards([
      ...cards,
      { card_id: "", term: "", definition: "", front_img: "" },
    ]);
  };

  const handleDelete = (id, index) => {
    // Check to see if flashcard exists - if so delete existing card
    if (id !== "") {
      fetch(`${FLASHCARD_API}/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          deleteFlashcardRow(index);
        })
        .catch((error) => console.log(error));
    } else {
      // If flashcard is newly created delete row
      deleteFlashcardRow(index);
    }
  };

  const deleteFlashcardRow = (index) => {
    console.log(index);
    const rows = [...cards];
    // const newRows = rows.filter(row => Number(row.card_id) !== Number(id))
    rows.splice(index, 1);
    setCards(rows);
  };

  const handleEdit = (e) => {
    e.preventDefault();

    let newStudySet = {
      set_id: studySetInfo.set_id,
      set_name: title,
      course: course,
      amount: cards.length,
      cards: cards,
    };

    let updatedStudySet = {
      set_name: title,
      course: course,
    };

    fetch(EDIT_CARDSET_API, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(updatedStudySet),
    })
      .then((res) => res.json())
      .then((data) => {
        // Loop over the flashcards
        cards.forEach((card) => {
          // Add setinfo to card object
          card.set_id = studySetInfo.set_id;
          card.set_name = title;
          card.set_course = course;

          // See if flashcard already exists - if so update it
          if (card.card_id !== "") {
            editFlashcard(card);
          } else {
            // If flashcard is new create it
            addFlashcard(card);
          }
        });
        // If all flashcard edit/adds successful update dashboard state with newStudySet
        handleUpdateStudySets(newStudySet);
        handleClose();
      })
      .catch((error) => console.log(error));
  };

  const editFlashcard = (flashcard) => {
    console.log(flashcard);
    fetch(`${FLASHCARD_API}/${flashcard.card_id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(flashcard),
    })
      .then((res) => res.json())
      .catch((error) => console.log(error));
  };

  const addFlashcard = (flashcard) => {
    fetch(`${FLASHCARD_API}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(flashcard),
    })
      .then((res) => res.json())
      .catch((error) => console.log(error));
  };

  const handleImage = (e) => {
    e.preventDefault();
    console.log('hover')
  };

  return (
    <div>
      <Button className="btn-edit" onClick={handleShow}>
        Edit Card
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
          <Container>
            <Form>
              <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridTitle">
                  <Form.Control
                    placeholder="Title"
                    name="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </Form.Group>
                <Form.Group as={Col} controlId="formGridSchool">
                  <Form.Control
                    placeholder="Course"
                    name="course"
                    value={course}
                    onChange={(e) => setCourse(e.target.value)}
                  />
                </Form.Group>
              </Row>
              <br />
              <br />
              <Row>
                <Form.Group className="mb-3" controlId="formCard">
                  {cards.map((card, index) => (
                    <div key={index}>
                      <Row className="mt-5">
                        <Form.Label>{index + 1}</Form.Label>
                        <Form.Group as={Col} controlId="formGridTerm">
                          <Form.Control
                            placeholder="Term"
                            name="term"
                            value={cards[index].term}
                            onChange={(e) => handleChange(e, index)}
                          />
                        </Form.Group>
                        <Form.Group as={Col} controlId="formGridDefinition">
                          <Form.Control
                            placeholder="Definition"
                            name="definition"
                            value={cards[index].definition}
                            onChange={(e) => handleChange(e, index)}
                          />
                        </Form.Group>
                        <Form.Group as={Col} controlId="formGridImageUrl">
                          <Form.Control
                            placeholder="Image Url"
                            name="front_img"
                            value={cards[index].front_img}
                            onChange={(e) => handleChange(e, index)}
                            onMouseOver={(e) => {
                              handleImage(e);
                            }}
                          />
                        </Form.Group>
                        <Form.Group as={Col} controlId="formGridButtons">
                          {/* <Button className='imageButton'> Add Image</Button> */}
                          <Button
                            className="deleteButton"
                            variant="secondary"
                            onClick={() => handleDelete(card.card_id, index)}
                          >
                            Delete
                          </Button>
                        </Form.Group>
                      </Row>
                    </div>
                  ))}
                </Form.Group>
              </Row>
              <Form.Group as={Col} controlId="addCard">
                <Button className="addCard" onClick={() => addCard()}>
                  {" "}
                  + Add Card
                </Button>
              </Form.Group>
              <Row className="align-items-left"></Row>

              <Row className="align-items-center">
                <Button
                  className="createButton"
                  type="submit"
                  onClick={(e) => handleEdit(e)}
                >
                  Save
                </Button>
              </Row>
            </Form>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
