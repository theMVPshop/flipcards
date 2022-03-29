import React from 'react';
import './CreateCards.css';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/esm/Container';

const FLASHCARD_API = 'https://flipcardzdb.herokuapp.com/card';

const CreateCards = () => {
  const [title, setTitle] = useState('');
  const [course, setCourse] = useState('');

  const [fields, setFields] = useState([{
    term: '',
    definition: '',
    description: '',
    front_img: '',
    back_img: ''
  }])

  let navigate = useNavigate();

  const handleChange = (index, e) => {
    const values = [...fields]
    values[index][e.target.name] = e.target.value
    setFields(values)
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    fields.forEach((field, idx) => {
      field.title = title;
      field.course = course;

      fetch(FLASHCARD_API, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(field)
      })
        .then(res => res.json())
        .then(navigate('/dashboard'))
        .catch(error => console.log('Failed to create flashcard'))
    })
  }

  const addCard = () => {
    setFields([...fields, {
      term: '',
      definition: '',
      description: '',
      front_img: '',
      back_img: ''
    }])
  }

  const handleDelete = (id) => {
    const values = [...fields]
    values.splice(id, 1)
    setFields([...values])
  }

  return (
    <div className='card'>
      <header className='createCardSet'>Create A New Study Set</header>
      <br />
      <Container>
        <Form onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridTitle">
              <Form.Control placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
            </Form.Group>
            <Form.Group as={Col} controlId="formGridCourse">
              <Form.Control placeholder="Course" value={course} onChange={(e) => setCourse(e.target.value)} />
            </Form.Group>
          </Row>
          <Row>
            <Form.Group className="mb-3" controlId="formCard">
              {fields.map((field, index) => (
                <div key={index}>
                  <Row className="mt-5">
                    <Form.Label>{index + 1}</Form.Label>
                    <Form.Group as={Col} controlId="formGridTerm">
                      <Form.Control placeholder="Term" name="term" defaultValue={field.term} onChange={(e) => handleChange(index, e)} />
                    </Form.Group>
                    <Form.Group as={Col} controlId="formGridDefinition">
                      <Form.Control placeholder="Definition" name="definition" defaultValue={field.definition} onChange={(e) => handleChange(index, e)} />
                    </Form.Group>
                    <Form.Group as={Col} controlId="formGridButtons">
                      <Button className='imageButton'> Add Image</Button>
                      <Button className='deleteButton' variant='secondary' onClick={() => handleDelete(index)}>Delete</Button>
                    </Form.Group>
                  </Row>
                </div>
              ))}
            </Form.Group>
          </Row>
          <Form.Group as={Col} controlId='addCard'>
            <Button className="addCard" onClick={() => addCard()}> + Add Card</Button>
          </Form.Group>
          <Row className="align-items-center">
            <Button className='createButton' type='submit'>Create</Button>
          </Row>
        </Form>
      </Container>
    </div>
  )
}

export default CreateCards