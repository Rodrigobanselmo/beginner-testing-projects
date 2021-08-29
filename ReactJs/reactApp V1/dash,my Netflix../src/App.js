import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Home, SignIn, Application } from './pages';

export function App() {

  return (
    <Router>
      <Switch>
        <Route path='/app' component={Application} exact />
        <Route path='/home' component={Home} exact />
        <Route path='/signin' component={SignIn} exact />
      </Switch>
    </Router>
  );
}