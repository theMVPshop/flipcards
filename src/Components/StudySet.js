import React from 'react';
import { Link } from 'react-router-dom';

import EditCard from './EditCard';

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

import './StudySet.css';

const StudySet = ({
    setInfo,
    handleDelete
}) => {
    return (
        <Card className="card-study-set">
            <Link to={`/flashcards/${setInfo.id}`}>
                <Card.Body>
                    <Card.Title>{setInfo.course}</Card.Title>
                </Card.Body>
            </Link>
            <Card.Footer>
                <EditCard studySetInfo={setInfo} />
                <Button
                    className="btn-delete"
                    onClick={() => handleDelete(setInfo.id)}
                >
                    Delete
                </Button>
            </Card.Footer>
        </Card>
    )
}

export default StudySet;