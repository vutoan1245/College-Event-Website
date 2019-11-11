import React from 'react';
import StarRatings from 'react-star-ratings';
import { Card } from 'react-bootstrap';

const styles = {
  card: {
    width: '100%',
    backgroundColor: 'black'
  },
  description: { margin: '0.6rem 0' }
};

function Event({ title, date, description, internal }) {
  return (
    <Card text="light" border="secondary" style={styles.card}>
      <Card.Body>
        <Card.Title style={{ color: '#6a6aff' }}>
          <h4>
            <strong>{title}</strong>
          </h4>
        </Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{date}</Card.Subtitle>
        <StarRatings
          rating={Math.random(2) + 4}
          starRatedColor="#5c5c5c"
          starDimension="1rem"
          starSpacing="0.1rem"
          numberOfStars={5}
          name="rating"
        />
        {internal ? (
          <p>{description}</p>
        ) : (
          <div
            style={styles.description}
            dangerouslySetInnerHTML={{ __html: description.substring(0, 250) }}
          />
        )}
      </Card.Body>
    </Card>
  );
}

export default Event;
