import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Form, Col, FormControl } from 'react-bootstrap';

import EventReview from './EventPreview';

function EventUpcomming(props) {
  const [eventList, setEventList] = useState([]);
  const [filter, setFilter] = useState('');

  const token = useSelector(state => state.token);
  const universityList = useSelector(state => state.universityList);

  useEffect(() => {
    axios
      .get('/api/event/all', {
        headers: {
          Authorization: token
        }
      })
      .then(result => setEventList(result.data))
      .catch(err => console.log(err));
  }, [token]);

  const onClickEvent = eid => {
    props.history.push('/student/event/' + eid);
  };

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
          <Form.Control
            as="select"
            value={filter}
            onChange={e => setFilter(e.target.value)}
          >
            <option value=""> -- Select event type -- </option>
            <option>Public</option>
            <option>Private</option>
            <option>RSO</option>
          </Form.Control>
        </Form.Group>
      </Form.Row>

      {eventList
        .filter(event => event.type === filter || !filter)
        .map((event, index) => (
          <EventReview
            key={index}
            title={event.name}
            date={event.time}
            description={event.description}
            type={event.type}
            onClick={() => onClickEvent(event.eid)}
          />
        ))}
    </>
  );
}

export default EventUpcomming;
