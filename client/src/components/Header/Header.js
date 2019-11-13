import React from 'react';
import { useDispatch } from 'react-redux';
import { Nav, Navbar, Form, Button, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { REMOVE_USER_DATA } from '../../store/action';

function Header(props) {
  const dispatch = useDispatch();

  const onLogout = () => {
    dispatch({ type: REMOVE_USER_DATA });
    props.history.push('/student/login');
  };

  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Link className="navbar-brand" to="/student">
          College Events
        </Link>
        <Nav className="mr-auto">
          <Link className="nav-link" to="/student/event">
            Event
          </Link>
          <Link className="nav-link" to="/student/rso">
            RSO
          </Link>
        </Nav>
        <Form inline>
          <Button variant="outline-info" onClick={onLogout}>
            Logout
          </Button>
        </Form>
      </Container>
    </Navbar>
  );
}

export default Header;
