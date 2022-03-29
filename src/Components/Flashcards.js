import React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import data from '../data/db.json';

import FlashCard from './FlashCard';
import EmbedModal from './EmbedModal';

import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

import './Flashcards.css';

const Flashcards = () => {
    const { id } = useParams();
    const [studySet, setStudySet] = useState({});
    const [cards, setCards] = useState([]);
    const [currentCardIdx, setCurrentCardIdx] = useState(0);

    useEffect(() => {
        // Get the current study set based on the id from the url parameters
        let foundStudySet = data.cardSets.find(set => set.id === Number(id));
        setStudySet(foundStudySet);

        // Get the flashcards from the study set and set the first card visibility to isVisible
        let flashCards = foundStudySet.cards.map((card, index) => {
            if (index === currentCardIdx) {
                card.isVisible = true;
                return card;
            } else {
                card.isVisible = false;
                return card;
            }
        })
        setCards(flashCards);
    }, [data])

    const changeCard = (direction) => {
        // Set the current card isVisible to false
        cards[currentCardIdx].isVisible = false;

        // If previous card - find the previous card by subtracting one from the index
        // If next card - find the next card by adding one to the index
        let newIdx;
        if (direction === 'previous') {
            newIdx = currentCardIdx - 1;
        } else {
            newIdx = currentCardIdx + 1;
        }

        // Set the new current card isVisible to true
        cards[newIdx].isVisible = true;
        //Set the new current card index
        setCurrentCardIdx(newIdx);
    }

    return (
        <Container className="flashcards">
            {cards && cards.map((card, index) => (
                <FlashCard key={index} card={card} />
            ))}
            <div className="navContainer">
                <nav className='flashcardsNavigation'>
                    <Button
                        onClick={() => changeCard('previous')}
                        disabled={currentCardIdx === 0}
                    >
                        <i className="bi bi-arrow-left-circle-fill"></i>
                    </Button>
                    <p className='counter'>
                        {currentCardIdx + 1} / {cards.length}
                    </p>
                    <Button
                        onClick={() => changeCard('next')}
                        disabled={currentCardIdx === cards.length - 1}
                    >
                        <i className="bi bi-arrow-right-circle-fill"></i>
                    </Button>
                </nav>
                <EmbedModal studySetId={id} />
            </div>
        </Container>
    )
}

export default Flashcards;