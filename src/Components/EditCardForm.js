import React from "react";
import { useState, useEffect } from 'react';

import Container from 'react-bootstrap/esm/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

const EditCardForm = ({
    // From editCard.js
    studySetInfo
}) => {
    const [cards, setCards] = useState([]);
    const [title, setTitle] = useState('');
    const [course, setCourse] = useState('');

    useEffect(() => {
        setCards(studySetInfo.cards);
        setTitle(studySetInfo.title || '');
        setCourse(studySetInfo.course || '');
    }, [])

    const handleChange = (e, index) => {
        const newCards = [...cards];
        newCards[index][e.target.name] = e.target.value;
        setCards(newCards);
    }

    const addCard = (id) => {
        setCards([...cards, { id: '', term: '', definition: '' }])
    }

    const handleDelete = (id) => {
        const rows = [...cards]
        const newRows = rows.filter(row => Number(row.id) !== Number(id))
        setCards(newRows);
    }

    return (
        <Container>
            <Form>
                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridTitle">
                        <Form.Control placeholder="Title" name="title" value={title} onChange={(e) => setTitle(e.target.value)} />
                    </Form.Group>
                    <Form.Group as={Col} controlId="formGridSchool">
                        <Form.Control placeholder="Course" name="course" value={course} onChange={(e) => setCourse(e.target.value)} />
                    </Form.Group>
                </Row>
                <br />
                <br />
                <Row>
                    <Form.Group className="mb-3" controlId="formCard">
                        {cards.map((field, index) => (
                            <div key={index}>
                                <Row className="mt-5">
                                    <Form.Label>{index + 1}</Form.Label>
                                    <Form.Group as={Col} controlId="formGridTerm">
                                        <Form.Control placeholder="Term" name="term" value={cards[index].term} onChange={(e) => handleChange(e, index)} />
                                    </Form.Group>
                                    <Form.Group as={Col} controlId="formGridDefinition">
                                        <Form.Control placeholder="Definition" name="definition" value={cards[index].definition} onChange={(e) => handleChange(e, index)} />
                                    </Form.Group>
                                    <Form.Group as={Col} controlId="formGridButtons">
                                        <Button className='imageButton'> Add Image</Button>
                                        <Button className='deleteButton' variant='secondary' onClick={() => handleDelete(field.id)}>Delete</Button>
                                    </Form.Group>
                                </Row>
                            </div>
                        ))}
                    </Form.Group>
                </Row>
                <Form.Group as={Col} controlId='addCard'>
                    <Button className="addCard" onClick={() => addCard()}> + Add Card</Button>
                </Form.Group>
                <Row className="align-items-left">
                </Row>

                <Row className="align-items-center">
                    <Button className='createButton' type='submit'>Create</Button>
                </Row>
            </Form>
        </Container>
    )
}

export default EditCardForm;