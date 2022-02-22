import React from 'react';
import './CreateCards.css';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { useState } from 'react'


export default function CreateCards() {

  //* if user click on "add Card" button. It will display another row of term and Definition.
  const [title, setTitle] = useState('');
  const [school, setSchool] = useState('');
  const [course, setCourse] = useState('');
  const [cards, setCards] = useState([]);
    const [term1, setTerm1] = useState('');
  const [term2, setTerm2] = useState('');
  const [term3, setTerm3] = useState('');
  const [term4, setTerm4] = useState('');
  const [term5, setTerm5] = useState('');
  const [definition1, setDefinition1] = useState('');
  const [definition2, setDefinition2] = useState('');
  const [definition3, setDefinition3] = useState('');
  const [definition4, setDefinition4] = useState('');
  const [definition5, setDefinition5] = useState('');
  const [inputList, setInputList] = useState({
    term: "", definition: ""
  })
  const [isClicked, setIsClicked] = useState(false);
  const [image, setImage] = useState({});

  const handleChange = (e) => {
    const { input, value } = e.target;
    setInputList({
      ...inputList, 
      [input]: value
    });
  }

  const handleDelete = (id) => {
     const newCards = cards.filter(card => card.id !== id);
    setCards(newCards)
  }

  const addCard = () => {
    setIsClicked(true)
  }
  return (
    <div className='card' variant="dark">
      <div className='title'>
        <header className='createCardSet'>Create A New Study Set</header>
      </div>
      <br />
      <Form className="createCard">
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridTitle">
            <Form.Control placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)}/>
          </Form.Group>
          <Form.Group as={Col} controlId="formGridSchool">
            <Form.Control placeholder="School" value={school} onChange={(e) => setSchool(e.target.value)} />
          </Form.Group>
          <Form.Group as={Col} controlId="formGridCourse">
            <Form.Control placeholder="Course" value={course} onChange={(e) => setCourse(e.target.value)} />
          </Form.Group>
        </Row>
        <br />
        <br />
    <Row>
    <Form.Label>1</Form.Label>
<Form.Group as={Col} controlId="formGridTerm">
  <Form.Control placeholder="Term" id='1' value={inputList.term} onChange={handleChange} />
</Form.Group>
<Form.Group as={Col} controlId="formGridDefinition">
  <Form.Control placeholder="Definition" id='1' value={inputList.definition} onChange={handleChange} />
</Form.Group>
<Form.Group as={Col} controlId="formGridButtons">
<Button className='imageButton'> Add Image</Button>
<Button className='deleteButton' variant='secondary' onClick>Delete</Button>
</Form.Group>
</Row>
<br />
<Row>
<Form.Label>2</Form.Label>
<Form.Group as={Col} controlId="formGridTerm">
  <Form.Control placeholder="Term" value={term2} onChange={(e) => setTerm2(e.target.value)} />
</Form.Group>
<Form.Group as={Col} controlId="formGridDefinition">
  <Form.Control placeholder="Definition" value={definition2} onChange={(e) => setDefinition2(e.target.value)} />
</Form.Group>
<Form.Group as={Col} controlId="formGridButtons">
<Button className='imageButton'> Add Image</Button>
<Button className='deleteButton' variant='secondary'>Delete</Button>
</Form.Group>
</Row>
<br />
<Row>
<Form.Label>3</Form.Label>
<Form.Group as={Col} controlId="formGridTerm">
  <Form.Control placeholder="Term" value={term3} onChange={(e) => setTerm3(e.target.value)}/>
</Form.Group>
<Form.Group as={Col} controlId="formGridDefinition">
  <Form.Control placeholder="Definition" value={definition3} onChange={(e) => setDefinition3(e.target.value)} />
</Form.Group>
<Form.Group as={Col} controlId="formGridButtons">
<Button className='imageButton'> Add Image</Button>
<Button className='deleteButton' variant='secondary'>Delete</Button>
</Form.Group>
</Row>
<br />
<Row>
<Form.Label>4</Form.Label>
<Form.Group as={Col} controlId="formGridTerm">
  <Form.Control placeholder="Term" value={term4} onChange={(e) => setTerm4(e.target.value)} />
</Form.Group>
<Form.Group as={Col} controlId="formGridDefinition">
  <Form.Control placeholder="Definition" value={definition4} onChange={(e) => setDefinition4(e.target.value)} />
</Form.Group>
<Form.Group as={Col} controlId="formGridButtons">
  <Button className='imageButton'> Add Image</Button>
  <Button className='deleteButton' variant='secondary'>Delete</Button>
</Form.Group>
</Row>
<br />
<Row>
<Form.Label>5</Form.Label>
<Form.Group as={Col} controlId="formGridTerm">
  <Form.Control placeholder="Term" value={term5} onChange={(e) => setTerm5(e.target.value)} />
</Form.Group>
<Form.Group as={Col} controlId="formGridDefinition">
  <Form.Control placeholder="Definition" value={definition5} onChange={(e) => setDefinition5(e.target.value)} />
</Form.Group>
<Form.Group as={Col} controlId="formGridButtons">
<Button className='imageButton'> Add Image</Button>
<Button className='deleteButton' variant='secondary'>Delete</Button>
</Form.Group>
</Row>
{isClicked &&   <Row>
<Form.Label>5</Form.Label>
<Form.Group as={Col} controlId="formGridTerm">
  <Form.Control placeholder="Term" value={term5} onChange={(e) => setTerm5(e.target.value)} />
</Form.Group>
<Form.Group as={Col} controlId="formGridDefinition">
  <Form.Control placeholder="Definition" value={definition5} onChange={(e) => setDefinition5(e.target.value)} />
</Form.Group>
<Form.Group as={Col} controlId="formGridButtons">
<Button className='imageButton'> Add Image</Button>
<Button className='deleteButton' variant='secondary'>Delete</Button>
</Form.Group>
</Row> }
<br />
<Form.Group as={Col} controlId='addCard'>
<Button className="addCard" onClick={() => addCard()}> + Add Card</Button>
</Form.Group>
 <Row className="align-items-left">
<Col>
<Button><i class="bi bi-plus-square"> Add Card</i></Button>
</Col>
</Row> 
 <Row className="align-items-center">
<Button className='createButton'>Create</Button>
</Row>
</Form>
    </div>
  )

}
