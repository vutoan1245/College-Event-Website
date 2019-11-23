import React from 'react';
import { Card } from 'react-bootstrap';

const styles = {
  card: {
    width: '100%',
    backgroundColor: 'black'
  },
  title: {
    color: '#6a6aff'
  },
  eventType: {
    position: 'absolute',
    right: '1rem',
    top: '1rem',
    fontSize: '1rem'
  }
};

function RsoPreview({ title, members, description, children, status, rso }) {
  return (
    <Card text="light" border="secondary" style={styles.card}>
      <Card.Body>
        <Card.Title style={styles.title}>
          <h4>
            <strong>{title}</strong>
          </h4>
        </Card.Title>
        <p className="mb-2 text-muted" style={styles.eventType}>
          {status}
        </p>
        <Card.Text>{description.substring(0, 300) + ' ...'}</Card.Text>
        {children}
      </Card.Body>
    </Card>
  );
}

export default RsoPreview;
