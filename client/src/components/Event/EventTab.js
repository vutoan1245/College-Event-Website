import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Tabs, Tab, Container, Form, FormControl, Col } from 'react-bootstrap';

import EventReview from './EventPreview';
import EventForm from './EventForm';

function Content() {
  const [key, setKey] = useState('Upcomming');
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
    <Container>
      <br />
      <Tabs activeKey={key} onSelect={k => setKey(k)}>
        <Tab eventKey="Upcomming" title="Upcomming">
          <br />
          <Form.Row>
            <Form.Group as={Col} controlId="formGridCity">
              <FormControl
                type="text"
                placeholder="Search"
                className="mr-sm-2"
              />
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
        </Tab>
        <Tab eventKey="Past" title="Past">
          Hello 2
        </Tab>
        <Tab eventKey="Request" title="Request">
          <br />
          <EventForm />
        </Tab>
      </Tabs>
    </Container>
  );
}

export default Content;
