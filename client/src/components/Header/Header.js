import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Nav, Navbar, Form, Button, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { REMOVE_USER_DATA } from '../../store/action';

function Header(props) {
  const userData = useSelector(state => state.userData);
  const dispatch = useDispatch();

  const onLogout = event => {
    event.preventDefault();
    dispatch({ type: REMOVE_USER_DATA });
    props.history.push('/login');
  };

  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Link
          className="navbar-brand"
          to={userData.access === 'super admin' ? '/student/event' : '/student'}
        >
          College Events
        </Link>
        <Nav className="mr-auto">
          <Link className="nav-link" to="/student/event">
            Event
          </Link>

          {userData.access !== 'super admin' ? (
            <Link className="nav-link" to="/student/rso">
              RSO
            </Link>
          ) : null}

          {userData.access === 'super admin' ? (
            <Link className="nav-link" to="/student/university">
              University
            </Link>
          ) : null}
        </Nav>
        <Form inline>
          <Button variant="outline-info" onClick={e => onLogout(e)}>
            Logout
          </Button>
        </Form>
      </Container>
    </Navbar>
  );
}

export default Header;
