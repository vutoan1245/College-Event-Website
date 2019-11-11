import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import TimePicker from 'react-bootstrap-time-picker';
import { Form, Button, Col, Row } from 'react-bootstrap';

import states from './states';

import 'react-datepicker/dist/react-datepicker.css';

function EventForm() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState('');
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(date.getTime());
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zip, setZip] = useState('');

  const handleSubmit = event => {
    event.preventDefault();
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formTitle">
        <Form.Label>Title</Form.Label>
        <Form.Control
          value={title}
          placeholder="Enter title"
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

      <Form.Row>
        <Form.Group as={Col}>
          <Form.Group as={Row}>
            <Form.Label as="legend" column sm={2}>
              Type
            </Form.Label>
            <Col sm={10}>
              <Form.Check
                type="radio"
                label="Public"
                name="formHorizontalRadios"
                id="formHorizontalRadios1"
                value={type}
                onClick={() => setType('Public')}
              />
              <Form.Check
                type="radio"
                label="Private"
                name="formHorizontalRadios"
                id="formHorizontalRadios2"
                onClick={() => setType('Private')}
              />
              <Form.Check
                type="radio"
                label="RSO"
                name="formHorizontalRadios"
                id="formHorizontalRadios3"
                onClick={() => setType('RSO')}
              />
            </Col>
          </Form.Group>
        </Form.Group>

        <Form.Group as={Col} controlId="formGridState">
          {type === 'RSO' ? (
            <Form.Control
              as="select"
              value={state}
              onChange={e => setState(e.target.value)}
            >
              <option disabled>-- Select a RSO --</option>
              <option>RSO 1</option>
              <option>RSO 2</option>
              <option>RSO 3</option>
            </Form.Control>
          ) : null}
        </Form.Group>
      </Form.Row>

      <Form.Row>
        <Form.Group as={Col} controlId="formGridEmail">
          <Form.Label>Date</Form.Label>

          <DatePicker
            className="form-control"
            selected={date}
            onChange={e => setDate(e)}
          />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridPhone">
          <Form.Label>Time</Form.Label>
          <TimePicker value={time} onChange={v => setTime(v)} />
        </Form.Group>
      </Form.Row>

      <Form.Row>
        <Form.Group as={Col} controlId="formGridEmail">
          <Form.Label>Contact Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridPhone">
          <Form.Label>Contact Phone</Form.Label>
          <Form.Control
            placeholder="(---) --- ----"
            value={phone}
            onChange={e => setPhone(phoneFormat(e.target.value))}
          />
        </Form.Group>
      </Form.Row>

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
          <Form.Control value={city} onChange={e => setCity(e.target.value)} />
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

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}

const phoneFormat = phone => {
  phone = phone.replace(/\D/g, '');
  phone = phone.substring(0, 10);

  const size = phone.length;
  if (size === 0) {
  } else if (size < 4) {
    phone = '(' + phone;
  } else if (size < 7) {
    phone = '(' + phone.substring(0, 3) + ') ' + phone.substring(3, 6);
  } else {
    phone =
      '(' +
      phone.substring(0, 3) +
      ') ' +
      phone.substring(3, 6) +
      ' - ' +
      phone.substring(6, 10);
  }
  return phone;
};

export default EventForm;
