import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container } from "react-bootstrap";

import Map from "../Map/Map";

const styles = {
  mainContainer: {
    margin: "3rem 1rem"
  },
  uniInfo: {
    padding: "2rem"
  },
  uniImg: {
    height: "15rem"
  },
  uniStatCard: {
    backgroundColor: "inherit",
    textAlign: "center"
  },
  dsptContainer: {
    marginTop: "3rem",
    display: "flex",
    flexWrap: "wrap",
    fontSize: "1.2rem"
  },
  paragraph: {
    lineHeight: "30px",
    minWidth: "15rem",
    flex: 1
  },
  contactContainer: {
    margin: "0 2rem"
  },
  map: {
    width: "15rem",
    height: "15rem"
  }
};

function EventFull() {
  const [event, setEvent] = useState({});

  useEffect(() => {
    axios
      .get(
        "https://events.ucf.edu/event/1445723/downtown-5k-training-program/feed.json"
      )
      .then(result => setEvent(result.data));
  }, []);

  return (
    <Container>
      <div style={styles.mainContainer}>
        <h1>{event.title}</h1>
      </div>

      <Container>
        <div style={styles.dsptContainer}>
          <div style={styles.paragraph}>
            <span dangerouslySetInnerHTML={{ __html: event.description }} />
          </div>
          <div style={styles.contactContainer}>
            <h5>Location:</h5>
            <Map style={styles.map} />
            <br />
            <h5>Contact:</h5>
            <p>{event.contact_phone}</p>
            <p>{event.contact_email}</p>
          </div>
        </div>
      </Container>
    </Container>
  );
}

export default EventFull;
