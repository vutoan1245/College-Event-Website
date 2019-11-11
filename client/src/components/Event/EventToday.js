import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Col, FormControl } from 'react-bootstrap';

import EventReview from './EventPreview';

function EventToday() {
  const [eventList, setEventList] = useState([]);

  const [universityList, setUniversityList] = useState([]);

  useEffect(() => {
    axios
      .get('/api/university/names')
      .then(result => setUniversityList(result.data))
      .catch(err => console.error(err));
  }, []);

  useEffect(() => {
    axios
      .get('https://events.ucf.edu/feed.json')
      .then(result => {
        setEventList(result.data);
      })
      .catch(err => console.error(err));
  }, []);
  return (
    <>
      <Form.Row>
        <Form.Group as={Col} controlId="formGridCity">
          <FormControl type="text" placeholder="Search" className="mr-sm-2" />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridState">
          <Form.Control as="select">
            <option> Select an university </option>
            {universityList.map((uni, index) => (
              <option key={index}>{uni}</option>
            ))}
          </Form.Control>
        </Form.Group>
      </Form.Row>

      {eventList.map((event, index) => (
        <EventReview
          key={index}
          title={event.title}
          date={event.starts}
          description={event.description}
        />
      ))}
    </>
  );
}

export default EventToday;
