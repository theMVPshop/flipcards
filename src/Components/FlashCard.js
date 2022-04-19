import React, { useEffect } from "react"
import { useState } from "react"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"

import "./FlashCard.css"

const FlashCard = ({ card, isVisible }) => {
  const [flipped, setFlipped] = useState(false)

  const flipCard = () => setFlipped(!flipped)

  useEffect(() => {
    if (isVisible === false) {
      setFlipped(false)
    }
  }, [isVisible])

  return (
    <>
      {card.isVisible && (
        <button onClick={flipCard} className="flashcard">
          <div className={`flashcardInner ${flipped ? "showBack" : "showFront"}`}>
            <div className="flashcardFront">
              {card.front_img && card.front_img.startsWith("http") ? (
                <div>
                  <p>Term: {card.term}</p>
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
              <Container>
                <Row className="align-items-center">
                  <Col md={6}>
                    <p>Definition: {card.definition}</p>
                  </Col>

                  <Col md={6}>
                    <img
                      style={{ maxWidth: "100%", height: "auto", maxHeight: "300px" }}
                      src={card.back_img}
                      alt={card.term}
                    />
                  </Col>
                </Row>
              </Container>
            </div>
          </div>
        </button>
      )}
    </>
  )
}

export default FlashCard
