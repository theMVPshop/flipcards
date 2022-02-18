import React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import data from '../data/db.json';

import FlashCard from './FlashCard';

import Container from 'react-bootstrap/Container';

import './Flashcards.css';

const Flashcards = () => {
    const { id } = useParams();
    const [studySet, setStudySet] = useState({});
    const [cards, setCards] = useState([]);

    useEffect(() => {
        // Get the current study set based on the id from the url parameters
        let foundStudySet = data.cardSets.find(set => set.id === Number(id));
        setStudySet(foundStudySet);

        let flashCards = foundStudySet.cards.map((card, index) => {
            if (index === 0) {
                card.isVisible = 'true';
                return card;
            } else {
                card.isVisible = 'false';
                return card;
            }
        })

        setCards(flashCards);
    }, [])

    return (
        <Container>
            <p>Flashcards ID: {id}</p>
            {cards && cards.map((card, index) => (
                <FlashCard key={index} card={card} />
            ))}
        </Container>
    )
}

export default Flashcards;