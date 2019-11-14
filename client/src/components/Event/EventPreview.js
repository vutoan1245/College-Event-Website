import React, { useState } from 'react';
import StarRatings from 'react-star-ratings';
import { Card } from 'react-bootstrap';

const styles = {
  card: {
    width: '100%',
    backgroundColor: 'black',
    fontSize: '1.5rem',
    display: 'relative',
    '&:hover': {
      background: '#efefef'
    }
  },
  subtitle: {
    fontSize: '1.1rem',
    paddingTop: '0.4rem'
  },
  eventType: {
    position: 'absolute',
    right: '1rem',
    top: '1rem',
    fontSize: '1rem'
  },
  description: {
    margin: '0.6rem 0',
    fontSize: '1.3rem'
  }
};

function Event({ title, date, description, internal, type, onClick }) {
  const { fadeStyle, ...fadeProps } = useFade();

  return (
    <Card
      text="light"
      border="secondary"
      // style={styles.card}
      style={{ ...fadeStyle, ...styles.card }}
      {...fadeProps}
      onClick={onClick}
    >
      <Card.Body>
        <Card.Title style={{ color: '#6a6aff' }}>
          <h4>
            <strong>{title}</strong>
          </h4>
        </Card.Title>
        <Card.Subtitle className="mb-2 text-muted" style={styles.subtitle}>
          {new Date(date).toUTCString()}
        </Card.Subtitle>
        <p className="mb-2 text-muted" style={styles.eventType}>
          {type}
        </p>
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
            dangerouslySetInnerHTML={{
              __html: description.substring(0, 250) + '...'
            }}
          />
        )}
      </Card.Body>
    </Card>
  );
}

const useFade = () => {
  const [fade, setFade] = useState(false);

  const onMouseEnter = () => {
    setFade(true);
  };

  const onMouseLeave = () => {
    setFade(false);
  };

  const fadeStyle = !fade
    ? {
        opacity: 1,
        transition: 'all .2s ease-in-out'
      }
    : {
        opacity: 0.8,
        transition: 'all .2s ease-in-out',
        cursor: 'pointer'
      };

  return { fadeStyle, onMouseEnter, onMouseLeave };
};

export default Event;
