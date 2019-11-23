import React, { useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Container, Form, Button, Col } from 'react-bootstrap';

import states from '../Event/states';

const styles = {
  form: {
    paddingBottom: '7rem'
  },
  error: {
    margin: 'auto 1rem',
    color: 'red'
  }
};

function UniversityForm(props) {
  const [name, setName] = useState('');
  const [pictureUrl, setPictureUrl] = useState('');
  const [studentCount, setStudentCount] = useState('');
  const [description, setDescription] = useState('');
  const [lname, setLname] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zip, setZip] = useState('');
  const [error, setError] = useState('');

  const token = useSelector(state => state.token);

  const validate = () => {
    if (
      !name ||
      !description ||
      !lname ||
      !address ||
      !state ||
      !city ||
      !zip
    ) {
      setError('Please enter all fields');
      return false;
    }

    return true;
  };
  const handleSubmit = event => {
    event.preventDefault();

    if (!validate()) {
      return;
    }

    axios
      .post(
        '/api/super-admin/university/create',
        {
          name,
          description,
          student_count: studentCount,
          picture: pictureUrl,
          location: {
            lname: lname,
            address: `${address}, ${city}, ${state}, ${zip}`
          }
        },
        {
          headers: {
            Authorization: token
          }
        }
      )
      .then(result => {
        props.history.push('/student/university/' + result.data.uid);
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <Container>
      <br />
      <br />

      <Form onSubmit={handleSubmit} style={styles.form}>
        <Form.Group controlId="formTitle">
          <Form.Label>University name</Form.Label>
          <Form.Control
            value={name}
            placeholder="Enter name"
            onChange={e => setName(e.target.value)}
          />
        </Form.Group>

        <Form.Row>
          <Form.Group as={Col} controlId="formURL">
            <Form.Label>Picture URL</Form.Label>
            <Form.Control
              value={pictureUrl}
              placeholder="URL"
              onChange={e => setPictureUrl(e.target.value)}
            />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridZip">
            <Form.Label>Student number</Form.Label>
            <Form.Control
              value={studentCount}
              onChange={e => setStudentCount(e.target.value)}
            />
          </Form.Group>
        </Form.Row>

        <Form.Group controlId="exampleForm.ControlTextarea1">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows="5"
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formTitle">
          <Form.Label>Location name</Form.Label>
          <Form.Control
            value={lname}
            placeholder="Enter location name"
            onChange={e => setLname(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formGridAddress1">
          <Form.Label>Address</Form.Label>
          <Form.Control
            placeholder="1234 Main St"
            value={address}
            onChange={e => setAddress(e.target.value)}
          />
        </Form.Group>

        <Form.Row>
          <Form.Group as={Col} controlId="formGridCity">
            <Form.Label>City</Form.Label>
            <Form.Control
              value={city}
              onChange={e => setCity(e.target.value)}
            />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridState">
            <Form.Label>State</Form.Label>
            <Form.Control
              as="select"
              value={state}
              onChange={e => setState(e.target.value)}
            >
              <option>Choose...</option>
              {states.map((state, index) => (
                <option key={index}>{state}</option>
              ))}
              <option>...</option>
            </Form.Control>
          </Form.Group>

          <Form.Group as={Col} controlId="formGridZip">
            <Form.Label>Zip</Form.Label>
            <Form.Control value={zip} onChange={e => setZip(e.target.value)} />
          </Form.Group>
        </Form.Row>

        <Form.Row>
          <Button variant="primary" type="submit">
            Submit
          </Button>
          {error ? <p style={styles.error}>{error}</p> : null}
        </Form.Row>
      </Form>
    </Container>
  );
}

export default UniversityForm;
