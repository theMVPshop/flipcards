import React from 'react';
import './CreateCards.css';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/esm/Container';


const CreateCards = () => {

  const [fields, setFields] = useState([{
    id: 1,
    term: "",
    definition: ""
  }])
  const [title, setTitle] = useState('');
  const [school, setSchool] = useState('');
  // const [course, setCourse] = useState('');

  let navigate = useNavigate();

  const handleChange = (id, e) => {
    const values = [...fields]
    values[id][e.target.name] = e.target.value
    setFields(values)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/dashboard')
  }

  const addCard = (id) => {
    setFields([...fields, { id: id + 1, firstName: '', lastName: '' }])
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
            <Form.Control placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)}/>
          </Form.Group>
          <Form.Group as={Col} controlId="formGridSchool">
            <Form.Control placeholder="School" value={school} onChange={(e) => setSchool(e.target.value)} />
          </Form.Group>
          {/* <Form.Group as={Col} controlId="formGridCourse">
            <Form.Control placeholder="Course" value={course} onChange={(e) => setCourse(e.target.value)} />
          </Form.Group> */}
        </Row>
        <br />
        <br />
        <Row>
            <Form.Group className="mb-3" controlId="formCard">
            {fields.map((field, id) => (
                <div key={field.id}>
                  <Row className="mt-5">
                    <Form.Label>{id + 1}</Form.Label>
            <Form.Group as={Col} controlId="formGridTerm">
              <Form.Control placeholder="Term" id={field.id} defaultValue={field.term} onChange={(e) => handleChange(id, e)} />
            </Form.Group>
                    <Form.Group as={Col} controlId="formGridDefinition">
              <Form.Control placeholder="Definition" id={field.id} defaultValue={field.definition} onChange={(e) => handleChange(id, e)} />
            </Form.Group>
                    <Form.Group as={Col} controlId="formGridButtons">
            <Button className='imageButton'> Add Image</Button>
            <Button className='deleteButton' variant='secondary' onClick={() => handleDelete(id)}>Delete</Button>
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
    </div>
  )
}

export default CreateCards