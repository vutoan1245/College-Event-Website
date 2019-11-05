import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Student from './containers/Student/Student';

import './App.css';

function App() {
    return (
        <BrowserRouter forceRefresh={true}>
            <Switch>
                <Route path="/student" component={Student} />
            </Switch>
        </BrowserRouter>
    );
}

export default App;
