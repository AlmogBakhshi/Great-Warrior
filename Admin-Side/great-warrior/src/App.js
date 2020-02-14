import React from 'react';
import './App.css';

import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Login from './screens/Login';
import Main from './screens/Main';

function App() {
  return (
    <BrowserRouter basename='/site04/build'>
      <Switch>
        <Route path='/main' component={Main} />
        <Route path='/' component={Login} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
