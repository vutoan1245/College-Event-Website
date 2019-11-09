import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Tabs, Tab, Container, Form, FormControl, Col } from 'react-bootstrap';

import EventReview from './EventPreview';
import EventForm from './EventForm';

const fakeEents = [
  {
    title: 'Fake Title 1',
    starts: new Date().toDateString(),
    internal: true,
    description:
      'Two before narrow not relied how except moment myself. Dejection assurance mrs led certainly. So gate at no only none open. Betrayed at properly it of graceful on. Dinner abroad am depart ye turned hearts as me wished. Therefore allowance too perfectly gentleman supposing man his now. Families goodness all eat out bed steepest servants. Explained the incommode sir improving northward immediate eat. Man denoting received you sex possible you. Shew park own loud son door less yet.'
  },
  {
    title: 'Fake Title 2',
    starts: new Date().toDateString(),
    internal: true,
    description:
      'Received shutters expenses ye he pleasant. Drift as blind above at up. No up simple county stairs do should praise as. Drawings sir gay together landlord had law smallest. Formerly welcomed attended declared met say unlocked. Jennings outlived no dwelling denoting in peculiar as he believed. Behaviour excellent middleton be as it curiosity departure ourselves.'
  },
  {
    title: 'Fake Title 3s',
    starts: new Date().toDateString(),
    internal: true,
    description:
      'Received shutters expenses ye he pleasant. Drift as blind above at up. No up simple county stairs do should praise as. Drawings sir gay together landlord had law smallest. Formerly welcomed attended declared met say unlocked. Jennings outlived no dwelling denoting in peculiar as he believed. Behaviour excellent middleton be as it curiosity departure ourselves.'
  }
];

function Content() {
  const [key, setKey] = useState('Upcomming');
  const [eventList, setEventList] = useState(fakeEents);

  const [universityList, setUniversityList] = useState([]);

  useEffect(() => {
    axios
      .get('/api/university/names')
      .then(result => setUniversityList(result.data))
      .catch(err => console.error(err));
  }, []);

  // useEffect(() => {
  //   axios
  //     .get('https://events.ucf.edu/feed.json')
  //     .then(result => {
  //       setEventList([...fakeEents, ...result.data]);
  //     })
  //     .catch(err => console.error(err));
  // }, []);

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
