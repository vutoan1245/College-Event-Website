import React from 'react';
import { useDispatch } from 'react-redux';
import { Nav, Navbar, Form, Button, Container } from 'react-bootstrap';

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
        <Navbar.Brand href="#home">College Events</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="#home">Events</Nav.Link>
          <Nav.Link href="#features">RSOs</Nav.Link>
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
