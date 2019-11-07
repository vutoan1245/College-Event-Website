import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Button, FormGroup, FormControl } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Register(props) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [university, setUniversity] = useState();
  const [password, setPassword] = useState('');
  const [rePassword, setRePassord] = useState('');

  const [universityList, setUniversityList] = useState([]);

  use;

  const [universityList, setUniversityList] = useState([]);

  useEffect(() => {
    axios
      .get('/api/university/names')
      .then(result => setUniversityList(result.data))
      .catch(err => console.error(err));
  }, []);

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

  const handleSubmit = event => {
    event.preventDefault();

    console.log(university);
    if (!validate()) {
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
    <div className="Login">
      <Form onSubmit={handleSubmit}>
        <h2>Register</h2>
        <FormGroup bsSize="large">
          <FormControl
            value={firstName}
            onChange={e => setFirstName(e.target.value)}
            placeholder="First Name"
          />
        </FormGroup>
        <FormGroup bsSize="large">
          <FormControl
            value={lastName}
            onChange={e => setLastName(e.target.value)}
            placeholder="Last Name"
          />
        </FormGroup>
        <FormGroup controlId="email" bsSize="large">
          <FormControl
            autoFocus
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Email"
          />
        </FormGroup>
        <FormGroup bsSize="large">
          <select
            value={university}
            defaultValue="DEFAULT"
            className="form-control"
            onChange={event => setUniversity(event.target.value)}
          >
            <option value="DEFAULT" disabled>
              -- select an university --
            </option>

            <option value="Hello 1">Test 1</option>
            <option value="Test 2">Test 2</option>
          </select>
        </FormGroup>
        <FormGroup bsSize="large">
          <FormControl
            value={password}
            onChange={e => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
          />
        </FormGroup>
        <FormGroup bsSize="large">
          <FormControl
            value={rePassword}
            onChange={e => setRePassord(e.target.value)}
            type="password"
            placeholder="Confirm Password"
          />
        </FormGroup>
        <Button block bsSize="large" type="submit">
          Login
        </Button>
        <Form.Label>
          Aldready have an account? <Link to="/student/login">Login</Link>
        </Form.Label>
      </Form>
    </div>
  );
}

export default Register;
