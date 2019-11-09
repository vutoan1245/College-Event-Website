import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

import 'react-datepicker/dist/react-datepicker.css';

function EventForm() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = event => {
    event.preventDefault();
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formTitle">
        <Form.Label>Title</Form.Label>
        <Form.Control
          value={title}
          placeholder="Enter a title"
          onChange={e => setTitle(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="exampleForm.ControlTextarea1">
        <Form.Label>Description</Form.Label>
        <Form.Control
          as="textarea"
          rows="5"
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}

export default EventForm;
