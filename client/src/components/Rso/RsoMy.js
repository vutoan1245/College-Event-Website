import React from 'react';
import { Form, Button, FormControl } from 'react-bootstrap';

import RsoPreview from './RsoPreview';

const fakeRsoList = [
  {
    title: 'Security Team',
    members: 200,
    description:
      'With the advent of digital technology, there has been an incredible rise in demand for IT security professionals globally. Organizations have recognized the importance of cyber-security and are ready to invest in resources that can deal with cyber threats. This ensures the overall security of internal systems and critical internal data protection. '
  }
];

const styles = {
  formGroup: { display: 'flex' }
};

function RsoMy() {
  return (
    <>
      <Form.Group style={styles.formGroup}>
        <FormControl type="text" placeholder="Search" className="mr-sm-2" />
        <Button variant="outline-success">Search</Button>
      </Form.Group>
      {fakeRsoList.map((rso, index) => (
        <RsoPreview
          key={index}
          title={rso.title}
          members={rso.members}
          description={rso.description}
        >
          <Button variant="secondary">Success</Button>
        </RsoPreview>
      ))}
    </>
  );
}

export default RsoMy;
