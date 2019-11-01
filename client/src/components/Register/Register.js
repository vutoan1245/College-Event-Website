import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import Form from '../commons/Form/Form';

function Register(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [rePassword, setRePassord] = useState('');
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    const onSubmit = event => {
        event.preventDefault();

        axios
            .post('/api/student/register', { username, password, firstName, lastName })
            .then(result => {
                console.log(result);
                // props.history.push('/student/login');
            })
            .catch(err => console.log('[Register.js]', err));
    };

    return (
        <Form onSubmit={onSubmit}>
            <h2>Register</h2>
            <input
                value={firstName}
                onChange={e => setFirstName(e.target.value)}
                placeholder="First Name"
            />
            <input
                value={lastName}
                onChange={e => setLastName(e.target.value)}
                placeholder="Last Name"
            />
            <input
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Email"
                type="email"
            />
            <input
                value={username}
                onChange={e => setUsername(e.target.value)}
                placeholder="Username"
            />
            <input
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Password"
                type="password"
            />
            <input
                value={rePassword}
                onChange={e => setRePassord(e.target.value)}
                placeholder="Confirm Password"
                type="password"
            />
            <button>Register</button>
            <p>
                Already have an account? <Link to="/student/login">Login</Link>
            </p>
        </Form>
    );
}

export default Register;
