import React from 'react';
import { useParams } from 'react-router-dom';

import './Flashcards.css';

const Flashcards = () => {
    const { id } = useParams();
    return (
        <div>
            <p>ID: {id}</p>
        </div>
    )
}

export default Flashcards;