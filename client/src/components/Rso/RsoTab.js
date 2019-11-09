import React, { useState } from 'react';
import {
  Tabs,
  Tab,
  Container,
  Form,
  FormControl,
  Col,
  Button
} from 'react-bootstrap';

import RsoPreview from './RsoPreview';
import RsoForm from './RsoForm';

const fakeRsoList = [
  {
    title: 'Club of IoT',
    members: 30,
    description:
      'Two before narrow not relied how except moment myself. Dejection assurance mrs led certainly. So gate at no only none open. Betrayed at properly it of graceful on. Dinner abroad am depart ye turned hearts as me wished. Therefore allowance too perfectly gentleman supposing man his now. Families goodness all eat out bed steepest servants. Explained the incommode sir improving northward immediate eat. Man denoting received you sex possible you. Shew park own loud son door less yet.'
  },
  {
    title: 'Defensive System',
    members: 30,
    description: 'Some description here'
  },
  {
    title: 'AI Club',
    members: 200,
    description: 'Yohooohooo yohoooo'
  },
  {
    title: 'AI Club',
    members: 200,
    description: 'Haking'
  },
  {
    title: 'Security Team',
    members: 200,
    description: 'Hell The World'
  }
];

function RsoTabs() {
  const [key, setKey] = useState('Open');

  return (
    <Container>
      <br />
      <Tabs activeKey={key} onSelect={k => setKey(k)}>
        <Tab eventKey="Open" title="Open">
          <br />
          <Form.Row>
            <Form.Group as={Col}>
              <FormControl
                type="text"
                placeholder="Search"
                className="mr-sm-2"
              />
              {/* <Button variant="outline-success">Search</Button> */}
            </Form.Group>

            <Form.Group as={Col} controlId="formGridState">
              <Button variant="outline-success">Search</Button>
            </Form.Group>
          </Form.Row>
          <br />

          {fakeRsoList.map((rso, index) => (
            <RsoPreview
              key={index}
              title={rso.title}
              members={rso.members}
              description={rso.description}
            />
          ))}
        </Tab>
        <Tab eventKey="My RSOs" title="My RSOs">
          Hello 2
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
