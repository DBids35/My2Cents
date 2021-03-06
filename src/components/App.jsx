import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

import '../styles/app.css';

import Login from './Login';
import Home from './Home';
import PrivateRoute from './PrivateRoute'
import Results from './Results'
import Create from './Create'
class App extends Component{
  constructor(props){
    super(props)
    this.state={user:null, loggedIn:false}
    this.handleLogin = this.handleLogin.bind(this)
  }
  
  
  handleLogin(user) {
    // setter
    sessionStorage.setItem('loggedIn', true);
    sessionStorage.setItem('user', user)
    this.setState({user})
    this.setState({loggedIn:true})
    


  }
  render(){
    return(
      <Router>
        <Switch>
          <Route exact path='/' render={() => <Login onLogin={this.handleLogin} loggedIn={this.state.loggedIn}/>} />
          <PrivateRoute path='/home' component={()=> <Home user={sessionStorage.getItem('user')}/>} />
          <PrivateRoute path='/results' component={()=> <Results user={sessionStorage.getItem('user')}/>} />
          <PrivateRoute path='/create' component={()=> <Create user={sessionStorage.getItem('user')}/>} />
        </Switch>
      </Router>
      )
  }
}

export default App;
