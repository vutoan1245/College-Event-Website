import React, { useState, useEffect } from 'react';
import StarRatings from 'react-star-ratings';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Container } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

import Map from '../Map/Map';

const styles = {
  title: {
    marginTop: '3rem'
  },
  date: {
    margin: '0 1rem'
  },
  uniInfo: {
    padding: '2rem'
  },
  uniImg: {
    height: '15rem'
  },
  uniStatCard: {
    backgroundColor: 'inherit',
    textAlign: 'center'
  },
  dsptContainer: {
    marginTop: '3rem',
    display: 'flex',
    flexWrap: 'wrap',
    fontSize: '1.2rem'
  },
  paragraph: {
    lineHeight: '30px',
    minWidth: '15rem',
    flex: 1
  },
  contactContainer: {
    margin: '0 2rem'
  },
  map: {
    width: '15rem',
    height: '15rem'
  }
};

function EventFull() {
  const [event, setEvent] = useState({});

  const token = useSelector(state => state.token);
  const { eid } = useParams();

  useEffect(() => {
    axios
      .get(`/api/event/${eid}`, {
        headers: {
          Authorization: token
        }
      })
      .then(result => setEvent(result.data))
      .catch(err => console.log(err));
  }, [eid, token]);

  return (
    <Container>
      <Container>
        <h1 style={styles.title}>{event.name}</h1>
        <h4 className="mb-2 text-muted">
          {new Date(event.time).toUTCString()}
        </h4>
        <StarRatings
          rating={5}
          starRatedColor="#5c5c5c"
          starDimension="1rem"
          starSpacing="0.1rem"
          numberOfStars={5}
          name="rating"
        />
        <div style={styles.dsptContainer}>
          <div style={styles.paragraph}>
            <span
              style={{ whiteSpace: 'pre-line' }}
              dangerouslySetInnerHTML={{ __html: event.description }}
            />
          </div>
          <div style={styles.contactContainer}>
            <h5>Location:</h5>
            <Map style={styles.map} />
            <br />
            <h5>Contact:</h5>
            <p>{event.phone}</p>
            <p>{event.email}</p>
          </div>
        </div>
      </Container>
    </Container>
  );
}

export default EventFull;
