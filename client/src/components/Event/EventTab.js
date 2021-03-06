import React, { useState } from 'react';
import { Tabs, Tab, Container } from 'react-bootstrap';

import EventForm from './EventForm';
import EventUpcomming from './EventUpcoming';
import EventToday from './EventToday';

function EventTab(props) {
  const [key, setKey] = useState('Upcomming');

  return (
    <Container>
      <br />
      <Tabs activeKey={key} onSelect={k => setKey(k)}>
        <Tab eventKey="Upcomming" title="Upcomming">
          <br />
          <EventUpcomming history={props.history} />
        </Tab>
        <Tab eventKey="Today" title="Today">
          <br />
          <EventToday />
        </Tab>
        <Tab eventKey="Request" title="Request">
          <br />
          <EventForm history={props.history} />
        </Tab>
      </Tabs>
    </Container>
  );
}

export default EventTab;
