import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Header from '../../components/Header/Header';
import Login from '../../components/Login/Login';
import Register from '../../components/Register/Register';
import EventContent from '../../components/EventTab/EventTab';

function Student(props) {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/student/register" exact>
          <Register />
        </Route>

        <Route path="/student/login" exact>
          <Login />
        </Route>

        <Route path="/student">
          <Header history={props.history} />
          <EventContent />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default Student;
