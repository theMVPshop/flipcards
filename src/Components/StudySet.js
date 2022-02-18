import React from 'react';

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

import './StudySet.css';

const StudySet = ({
    setInfo
}) => {
    return (
        <Card>
            <Card.Body>
                <Card.Title>{setInfo.course}</Card.Title>
            </Card.Body>
            <Card.Footer className=''>
                <Button variant="primary">Edit</Button>
                <Button variant="primary">Delete</Button>
            </Card.Footer>
        </Card>
    )
}

export default StudySet;