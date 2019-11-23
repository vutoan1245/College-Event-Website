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

  const [error, setError] = useState('');

  useEffect(() => {
    setError('');
  }, [firstName, lastName, email, university, password, rePassword]);

  useEffect(() => {
    axios
      .get('/api/super-admin/university/names')
      .then(result => setUniversityList(result.data))
      .catch(err => console.error(err));
  }, []);

  const validate = () => {
    if (password !== rePassword) {
      setError('Password is not match');
      return false;
    }
    if (!firstName || !lastName || !email || !university || !password) {
      setError('Please enter all fields');
      return false;
    }

    setError('');
    return true;
  };

  const handleSubmit = event => {
    event.preventDefault();

    if (!validate()) {
      return;
    }

    axios
      .post('/api/student/register', {
        username: email,
        password,
        first_name: firstName,
        last_name: lastName,
        email,
        university,
        phone: 'mock_phone'
      })
      .then(() => {
        props.history.push('/login');
      })
      .catch(err => console.error('[Register.js]', err));
  };

  return (
    <div className="form-container">
      <Form onSubmit={handleSubmit}>
        <h2>Register</h2>
        <FormGroup>
          <FormControl
            autoFocus
            value={firstName}
            onChange={e => setFirstName(e.target.value)}
            placeholder="First Name"
          />
        </FormGroup>
        <FormGroup>
          <FormControl
            value={lastName}
            onChange={e => setLastName(e.target.value)}
            placeholder="Last Name"
          />
        </FormGroup>
        <FormGroup>
          <FormControl
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Email"
          />
        </FormGroup>
        <FormGroup>
          <Form.Control
            as="select"
            defaultValue="DEFAULT"
            value={university}
            onChange={event => setUniversity(event.target.value)}
          >
            <option value="DEFAULT" disabled>
              -- select an university --
            </option>
            {universityList.map((uni, index) => (
              <option key={index}>{uni}</option>
            ))}
          </Form.Control>
        </FormGroup>
        <FormGroup>
          <FormControl
            value={password}
            onChange={e => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
          />
        </FormGroup>
        <FormGroup>
          <FormControl
            value={rePassword}
            onChange={e => setRePassord(e.target.value)}
            type="password"
            placeholder="Confirm Password"
          />
        </FormGroup>

        <Button block type="submit">
          Register
        </Button>

        <p className="form-label">
          Aldready have an account? <Link to="/student/login">Login</Link>
        </p>

        {error ? <p className="form-error">{error}</p> : null}
      </Form>
    </div>
  );
}

export default Register;
