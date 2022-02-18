import React from 'react';
import './CreateCards.css';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';


export default function CreateCards() {

  //* if user click on "add Card" button. It will display another row of term and Definition.

  return (
    <div className='card' variant="dark">
      <div className='title'>
        <header className='createCardSet'>Create A New Study Set</header>
      </div>
      <br />
      <Form className="createCard">
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridTitle">
            <Form.Control placeholder="Title" />
          </Form.Group>
          <Form.Group as={Col} controlId="formGridSchool">
            <Form.Control placeholder="School" />
          </Form.Group>
          <Form.Group as={Col} controlId="formGridCourse">
            <Form.Control placeholder="Course" />
          </Form.Group>
        </Row>
        <br />
        <br />
        <Row>
          <Form.Label>1</Form.Label>
          <Form.Group as={Col} controlId="formGridTerm">
            <Form.Control placeholder="Term" />
          </Form.Group>
          <Form.Group as={Col} controlId="formGridDefinition">
            <Form.Control placeholder="Definition" />
          </Form.Group>
          <Form.Group as={Col} controlId="formGridButtons">
          <Button className='imageButton'> Add Image</Button>
          <Button className='deleteButton' variant='secondary'>Delete</Button>
          </Form.Group>
        </Row>
        <br />
        <Row>
          <Form.Label>2</Form.Label>
          <Form.Group as={Col} controlId="formGridTerm">
            <Form.Control placeholder="Term" />
          </Form.Group>
          <Form.Group as={Col} controlId="formGridDefinition">
            <Form.Control placeholder="Definition" />
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
            <Form.Control placeholder="Term" />
          </Form.Group>
          <Form.Group as={Col} controlId="formGridDefinition">
            <Form.Control placeholder="Definition" />
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
            <Form.Control placeholder="Term" />
          </Form.Group>
          <Form.Group as={Col} controlId="formGridDefinition">
            <Form.Control placeholder="Definition" />
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
            <Form.Control placeholder="Term" />
          </Form.Group>
          <Form.Group as={Col} controlId="formGridDefinition">
            <Form.Control placeholder="Definition" />
          </Form.Group>
          <Form.Group as={Col} controlId="formGridButtons">
          <Button className='imageButton'> Add Image</Button>
          <Button className='deleteButton' variant='secondary'>Delete</Button>
          </Form.Group>
        </Row>
        <br />
        <Form.Group as={Col} controlId='addCard'>
        <Button className="addCard"> + Add Card</Button>
        </Form.Group>
        {/* <Row className="align-items-left">
          <Col>
          <Button><i class="bi bi-plus-square"> Add Card</i></Button>
          </Col>
        </Row> */}
        <Row className="align-items-center">
          <Button className='createButton'>Create</Button>
        </Row>
      </Form>
    </div>
  )

}

{/* <i class="bi bi-image" variant='primary'>  */}

{/* <Button className='deleteButton' variant='secondary'> <i class="bi bi-trash"></i></Button> */}