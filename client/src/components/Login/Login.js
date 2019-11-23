import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Button, FormGroup, FormControl } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { ADD_TOKEN, ADD_USER_DATA } from '../../store/action';

import './Login.css';

const Login = props => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState('');

  const dispatch = useDispatch();

  useEffect(() => {
    setError('');
  }, [username, password]);

  const handleSubmit = event => {
    event.preventDefault();

    if (!username || !password) {
      setError('Please enter all fields');
      return;
    }

    axios
      .post('/api/user/login', { username, password })
      .then(result => {
        const { token } = result.data;
        console.log(token);
        dispatch({ type: ADD_TOKEN, payload: { token } });

        return Promise.all([
          axios.get('/api/user/current', {
            headers: {
              Authorization: token
            }
          }),
          axios.get('/api/super-admin/university/names')
        ]);
      })
      .then(result => {
        const userData = result[0].data;
        const universityList = result[1].data;
        dispatch({
          type: ADD_USER_DATA,
          payload: { userData, universityList }
        });

        if (userData.access === 'super admin') {
          props.history.push('/student/event');
        } else {
          props.history.push('/student');
        }
      })
      .catch(() => {
        setError('Wrong username or password');
      });
  };

  return (
    <div className="form-container">
      <Form onSubmit={handleSubmit} autoComplete="off">
        <h2>Login</h2>
        <FormGroup controlId="email">
          <FormControl
            autoFocus
            value={username}
            onChange={e => setUsername(e.target.value)}
            placeholder="Email"
          />
        </FormGroup>
        <FormGroup controlId="password">
          <FormControl
            value={password}
            onChange={e => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
          />
        </FormGroup>
        <Button block type="submit">
          Login
        </Button>
        <Form.Label>
          Don't have an account? <Link to="/student/register">Register</Link>
        </Form.Label>
        {error ? <p className="form-error">{error}</p> : null}
      </Form>
    </div>
  );
};

export default Login;
