import React from 'react';
import { Card } from 'react-bootstrap';

const styles = {
  card: {
    width: '100%',
    backgroundColor: 'black'
  },
  title: {
    color: '#6a6aff'
  }
};

function RsoPreview({ title, members, description }) {
  return (
    <Card text="light" border="secondary" style={styles.card}>
      <Card.Body>
        <Card.Title style={styles.title}>
          <h4>
            <strong>{title}</strong>
          </h4>
        </Card.Title>
        <Card.Subtitle className="mb-2">{members} members</Card.Subtitle>
        <Card.Text>{description.substring(0, 300) + ' ...'}</Card.Text>
        <Card.Link href="#">Join</Card.Link>
      </Card.Body>
    </Card>
  );
}

export default RsoPreview;
