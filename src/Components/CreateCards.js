import React from "react"
import axios from "axios"
import "./CreateCards.css"
import Form from "react-bootstrap/Form"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Button from "react-bootstrap/Button"
import Spinner from "react-bootstrap/Spinner"
import Dropdown from "react-bootstrap/Dropdown"
import DropdownButton from "react-bootstrap/DropdownButton"
import { useState, useRef, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import Container from "react-bootstrap/esm/Container"
import { getToken } from "../helpers"

const STUDYSET_API = "https://flipcardzdb.herokuapp.com/cardset" // for production
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
  const [error, setError] = useState("")
  const [currentSetId, setCurrentSetId] = useState("")
  const [title, setTitle] = useState("")
  const [course, setCourse] = useState()
  const [card, setCard] = useState({})
  const [cards, setCards] = useState([])
  let newCardRef = useRef()
  let set_nameInputRef = useRef()
  let courseInputRef = useRef()
  const loadingSpinner = <Spinner animation="border" variant="success" size="sm" />

  async function fetchCards() {
    try {
      const { data } = await axios.get(`${FLASHCARD_API}/${currentSetId}`)
      return data
    } catch (e) {
      console.log("fetch cards error", e)
    }
  }
  useEffect(() => courseInputRef.current.focus(), [])
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
      const config = {
        headers: { Authorization: `Bearer ${getToken()}` },
      }
      const body = { set_name: title, course: course }
      const { data } = await axios.post(STUDYSET_API, body, config)
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
    } catch (err) {
      setInProgress(false)
      console.error("createNewSet error", err)
      setError(err.response.data.message)
      setLoading({ cards: false })
      alert(err.response.data.message)
      set_nameInputRef.current.focus()
    }
  }

  async function addCard() {
    setLoading({ card: true })
    try {
      const config = {
        headers: { Authorization: `Bearer ${getToken()}` },
      }
      let addCardSQL, newCard, fetchedCards
      addCardSQL = await axios.post(FLASHCARD_API, card, config)

      if (addCardSQL.status === 200) {
        newCard = {
          set_id: currentSetId,
          set_name: title,
          set_course: course,
          term: "",
          definition: "",
          back_img: "",
        }
        setCard(newCard)
        fetchedCards = await fetchCards()
        setCards([...fetchedCards, newCard])
        setLoading({ card: false })
        newCardRef.current.focus()
      }
    } catch (err) {
      setError(err.response.data.message)
      console.error("couldnt create card", err)
      setLoading({ card: false })
      alert(err.response.data.message)
    }
  }

  async function deleteCard(id) {
    if (!id) return
    setLoading({ deletingCard: true, clickedId: id })
    try {
      const config = {
        headers: { Authorization: `Bearer ${getToken()}` },
      }
      let res = await axios.delete(`${FLASHCARD_API}/${id}`, config)
      if (res.status === 200) {
        let updatedCards = cards.filter((card) => card.card_id !== id)
        setCards(updatedCards)
        setLoading({ deletingCard: false })
        newCardRef.current.focus()
      }
    } catch (err) {
      setError(err.response.data.message)
      console.error("couldnt delete card", err)
      setLoading({ deletingCard: false })
      alert(err.response.data.message)
    }
  }

  async function deleteSet() {
    setLoading({ deletingCards: true })
    try {
      const config = {
        headers: { Authorization: `Bearer ${getToken()}` },
      }
      let res = await axios.delete(`${STUDYSET_API}/${currentSetId}`, config)
      if (res.status === 200) {
        setCurrentSetId("")
        setCards([])
        setTitle("")
        setCourse("")
        setInProgress(false)
        setLoading({ deletingCards: false })
      }
    } catch (err) {
      setError(err.response.data.message)
      console.error("couldnt delete set", err)
      setLoading({ deletingCards: false })
      alert(err.response.data.message)
    }
  }

  return (
    <div className="card">
      <header className="createCardSet px-3">
        {title || course ? `${course}: ${title}` : "Create A New Study Set"}
      </header>
      <br />
      <Container>
        <Form onSubmit={handleSubmit}>
          <Row className="d-flex justify-content-center">
            <Col md={3} className={"my-3"} controlId="formGridCourse">
              <DropdownButton
                id="dropdown-basic-button"
                title={course || "Select Course"}
                ref={courseInputRef}
                placeholder="Course"
                value={course}
                onChange={handleCourseInput}
                disabled={inProgress}
                variant="light">
                <Dropdown.Item onClick={() => setCourse("Medical")}>Medical</Dropdown.Item>
                <Dropdown.Item onClick={() => setCourse("Dental")}>Dental</Dropdown.Item>
                <Dropdown.Item onClick={() => setCourse("Coding")}>Coding</Dropdown.Item>
              </DropdownButton>
            </Col>
            <Col md={3} className={"my-3"} controlId="formGridTitle">
              <Form.Control
                ref={set_nameInputRef}
                placeholder="Title"
                value={title}
                onChange={handleTitleInput}
                disabled={inProgress}
              />
            </Col>
            <Col md={"auto"} className={"my-3"} controlId="createNewSet">
              {inProgress ? (
                <Button className="deleteButton" variant="secondary" onClick={() => deleteSet()}>
                  {loading.cards || loading.deletingCards ? loadingSpinner : "Delete Set"}
                </Button>
              ) : (
                <Button className="createNewSet" onClick={() => createNewSet()}>
                  + Create New Set
                </Button>
              )}
            </Col>
          </Row>

          {cards.length > 0 &&
            cards.map((c, index) => {
              let cardIdxById = cards.findIndex((x) => x.card_id === c.card_id)
              const activeCard = cards[cardIdxById] === cards[cards.length - 1]
              return (
                <Row key={c.card_id}>
                  <Col md={"auto"} className={"my-3"}>
                    <Form.Label>{index + 1}</Form.Label>
                  </Col>
                  <Col md={3} className={"my-3"} controlId="formGridTerm">
                    <Form.Control
                      ref={activeCard ? newCardRef : null}
                      disabled={!activeCard}
                      placeholder="Term"
                      name="term"
                      value={cards[cardIdxById].term ?? card.term}
                      onChange={(e) => handleCardsInputs(e, c.card_id)}
                    />
                  </Col>
                  <Col md={3} className={"my-3"} controlId="formGridDefinition">
                    <Form.Control
                      disabled={!activeCard}
                      placeholder="Definition"
                      name="definition"
                      value={cards[cardIdxById].definition ?? card.definition}
                      onChange={(e) => handleCardsInputs(e, c.card_id)}
                    />
                  </Col>
                  <Col md={3} className="imageLink my-3" controlId="formGridImage">
                    <Form.Control
                      disabled={!activeCard}
                      placeholder="Image Link"
                      name="back_img"
                      value={cards[cardIdxById].back_img || card.back_img}
                      onChange={(e) => handleCardsInputs(e, c.card_id)}
                    />
                  </Col>

                  <Col md={"auto"} className={"my-3"} controlId="formGridButtons">
                    <Button
                      className="deleteButton"
                      variant="secondary"
                      onClick={() => deleteCard(c.card_id)}>
                      {loading.deletingCard && loading.clickedId === c.card_id
                        ? loadingSpinner
                        : "Delete"}
                    </Button>
                  </Col>
                  {index === cards.length - 1 && (
                    <Col md={"auto"} className={"my-3"} controlId="addCard">
                      <Button className="addCard" onClick={() => addCard()}>
                        {" "}
                        {loading.card ? loadingSpinner : "Save Card"}
                      </Button>
                    </Col>
                  )}
                </Row>
              )
            })}

          <div className="nav-btns mt-3">
            <Button className="createButton" type="submit">
              + New Set
            </Button>
            <Button className="returnButton" onClick={() => navigate("/dashboard")}>
              Home
            </Button>
          </div>
        </Form>
      </Container>
    </div>
  )
}

export default CreateCards
