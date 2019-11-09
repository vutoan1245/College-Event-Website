import React from 'react';
import { Card } from 'react-bootstrap';

function RsoPreview({ title, members, description }) {
  return (
    <Card
      text="light"
      border="secondary"
      style={{ width: '100%', height: '12rem', backgroundColor: 'black' }}
    >
      <Card.Body>
        <Card.Title style={{ color: '#3232ff' }}>
          <h4>
            <strong>{title}</strong>
          </h4>
        </Card.Title>{' '}
        <Card.Subtitle className="mb-2">{members} members</Card.Subtitle>
        <Card.Text>{description.substring(0, 200) + ' ...'}</Card.Text>
        <Card.Link href="#">Join</Card.Link>
      </Card.Body>
    </Card>
  );
}

export default RsoPreview;
