import React from 'react';
import { Link } from 'react-router-dom';

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

import './StudySet.css';

const StudySet = ({
    setInfo
}) => {
    return (
        <Card>
            <Link to={`/flashcards/${setInfo.id}`}>
                <Card.Body>
                    <Card.Title>{setInfo.course}</Card.Title>
                </Card.Body>
            </Link>
            <Card.Footer>
                <Button className="btn-edit">Edit</Button>
                <Button className="btn-delete">Delete</Button>
            </Card.Footer>
        </Card>
    )
}

export default StudySet;