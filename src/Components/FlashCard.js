import React from 'react';
import { useState } from 'react';

import './FlashCard.css';

const FlashCard = ({
    card
}) => {

    const [flipped, setFlipped] = useState(false);

    const flipCard = () => setFlipped(!flipped);

    return (
        <>
            {card.isVisible && (
                <button
                    onClick={flipCard}
                    className="flashcard"
                >
                    <div className={`flashcardInner ${flipped ? 'showBack' : 'showFront'}`}>
                        <div className="flashcardFront">
                            <p>Term: {card.term}</p>
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

export default FlashCard;