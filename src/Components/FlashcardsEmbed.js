import React from "react"
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import Button from "react-bootstrap/Button"
import "./Flashcards.css"

import FlashCard from "./FlashCard"



const FlashcardsEmbed = () => {
  const { id } = useParams()
  const [cards, setCards] = useState([])
  const [currentCardIdx, setCurrentCardIdx] = useState(0)

  useEffect(() => {
    // add class to navbar to hide it when component loads
    let navbar = document.querySelector(".navbarHeader")
    navbar.classList.add("hide")
    //remove class from navbar to show it after component is destroyed
    return () => {
      navbar.classList.remove("hide")
    }
  }, [])

  useEffect(() => {
    fetch(`https://flipcardzdb.herokuapp.com/card/${id}`)
      .then((response) => response.json())
      .then((data) => {

        let flashCards = data.map((card, index) => {
          if (index === currentCardIdx) {
            card.isVisible = true
            return card
          } else {
            card.isVisible = false
            return card
          }
        })
        setCards(flashCards)
      })

    // Get the flashcards from the study set and set the first card visibility to isVisible
  }, [])

  const changeCard = (direction) => {
    // Set the current card isVisible to false
    cards[currentCardIdx].isVisible = false

    // If previous card - find the previous card by subtracting one from the index
    // If next card - find the next card by adding one to the index
    let newIdx
    if (direction === "previous") {
      newIdx = currentCardIdx - 1
    } else {
      newIdx = currentCardIdx + 1
    }

    // Set the new current card isVisible to true
    cards[newIdx].isVisible = true
    //Set the new current card index
    setCurrentCardIdx(newIdx)
  }

  if (cards.length === 0) return <h1 className="noCards">No Flashcards for this Set</h1>
  return (
    <div className="flashcards flashcards-embed">
      {cards && cards.map((card, index) => <FlashCard key={index} card={card} />)}
      <div className="navContainer">
        {console.log(cards)}
        <nav className="flashcardsNavigation">
          <Button onClick={() => changeCard("previous")} disabled={currentCardIdx === 0}>
            <i className="bi bi-arrow-left-circle-fill"></i>
          </Button>
          <p className="counter">
            {currentCardIdx + 1} / {cards.length}
          </p>
          <Button onClick={() => changeCard("next")} disabled={currentCardIdx === cards.length - 1}>
            <i className="bi bi-arrow-right-circle-fill"></i>
          </Button>
        </nav>
      </div>
    </div>
  )
}

export default FlashcardsEmbed
