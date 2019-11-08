import React from 'react';
import { Card } from 'react-bootstrap';

function Event({ title, description }) {
  return (
    <Card bg="dark" text="light" border="secondary" style={{ width: '100%' }}>
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>
        <Card.Text>{description}</Card.Text>
      </Card.Body>
    </Card>
  );
}

export default Event;
