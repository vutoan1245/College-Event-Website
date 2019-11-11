import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Header from '../../components/Header/Header';
import Login from '../../components/Login/Login';
import Register from '../../components/Register/Register';
import EventTab from '../../components/Event/EventTab';
import RsoTab from '../../components/Rso/RsoTab';
import University from '../../components/University/University';

function Student(props) {
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

        <Route path="/student/rso">
          <Header history={props.history} />
          <RsoTab />
        </Route>

        <Route path="/student">
          <Header history={props.history} />
          <University />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default Student;
