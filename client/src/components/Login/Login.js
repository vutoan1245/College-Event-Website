import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';

import Form from '../commons/Form/Form';
import { ADD_TOKEN } from '../../store/action';

const Login = props => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [hasError, setHasError] = useState(false);

  const dispatch = useDispatch();

  const onSubmit = event => {
    event.preventDefault();

    axios
      .post('/api/student/login', { username, password })
      .then(result => {
        console.log(result);
        const { token } = result.data;
        dispatch({ type: ADD_TOKEN, payload: { token } });
        props.history.push('/student');
      })
      .catch(err => {
        console.log(err);
        setHasError(true);
      });
  };

  return (
    <Form onSubmit={onSubmit}>
      <h4 className="text-uppercase text-xl-center font-weight-bold">
        REGISTER
      </h4>
      <div className="form-group">
        <label htmlFor="exampleInputEmail1">Email:</label>
        <input
          value={username}
          className="form-control"
          placeholder="Username"
          onChange={event => setUsername(event.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="exampleInputEmail1">Password:</label>
        <input
          value={password}
          className="form-control"
          type="password"
          placeholder="Password"
          onChange={event => setPassword(event.target.value)}
        />
      </div>
      <button type="submit" className="btn btn-dark mx-auto d-block">
        Submit
      </button>
      {hasError ? (
        <p className="form-error">Wrong username or password</p>
      ) : null}
    </Form>
  );
};

export default Login;
