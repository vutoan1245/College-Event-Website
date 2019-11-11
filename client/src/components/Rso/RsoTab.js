import React, { useState } from 'react';
import { Tabs, Tab, Container } from 'react-bootstrap';

import RsoForm from './RsoForm';
import RsoOpen from './RsoOpen';
import RsoMy from './RsoMy';

function RsoTabs() {
  const [key, setKey] = useState('Open');

  return (
    <Container>
      <br />
      <Tabs activeKey={key} onSelect={k => setKey(k)}>
        <Tab eventKey="Open" title="Open">
          <br />
          <RsoOpen />
        </Tab>

        <Tab eventKey="My RSOs" title="My RSOs">
          <br />
          <RsoMy />
        </Tab>

        <Tab eventKey="New" title="New">
          <br />
          <RsoForm />
        </Tab>
      </Tabs>
    </Container>
  );
}

export default RsoTabs;
