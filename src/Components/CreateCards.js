import React from "react";
import axios from "axios";
import "./CreateCards.css";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/esm/Container";

const STUDYSET_API = "https://flipcardzdb.herokuapp.com/cardset";
const FLASHCARD_API = "https://flipcardzdb.herokuapp.com/card";

const CreateCards = () => {
  const [title, setTitle] = useState("");
  const [course, setCourse] = useState("");
  const [cards, setCards] = useState([{}]);
  let navigate = useNavigate();

  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleCourseChange = (e) => setCourse(e.target.value);
  const handleChange = (e, index) => {
    const values = [...cards];
    values[index][e.target.name] = e.target.value;
    setCards(values);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let body, res, data;
      body = { set_name: title, course: course };
      res = await axios.post(STUDYSET_API, body);
      data = res.data;

      let enhancedCards = [...cards];
      enhancedCards.forEach(async (card) => {
        card.set_id = data.set_id;
        card.set_name = data.set_name;
        card.set_course = data.set_course;
        await axios.post(FLASHCARD_API, card);
      });
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  const addCard = () =>
    setCards([
      ...cards,
      {
        set_name: title,
        set_course: course,
        term: "",
        definition: "",
        front_img: "",
        back_img: "",
      },
    ]);

  const handleDelete = (id) =>
    setCards(
      [...cards].filter((card, index) => {
        console.log("delete", id, index);
        return index !== id;
      })
    );

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
                onChange={handleTitleChange}
              />
            </Form.Group>
            <Form.Group as={Col} controlId="formGridCourse">
              <Form.Control
                placeholder="Course"
                value={course}
                onChange={handleCourseChange}
              />
            </Form.Group>
          </Row>
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
                        defaultValue={card.term}
                        onChange={(e) => handleChange(e, index)}
                      />
                    </Form.Group>
                    <Form.Group as={Col} controlId="formGridDefinition">
                      <Form.Control
                        placeholder="Definition"
                        name="definition"
                        defaultValue={card.definition}
                        onChange={(e) => handleChange(e, index)}
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
                        defaultValue={card.back_img}
                        onChange={(e) => handleChange(e, index)}
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
