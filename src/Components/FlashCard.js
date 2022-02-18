import React from 'react';

import styles from './FlashCard.module.css';

const FlashCard = ({
    card
}) => {
    return (
        <button className={styles.flashcard}>
            <div className={styles.flashcardInner}>
                <div className={styles.flashcardFront}>
                    <p>Term: {card.term}</p>
                </div>
                <div className={styles.flashcardBack}>
                    <p>Definition: {card.definition}</p>
                </div>
            </div>
        </button>
    )
}

export default FlashCard;