import React from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import Header from '../../components/Header/Header';
import Login from '../../components/Login/Login';
import Register from '../../components/Register/Register';
import EventTab from '../../components/Event/EventTab';
import RsoTab from '../../components/Rso/RsoTab';
import University from '../../components/University/University';
import EventFull from '../../components/Event/EventFull';

function Student(props) {
  const uid = useSelector(state => state.userData.uid);
  const token = useSelector(state => state.token);

  if (!token && props.location.pathname !== '/student/login') {
    return <Redirect to="/student/login" />;
  }

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/student/register" exact>
          <Register history={props.history} />
        </Route>

        <Route path="/student/login" exact>
          <Login history={props.history} />
        </Route>

        <Route path="/student/event" exact>
          <Header history={props.history} />
          <EventTab history={props.history} />
        </Route>

        <Route path="/student/event/:eid" exact>
          <Header history={props.history} />
          <EventFull history={props.history} />
        </Route>

        <Route path="/student/rso">
          <Header history={props.history} />
          <RsoTab history={props.history} />
        </Route>

        <Route path="/student">
          <Header history={props.history} />
          <University uid={uid} />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default Student;
