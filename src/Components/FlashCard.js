import React from "react"
import { useState } from "react"

import "./FlashCard.css"

const FlashCard = ({ card }) => {
  const [flipped, setFlipped] = useState(false)

  const flipCard = () => setFlipped(!flipped)

  return (
    <>
      {card.isVisible && (
        <button onClick={flipCard} className="flashcard">
          <div className={`flashcardInner ${flipped ? "showBack" : "showFront"}`}>
            <div className="flashcardFront">
              {card.front_img && card.front_img.startsWith("http") ? (
                <div>
                  <p>Term: {card.term}</p>
                  <div style={{ width: "300px", height: "200px", overflow: "hidden" }}>
                    <img style={{ width: "100%" }} src={card.front_img} alt={card.term} />
                  </div>
                  <p className="cardFooter">Click to reveal definition</p>
                </div>
              ) : (
                <div>
                  <p>Term: {card.term}</p>
                  <p className="cardFooter">Click to reveal definition</p>
                </div>
              )}
            </div>
            <div className="flashcardBack">
              <p>Definition: {card.definition}</p>
            </div>
          </div>
        </button>
      )}
    </>
  )
}

export default FlashCard
