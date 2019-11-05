import React, { useState } from 'react';
import axios from 'axios';

import Form from '../commons/Form/Form';

function Register(props) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [university, setUniversity] = useState();
  const [password, setPassword] = useState('');
  const [rePassword, setRePassord] = useState('');

  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState();

  const validate = () => {
    return (
      firstName &&
      lastName &&
      email &&
      university &&
      password &&
      password === rePassword
    );
  };

  const onSubmit = event => {
    event.preventDefault();

    console.log(university);
    if (!validate()) {
      setHasError(true);
      setErrorMessage('Please enter all fields');
      return;
    }
    axios
      .post('/api/student/register', {
        username: email,
        password,
        firstName,
        lastName
      })
      .then(() => {
        props.history.push('/student/login');
      })
      .catch(err => console.error('[Register.js]', err));
  };

  return (
    <Form onSubmit={onSubmit}>
      <h4 className="text-uppercase text-xl-center font-weight-bold">
        REGISTER
      </h4>
      <div className="form-group">
        <label>First name:</label>
        <input
          value={firstName}
          className="form-control"
          placeholder="Enter first name"
          onChange={event => setFirstName(event.target.value)}
        />
      </div>
      <div className="form-group">
        <label>Last name:</label>
        <input
          value={lastName}
          className="form-control"
          placeholder="Enter last name"
          onChange={event => setLastName(event.target.value)}
        />
      </div>
      <div className="form-group">
        <label>Email address:</label>
        <input
          value={email}
          type="email"
          className="form-control"
          placeholder="Enter email"
          onChange={event => setEmail(event.target.value)}
        />
      </div>
      <div className="form-group">
        <label>University:</label>
        <select
          value={university}
          defaultValue="DEFAULT"
          className="form-control"
          onChange={event => setUniversity(event.target.value)}
        >
          <option value="DEFAULT" disabled>
            -- select an option --
          </option>

          <option value="Hello 1">Test 1</option>
          <option value="Test 2">Test 2</option>
        </select>
      </div>

      <div className="form-group">
        <label>Password:</label>
        <input
          value={password}
          type="password"
          className="form-control"
          placeholder="Password"
          onChange={event => setPassword(event.target.value)}
        />
      </div>
      <div className="form-group">
        <label>Confirm password:</label>
        <input
          value={rePassword}
          type="password"
          className="form-control"
          placeholder="Confirm password"
          onChange={event => setRePassord(event.target.value)}
        />
      </div>
      <button type="submit" className="btn btn-dark mx-auto d-block">
        Submit
      </button>
      {hasError ? <p className="form-error">{errorMessage}</p> : null}
    </Form>
  );
}

export default Register;
