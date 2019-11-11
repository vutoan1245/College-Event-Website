import React from 'react';
import { Form, Button, FormControl } from 'react-bootstrap';

import RsoPreview from './RsoPreview';

const fakeRsoList = [
  {
    title: 'Club of IoT',
    members: 30,
    description:
      'Internet is the most important and transformative technology ever invented. But it is mostly a product for people. Web email, eCommerce, social network, online games, sharing pictures and videos, all of these are created by people, for people and about people. The Internet of people is changing our live, and changing the world.'
  },
  {
    title: 'AI Club',
    members: 123,
    description:
      'The AI Club is a group of students (both undergraduate and graduate) that are interested in AI and seek a place to talk about it. Our goal is to form a community of interested students that share knowledge, passion, and skills. Let us know if you are interested. What do you mean by Artificial Intelligence (AI)'
  },
  {
    title: 'Photography Team',
    members: 45,
    description:
      'Photographers capture images of people, places, events and objects. They are often responsible for editing their photos to fit the needs of the client they are serving. Photographers may work for an organization, own their own businesses or work by contract as freelancers.'
  }
];

const styles = {
  formGroup: { display: 'flex' }
};

function RsoOpen() {
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
          <Button>Join</Button>
        </RsoPreview>
      ))}
    </>
  );
}

export default RsoOpen;
