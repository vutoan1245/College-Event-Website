import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Student from './containers/Student/Student';
import Login from './components/Login/Login';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
    <BrowserRouter forceRefresh={true}>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/student" component={Student} />
        <Route path="/" component={Student} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
