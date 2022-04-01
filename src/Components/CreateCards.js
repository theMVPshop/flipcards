import React from "react"
import axios from "axios"
import "./CreateCards.css"
import Form from "react-bootstrap/Form"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Button from "react-bootstrap/Button"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Container from "react-bootstrap/esm/Container"

const STUDYSET_API = "https://flipcardzdb.herokuapp.com/cardset"
const FLASHCARD_API = "https://flipcardzdb.herokuapp.com/card"
// const STUDYSET_API = "http://localhost:8080/cardset"
// const FLASHCARD_API = "http://localhost:8080/card"

const CreateCards = () => {
  const [currentSetId, setCurrentSetId] = useState("")
  const [title, setTitle] = useState("")
  const [course, setCourse] = useState("")
  const [card, setCard] = useState({})
  const [cards, setCards] = useState([])
  let navigate = useNavigate()
  async function fetchCards() {
    try {
      let res, data
      res = await axios.get(`${FLASHCARD_API}/${currentSetId}`)
      if (res.status === 200 && data !== null) {
        data = res.data
        return data
      }
    } catch (e) {
      console.log("fetch cards error", e)
    }
  }

  const handleTitleInput = (e) => setTitle(e.target.value)
  const handleCourseInput = (e) => setCourse(e.target.value)
  const handleCardsInputs = (e, cardId) => {
    setCard({ ...card, [e.target.name]: e.target.value })
    setCards((prevState) => {
      let newState = prevState
      let matchingCardIdx = newState.findIndex((card) => card.card_id === cardId)
      newState[matchingCardIdx][e.target.name] = e.target.value
      return newState
    })
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    navigate("/dashboard")
  }

  const addSet = async () => {
    try {
      let body, addSetSQL, data, newCard
      body = { set_name: title, course: course }
      addSetSQL = await axios.post(STUDYSET_API, body)
      data = addSetSQL.data

      if (addSetSQL.status === 200 && data !== null) {
        setCurrentSetId(data.set_id)

        newCard = {
          set_id: data.set_id,
          set_name: data.set_name,
          set_course: data.set_course,
        }
        setCard(newCard)
        setCards([...cards, newCard])
      }
    } catch (error) {
      console.error("addSet error", error)
    }
  }

  const addCard = async () => {
    try {
      let addCardSQL, newCard, fetchedCards
      addCardSQL = await axios.post(FLASHCARD_API, card)

      if (addCardSQL.status === 200) {
        newCard = {
          set_id: currentSetId,
          set_name: title,
          set_course: course,
          term: "",
          definition: "",
        }
        setCard(newCard)
        fetchedCards = await fetchCards()
        setCards([...fetchedCards, newCard])
      }
    } catch (err) {
      console.error("couldnt create card", err)
    }
  }

  const handleDelete = async (id) => {
    try {
      let res = await axios.delete(`${FLASHCARD_API}/${id}`)
      if (res.status === 200) {
        setCards(cards.filter((card) => card.card_id !== id))
        fetchCards()
      }
    } catch (e) {
      console.error("couldnt delete card", e)
    }
  }

  return (
    <div className="card">
      <header className="createCardSet">Create A New Study Set</header>
      <br />
      <Container>
        <Form onSubmit={handleSubmit}>
          <Row className="mb-3 d-flex justify-content-center">
            <Form.Group as={Col} controlId="formGridTitle">
              <Form.Control placeholder="Title" value={title} onChange={handleTitleInput} />
            </Form.Group>
            <Form.Group as={Col} controlId="formGridCourse">
              <Form.Control placeholder="Course" value={course} onChange={handleCourseInput} />
            </Form.Group>
            <Form.Group as={Col} controlId="addSet">
              <Button className="addSet" onClick={() => addSet()}>
                {" "}
                + Create New Set
              </Button>
            </Form.Group>
          </Row>
          <Row>
            <Form.Group className="mb-3" controlId="formCard">
              {cards.length > 0 &&
                cards.map((c, index) => {
                  let cardFields = cards[cards.findIndex((x) => x.card_id === c.card_id)]
                  return (
                    <div key={index}>
                      <Row className="mt-5">
                        {cards.length > 0 && <Form.Label>{index + 1}</Form.Label>}
                        <Form.Group as={Col} controlId="formGridTerm">
                          <Form.Control
                            placeholder="Term"
                            name="term"
                            value={cardFields.term ?? card.term}
                            onChange={(e) => handleCardsInputs(e, c.card_id)}
                          />
                        </Form.Group>
                        <Form.Group as={Col} controlId="formGridDefinition">
                          <Form.Control
                            placeholder="Definition"
                            name="definition"
                            value={cardFields.definition ?? card.definition}
                            onChange={(e) => handleCardsInputs(e, c.card_id)}
                          />
                        </Form.Group>
                        <Form.Group as={Col} className="imageLink" controlId="formGridImage">
                          <Form.Control
                            placeholder="Image Link"
                            name="imageLink"
                            defaultValue={card.back_img}
                            onChange={(e) => handleCardsInputs(e, c.card_id)}
                          />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridButtons">
                          <Button
                            className="deleteButton"
                            variant="secondary"
                            onClick={() => handleDelete(c.card_id)}>
                            Delete
                          </Button>
                        </Form.Group>
                      </Row>
                    </div>
                  )
                })}
            </Form.Group>
          </Row>
          {cards.length > 0 && (
            <Form.Group as={Col} controlId="addCard">
              <Button className="addCard" onClick={() => addCard()}>
                {" "}
                + Add Card
              </Button>
            </Form.Group>
          )}
          <Row className="align-items-center">
            <Button className="createButton" type="submit">
              Return To Dashboard
            </Button>
          </Row>
        </Form>
      </Container>
    </div>
  )
}

export default CreateCards
