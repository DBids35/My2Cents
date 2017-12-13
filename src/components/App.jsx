import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

import '../styles/app.css';

import Login from './Login';
import Home from './Home';

class App extends Component{
  render(){
    return(
      <Router>
        <Switch>
          <Route exact path='/' component={Login} />
          <Route path='/home' component={Home} />
        </Switch>
      </Router>
      )
  }
}

export default App;
