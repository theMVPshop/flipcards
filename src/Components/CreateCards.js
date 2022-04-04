import React from "react"
import axios from "axios"
import "./CreateCards.css"
import Form from "react-bootstrap/Form"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Button from "react-bootstrap/Button"
import Spinner from "react-bootstrap/Spinner"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Container from "react-bootstrap/esm/Container"

const STUDYSET_API = "https://flipcardzdb.herokuapp.com/cardset"
const FLASHCARD_API = "https://flipcardzdb.herokuapp.com/card"
// const STUDYSET_API = "http://localhost:8080/cardset"
// const FLASHCARD_API = "http://localhost:8080/card"

const CreateCards = () => {
  const navigate = useNavigate()
  const [inProgress, setInProgress] = useState(false)
  const [loading, setLoading] = useState({
    card: false,
    cards: false,
    deletingCard: false,
    deletingCards: false,
    clickedId: null,
  })
  const [currentSetId, setCurrentSetId] = useState("")
  const [title, setTitle] = useState("")
  const [course, setCourse] = useState("")
  const [card, setCard] = useState({})
  const [cards, setCards] = useState([])
  let newCardRef = React.useRef()
  const spinner = <Spinner animation="border" variant="info" size="sm" />

  async function fetchCards() {
    try {
      const { data } = await axios.get(`${FLASHCARD_API}/${currentSetId}`)
      return data
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
      const matchingCardIdx = newState.findIndex((c) => c.card_id === cardId)
      newState[matchingCardIdx][e.target.name] = e.target.value
      return newState
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setCard({})
    setCards([])
    setTitle("")
    setCourse("")
    setInProgress(false)
    // navigate("/dashboard")
  }

  async function createNewSet() {
    if (!title || !course) return
    setLoading({ cards: true })
    setInProgress(true)
    try {
      const body = { set_name: title, course: course }
      const { data } = await axios.post(STUDYSET_API, body)
      setCurrentSetId(data.set_id)
      const newCard = {
        set_id: data.set_id,
        set_name: data.set_name,
        set_course: data.set_course,
      }
      setCard(newCard)
      setCards([...cards, newCard])
      setLoading({ cards: false })
      newCardRef.current.focus()
    } catch (error) {
      console.error("createNewSet error", error)
    }
  }

  async function addCard() {
    setLoading({ card: true })
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
        setLoading({ card: false })
        newCardRef.current.focus()
      }
    } catch (err) {
      console.error("couldnt create card", err)
    }
  }

  async function deleteCard(id) {
    if (!id) return
    setLoading({ deletingCard: true, clickedId: id })
    try {
      let res = await axios.delete(`${FLASHCARD_API}/${id}`)
      if (res.status === 200) {
        let updatedCards = cards.filter((card) => card.card_id !== id)
        setCards(updatedCards)
        setLoading({ deletingCard: false })
        newCardRef.current.focus()
      }
    } catch (e) {
      console.error("couldnt delete card", e)
    }
  }

  async function deleteSet() {
    setLoading({ deletingCards: true })
    try {
      let res = await axios.delete(`${STUDYSET_API}/${currentSetId}`)
      if (res.status === 200) {
        setCurrentSetId("")
        setCards([])
        setTitle("")
        setCourse("")
        setInProgress(false)
        setLoading({ deletingCards: false })
      }
    } catch (e) {
      console.error("couldnt delete set", e)
    }
  }

  return (
    <div className="card">
      <header className="createCardSet">
        {title || course ? `${course}: ${title}` : "Create A New Study Set"}
      </header>
      <br />
      <Container>
        <Form onSubmit={handleSubmit}>
          <Row className="mb-3 d-flex justify-content-center">
            <Form.Group as={Col} controlId="formGridCourse">
              <Form.Control
                placeholder="Course"
                value={course}
                onChange={handleCourseInput}
                disabled={inProgress}
              />
            </Form.Group>
            <Form.Group as={Col} controlId="formGridTitle">
              <Form.Control
                placeholder="Title"
                value={title}
                onChange={handleTitleInput}
                disabled={inProgress}
              />
            </Form.Group>
            <Form.Group as={Col} controlId="createNewSet">
              {inProgress ? (
                <Button className="deleteButton" variant="secondary" onClick={() => deleteSet()}>
                  {" "}
                  {loading.cards || loading.deletingCards ? spinner : "- Delete Set"}
                </Button>
              ) : (
                <Button className="createNewSet" onClick={() => createNewSet()}>
                  {" "}
                  + Create New Set
                </Button>
              )}
            </Form.Group>
          </Row>
          <Row>
            <Form.Group className="mb-3" controlId="formCard">
              {cards.length > 0 &&
                cards.map((c, index) => {
                  let cardIdxById = cards.findIndex((x) => x.card_id === c.card_id)
                  const activeCard = cards[cardIdxById] === cards[cards.length - 1]
                  return (
                    <div key={index}>
                      <Row className="mt-5">
                        {cards.length > 0 && <Form.Label>{index + 1}</Form.Label>}
                        <Form.Group as={Col} controlId="formGridTerm">
                          <Form.Control
                            ref={activeCard ? newCardRef : null}
                            disabled={!activeCard}
                            placeholder="Term"
                            name="term"
                            value={cards[cardIdxById].term ?? card.term}
                            onChange={(e) => handleCardsInputs(e, c.card_id)}
                          />
                        </Form.Group>
                        <Form.Group as={Col} controlId="formGridDefinition">
                          <Form.Control
                            disabled={!activeCard}
                            placeholder="Definition"
                            name="definition"
                            value={cards[cardIdxById].definition ?? card.definition}
                            onChange={(e) => handleCardsInputs(e, c.card_id)}
                          />
                        </Form.Group>
                        <Form.Group as={Col} className="imageLink" controlId="formGridImage">
                          <Form.Control
                            disabled={!activeCard}
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
                            onClick={() => deleteCard(c.card_id)}>
                            {loading.deletingCard && loading.clickedId === c.card_id
                              ? spinner
                              : "Delete"}
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
                {loading.card ? spinner : "+ Add Card"}
              </Button>
            </Form.Group>
          )}
          <Row className="align-items-center">
            <Button className="createButton" type="submit">
              Begin New Set
            </Button>
          </Row>
        </Form>
      </Container>
    </div>
  )
}

export default CreateCards
