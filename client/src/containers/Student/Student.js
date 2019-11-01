import React from 'react';
import { BrowserRouter, Route, Switch, useRouteMatch } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import Header from '../../components/Header/Header';
import Login from '../../components/Login/Login';
import Register from '../../components/Register/Register';
import { REMOVE_USER_DATA } from '../../store/action';

import './Student.css';

function Student(props) {
    const dispatch = useDispatch();

    let match = useRouteMatch();

    const onLogout = () => {
        dispatch({ type: REMOVE_USER_DATA });
        props.history.push('/student/login');
    };
    return (
        <BrowserRouter>
            <div className="student_container">
                <Switch>
                    <Route path={`${match.path}/register`}>
                        <Header />
                        <Register {...props} />
                    </Route>
                    <Route path={`${match.path}/login`}>
                        <Header />
                        <Login {...props} />
                    </Route>
                    <Route path={match.path}>
                        <Header>
                            <p className="logout_btn" onClick={onLogout}>
                                Logout
                            </p>
                        </Header>
                        <h3>Hello World</h3>
                    </Route>
                </Switch>
            </div>
        </BrowserRouter>
    );
}

export default Student;
