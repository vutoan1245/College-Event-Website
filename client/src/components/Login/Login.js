import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, FormGroup, FormControl } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { ADD_TOKEN } from '../../store/action';

import './Login.css';

const Login = props => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  const handleSubmit = event => {
    event.preventDefault();

    axios
      .post('/api/student/login', { username, password })
      .then(result => {
        const { token } = result.data;
        dispatch({ type: ADD_TOKEN, payload: { token } });
        props.history.push('/student');
      })
      .catch(err => {
        console.error(err);
      });
  };

  return (
    <div className="Login">
      <Form onSubmit={handleSubmit}>
        <h2>Login</h2>
        <FormGroup controlId="email" bsSize="large">
          <FormControl
            autoFocus
            type="email"
            value={username}
            onChange={e => setUsername(e.target.value)}
            placeholder="Email"
          />
        </FormGroup>
        <FormGroup controlId="password" bsSize="large">
          <FormControl
            value={password}
            onChange={e => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
          />
        </FormGroup>
        <Button block bsSize="large" type="submit">
          Login
        </Button>
        <Form.Label>
          Don't have an account? <Link to="/student/register">Register</Link>
        </Form.Label>
      </Form>
    </div>
  );
};

export default Login;
