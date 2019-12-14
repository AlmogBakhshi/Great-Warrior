import React from 'react';
import './App.css';

import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Login from './screens/Login';
import Main from './screens/Main';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={Login} />
        <Route path='/main' component={Main} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
