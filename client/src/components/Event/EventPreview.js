import React from 'react';
import { Card } from 'react-bootstrap';

function Event({ title, date, description }) {
  // return (
  //   <div>
  //     <br />
  //     <div dangerouslySetInnerHTML={{ __html: description }} />
  //   </div>
  // );

  return (
    <Card
      text="light"
      border="secondary"
      style={{ width: '100%', height: '13rem', backgroundColor: 'black' }}
    >
      <Card.Body>
        <Card.Title style={{ color: '#3232ff' }}>
          <h4>
            <strong>{title}</strong>
          </h4>
        </Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{date}</Card.Subtitle>
        <div
          dangerouslySetInnerHTML={{ __html: description.substring(0, 250) }}
        />
      </Card.Body>
    </Card>
  );
}

export default Event;
