import React from 'react';
import Form from "react-bootstrap/Form";
import Button from 'react-bootstrap/Button';

export default function CreateCards() {

  //* if user click on "add Card" button. It will display another row of term and Definition.

  return (
    <Form>
      <Form.Group className="mb-3" controlId="CardName">
        <Form.Label>Let's create A new study set</Form.Label>
      </Form.Group>
      <Row>
        <Col>
          <Form.Control placeholder="Course: Ex. Dental" />
        </Col>
        <Col>
          <Form.Control placeholder="Title: Ex. Teeth Extraction" />
        </Col>
        <Col>
          <Form.Control placeholder="Description" />
        </Col>
      </Row>

      <Row>
        <Col>
          <Form.Control placeholder="Term" />
        </Col>
        <Col>
          <Form.Control placeholder="Definition" />
        </Col>
        <Button variant="primary" type="deleteCard">
          Delete
  </Button>
      </Row>

      <Row>
        <Col>
          <Form.Control placeholder="Term" />
        </Col>
        <Col>
          <Form.Control placeholder="Definition" />
        </Col>
        <Button variant="primary" type="deleteCard">
          Delete
  </Button>
      </Row>

      <Row>
        <Col>
          <Form.Control placeholder="Term" />
        </Col>
        <Col>
          <Form.Control placeholder="Definition" />
        </Col>
        <Button variant="primary" type="deleteCard">
          Delete
  </Button>
      </Row>

      <Button variant="primary" type="addStudySet">
        Add Card
  </Button>
      <Button variant="primary" type="addStudySet">
        Create Study Set
</Button>

    </Form>
  )

}