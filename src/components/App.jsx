import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

import '../styles/app.css';

import Login from './Login';
import Home from './Home';
import PrivateRoute from './PrivateRoute'

class App extends Component{
 
  state={loggedIn:false}
  
  handleLogin= () => {
    this.setState({loggedIn:true})
  }
  render(){
    return(
      <Router>
        <Switch>
          <Route exact path='/' render={() => <Login onLogin={this.handleLogin} loggedIn={this.state.loggedIn}/>} />
          <PrivateRoute loggedIn={this.state.loggedIn} path='/home' component={Home} />
        </Switch>
      </Router>
      )
  }
}

export default App;
