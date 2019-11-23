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
import UniversityTab from '../../components/University/UniversityTab';

function Student(props) {
  const token = useSelector(state => state.token);
  const userData = useSelector(state => state.userData);

  if (!token && props.location.pathname !== '/student/login') {
    return <Redirect to="/student/login" />;
  }

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/student/register" exact>
          <Register
            history={props.history}
            endpoint="/api/student/register"
            admin
          />
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

        <Route path="/student/university/:uid">
          <Header history={props.history} />
          <University />
        </Route>

        <Route path="/student/university">
          <Header history={props.history} />
          <UniversityTab history={props.history} />
        </Route>

        <Route path="/student">
          <Header history={props.history} />
          <University uid={userData.uid} />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default Student;
