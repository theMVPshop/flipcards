import React from "react";
import "./CreateCards.css";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/esm/Container";
import { getToken } from "../helpers";

const STUDYSET_API = "https://flipcardzdb.herokuapp.com/cardset";
const FLASHCARD_API = "https://flipcardzdb.herokuapp.com/card";

const CreateCards = () => {
  const [title, setTitle] = useState("");
  const [course, setCourse] = useState("");
  const [fields, setFields] = useState([
    {
      term: "",
      definition: "",
      front_img: "",
      back_img: "",
    },
  ]);

  let navigate = useNavigate();

  const handleChange = (index, e) => {
    const values = [...fields];
    values[index][e.target.name] = e.target.value;
    setFields(values);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let newSet = {
      set_name: title,
      course: course,
    };

    fetch(STUDYSET_API, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        'Authorization': `Bearer ${getToken()}`
      },
      body: JSON.stringify(newSet),
    })
      .then((res) => res.json())
      .then((data) => {
        // Get the ID
        let studySetId = data.set_id;

        // Loop over the fields and create flashcards for each one
        fields.forEach((field, idx) => {
          field.set_id = studySetId;

          createFlashCard(field);
        });
      })
      .catch((error) => console.log(error));
  };

  const createFlashCard = (field) => {
    fetch(FLASHCARD_API, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        'Authorization': `Bearer ${getToken()}`
      },
      body: JSON.stringify(field),
    })
      .then((res) => res.json())
      .then(navigate("/dashboard"))
      .catch((error) => console.log(error));
  };

  const addCard = () => {
    setFields([
      ...fields,
      {
        term: "",
        definition: "",
        front_img: "",
        back_img: "",
      },
    ]);
  };

  const handleDelete = (id) => {
    const values = [...fields];
    values.splice(id, 1);
    setFields([...values]);
  };

  return (
    <div className="card">
      <header className="createCardSet">Create A New Study Set</header>
      <br />
      <Container>
        <Form onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridTitle">
              <Form.Control
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>
            <Form.Group as={Col} controlId="formGridCourse">
              <Form.Control
                placeholder="Course"
                value={course}
                onChange={(e) => setCourse(e.target.value)}
              />
            </Form.Group>
          </Row>
          <Row>
            <Form.Group className="mb-3" controlId="formCard">
              {fields.map((field, index) => (
                <div key={index}>
                  <Row className="mt-5">
                    <Form.Label>{index + 1}</Form.Label>
                    <Form.Group as={Col} controlId="formGridTerm">
                      <Form.Control
                        placeholder="Term"
                        name="term"
                        defaultValue={field.term}
                        onChange={(e) => handleChange(index, e)}
                      />
                    </Form.Group>
                    <Form.Group as={Col} controlId="formGridDefinition">
                      <Form.Control
                        placeholder="Definition"
                        name="definition"
                        defaultValue={field.definition}
                        onChange={(e) => handleChange(index, e)}
                      />
                    </Form.Group>
                    <Form.Group
                      as={Col}
                      className="imageLink"
                      controlId="formGridImage"
                    >
                      <Form.Control
                        placeholder="Image Link"
                        name="imageLink"
                        defaultValue={field.back_img}
                        onChange={(e) => handleChange(index, e)}
                      />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridButtons">
                      <Button
                        className="deleteButton"
                        variant="secondary"
                        onClick={() => handleDelete(index)}
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
          <Row className="align-items-center">
            <Button className="createButton" type="submit">
              Create
            </Button>
          </Row>
        </Form>
      </Container>
    </div>
  );
};

export default CreateCards;
