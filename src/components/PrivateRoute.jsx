import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

export default class PrivateRoute extends Component{
  static propTypes = {};

  static defaultProps = {};

  static displayName = "PrivateRoute";
  render(){
   if (this.props.loggedIn){
    return <Route path={this.props.path} render={this.props.component} />
   }
   else{
    return <Redirect to='/'/>
   }
}
}