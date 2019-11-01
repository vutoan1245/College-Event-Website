import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import Form from '../commons/Form/Form';
import { ADD_TOKEN } from '../../store/action';

const Login = props => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();

    const onSubmit = event => {
        event.preventDefault();

        axios
            .post('/api/student/login', { username, password })
            .then(result => {
                const { token } = result.data;
                dispatch({ type: ADD_TOKEN, payload: { token } });
                props.history.push('/student');
            })
            .catch(err => console.log('[Login.js]', err));
    };

    return (
        <Form onSubmit={onSubmit}>
            <h2>Login</h2>
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
            <button>Login</button>
            <p>
                Don't have an account? <Link to="/student/register">Regsiter</Link>
            </p>
        </Form>
    );
};

export default Login;
