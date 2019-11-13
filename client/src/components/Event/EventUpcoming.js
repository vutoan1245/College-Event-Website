import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { Form, Col, FormControl } from "react-bootstrap";

import EventReview from "./EventPreview";

function EventUpcomming() {
  const [eventList, setEventList] = useState([]);

  const universityList = useSelector(state => state.universityList);

  useEffect(() => {
    axios
      .get("https://events.ucf.edu/upcoming/feed.json")
      .then(result => {
        setEventList(result.data);
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <>
      <Form.Row>
        <Form.Group as={Col} controlId="formGridCity">
          <FormControl type="text" placeholder="Search" className="mr-sm-2" />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridUniversity">
          <Form.Control as="select">
            <option> -- Select an university -- </option>
            {universityList.map((uni, index) => (
              <option key={index}>{uni}</option>
            ))}
          </Form.Control>
        </Form.Group>

        <Form.Group as={Col} controlId="formGridRso">
          <Form.Control as="select">
            <option> -- Select event type -- </option>
            <option>Public</option>
            <option>Private</option>
            <option>RSO</option>
          </Form.Control>
        </Form.Group>
      </Form.Row>

      {eventList.map((event, index) => (
        <EventReview
          key={index}
          title={event.title}
          date={event.starts}
          description={event.description}
        />
      ))}
    </>
  );
}

export default EventUpcomming;
