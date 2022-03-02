import React from "react";
import { useState, useEffect } from 'react';

import Container from 'react-bootstrap/esm/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

const EditCardForm = ({
    studySetInfo
}) => {
    const [fields, setFields] = useState([]);
    const [title, setTitle] = useState('');
    const [school, setSchool] = useState('');

    const emptyField = {
        id: 1,
        term: "",
        definition: ""
    }

    useEffect(() => {
        setFields(studySetInfo.cards || emptyField)
    }, [])

    const handleChange = (id, e) => {
        const values = [...fields]
        values[id][e.target.name] = e.target.value
        setFields(values)
    }

    const addCard = (id) => {
        setFields([...fields, { id: id + 1, term: '', definition: '' }])
    }

    const handleDelete = (id) => {
        const rows = [...fields]
        const newRows = rows.filter(row => Number(row.id) !== Number(id))
        setFields([...newRows])
    }

    return (
        <Container>
            <Form>
                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridTitle">
                        <Form.Control placeholder="Title" defaultValue={studySetInfo.title} onChange={(e) => setTitle(e.target.value)} />
                    </Form.Group>
                    <Form.Group as={Col} controlId="formGridSchool">
                        <Form.Control placeholder="School" defaultValue={studySetInfo.course} onChange={(e) => setSchool(e.target.value)} />
                    </Form.Group>
                </Row>
                <br />
                <br />
                <Row>
                    <Form.Group className="mb-3" controlId="formCard">
                        {fields.map((field, index) => (
                            <div key={index}>
                                <Row className="mt-5">
                                    <Form.Label>{index + 1}</Form.Label>
                                    <Form.Group as={Col} controlId="formGridTerm">
                                        <Form.Control placeholder="Term" defaultValue={field.term} onChange={(e) => handleChange(field.id, e)} />
                                    </Form.Group>
                                    <Form.Group as={Col} controlId="formGridDefinition">
                                        <Form.Control placeholder="Definition" defaultValue={field.definition} onChange={(e) => handleChange(field.id, e)} />
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