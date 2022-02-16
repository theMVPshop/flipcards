import React from 'react';

import Card from 'react-bootstrap/Card';

import './StudySet.css';

const StudySet = ({
    title
}) => {
    return (
        <Card className='study-set'>
            <Card.Body>
                <Card.Title>{title}</Card.Title>
            </Card.Body>
        </Card>
    )
}

export default StudySet;