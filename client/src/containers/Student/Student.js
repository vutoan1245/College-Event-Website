import React from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { ADD_USER_DATA } from '../../store/action';

import Header from '../../components/Header/Header';
import Login from '../../components/Login/Login';
import Register from '../../components/Register/Register';
import EventTab from '../../components/Event/EventTab';
import RsoTab from '../../components/Rso/RsoTab';
import University from '../../components/University/University';
import EventFull from '../../components/Event/EventFull';
import UniversityTab from '../../components/University/UniversityTab';

function Student(props) {
  const dispatch = useDispatch();
  const token = useSelector(state => state.token);
  const userData = useSelector(state => state.userData);

  const pathname = props.location;
  if (!token && pathname === '/student/register') {
    return <Redirect to="/login" />;
  }

  if (token && (pathname !== '/login' || pathname !== '/student/register')) {
    axios
      .get('/api/user/current', {
        headers: {
          Authorization: token
        }
      })
      .then(result => {
        dispatch({
          type: ADD_USER_DATA,
          payload: { userData: result.data }
        });
      })
      .catch(() => {
        return <Redirect to="/login" />;
      });
  }

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/student/register" exact>
          <Register history={props.history} endpoint="/api/student/register" />
        </Route>

        <Route path="/super-admin/register" exact>
          <Register
            history={props.history}
            endpoint="/api/super-admin/register"
            admin
          />
        </Route>

        <Route path="/login" exact>
          <Login history={props.history} />
        </Route>

        <Route path="/event" exact>
          <Header history={props.history} />
          <EventTab history={props.history} />
        </Route>

        <Route path="/event/:eid" exact>
          <Header history={props.history} />
          <EventFull history={props.history} />
        </Route>

        <Route path="/rso">
          <Header history={props.history} />
          <RsoTab history={props.history} />
        </Route>

        <Route path="/university/:uid">
          <Header history={props.history} />
          <University />
        </Route>

        <Route path="/university">
          <Header history={props.history} />
          <UniversityTab history={props.history} />
        </Route>

        <Route path="/">
          <Header history={props.history} />
          <University uid={userData.uid} />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default Student;
