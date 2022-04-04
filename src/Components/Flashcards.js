import React from "react"
import axios from "axios"
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
// import data from "../data/db.json";

import FlashCard from "./FlashCard"
import EmbedModal from "./EmbedModal"

import Container from "react-bootstrap/Container"
import Button from "react-bootstrap/Button"

import "./Flashcards.css"

const Flashcards = () => {
  const { id } = useParams()
  const flashcardsBySetId = `https://flipcardzdb.herokuapp.com/card/${id}`
  const [cards, setCards] = useState([])
  const [currentCardIdx, setCurrentCardIdx] = useState(0)

  useEffect(() => {
    async function fetchData() {
      try {
        let { data } = await axios.get(flashcardsBySetId)
        // Set the first card visibility to isVisible
        let cardSet = data.map((card, index) =>
          index === currentCardIdx
            ? ((card.isVisible = true), card)
            : ((card.isVisible = false), card)
        )
        setCards(cardSet)
      } catch (e) {
        console.log("fetch cards error", e)
      }
    }
    return fetchData()
  }, [id])

  const changeCard = (direction) => {
    let newCurrentCardIdx // initialize new currentCardIdx
    // Set the current card.isVisible to false
    setCards((prevState) => {
      let cards = prevState
      cards[currentCardIdx].isVisible = false
      return cards
    })
    // If "<-" is clicked => find the previous card by subtracting 1 from the currentIndex...
    if (direction === "previous") newCurrentCardIdx = currentCardIdx - 1
    else if (direction === "next") newCurrentCardIdx = currentCardIdx + 1 // ...else if "->" is clicked => find the next card by adding 1 to the currentIndex
    // Set the new current card.isVisible to true
    setCards((prevState) => {
      let cards = [...prevState]
      cards[newCurrentCardIdx].isVisible = true
      return cards
    })
    setCurrentCardIdx(newCurrentCardIdx) //Set the new current card index
  }

  return (
    <Container className="flashcards">
      {cards.length > -1 && cards.map((card) => <FlashCard key={card.card_id} card={card} />)}
      <div className="navContainer">
        <nav className="flashcardsNavigation">
          <Button onClick={() => changeCard("previous")} disabled={currentCardIdx === 0}>
            <i class="bi bi-arrow-left-circle-fill"></i>
          </Button>
          <p className="counter">
            {currentCardIdx + 1} / {cards.length}
          </p>
          <Button onClick={() => changeCard("next")} disabled={currentCardIdx === cards.length - 1}>
            <i class="bi bi-arrow-right-circle-fill"></i>
          </Button>
        </nav>
        <EmbedModal studySetId={id} />
      </div>
    </Container>
  )
}

export default Flashcards
