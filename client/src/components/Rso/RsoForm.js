import React, { useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Form, Button } from 'react-bootstrap';

import 'react-datepicker/dist/react-datepicker.css';

function EventForm(props) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const token = useSelector(state => state.token);
  const userData = useSelector(state => state.userData);
  const handleSubmit = event => {
    event.preventDefault();

    axios
      .post(
        '/api/student/rso/create',
        {
          name,
          description,
          admin: userData,
          member: []
        },
        {
          headers: {
            Authorization: token
          }
        }
      )
      .then(result => {
        console.log(result);
        props.history.push('/student/rso');
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formTitle">
        <Form.Label>Title</Form.Label>
        <Form.Control
          value={name}
          placeholder="Enter a title"
          onChange={e => setName(e.target.value)}
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
