import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

export default class Login extends Component {
  static propTypes = {};

  static defaultProps = {};

  static displayName = "Login";

  state = {
    username: "Username",
    password: "Password",
    valid: false,
    message: "Please Login"
  };

  handleUsername = (event) => {
    this.setState({username:event.target.value})
  }

  handlePassword = (event) => {
    this.setState({password:event.target.value})
  }

  validate = () => {
    const username=this.state.username
    const password=this.state.password
    fetch('http://my2cents.pythonanywhere.com/validate', {
      method: 'POST',
      headers: {Accept: 'application/json','Content-Type': 'application/json'},
      body: JSON.stringify({ user: username, pass: password }),
    })
    .then(result => result.json())
    .then(result => {
      console.log(result.msg);
      this.setState({valid:result.msg})
      if (this.state.valid) {
        this.setState({message:"Logging In..."})
      }
      else {
        this.setState({message:"Incorrect username or password, please try again"})
      }
    });
  }

  render(){
    if (this.state.valid) {
      return <Redirect to='/home'/>
    } else {
      return (
        <div>
          <h2>Username</h2>
            <input type="text" className="usernameBox" placeholder={this.state.username} onChange={this.handleUsername}/>
          <h2>Password</h2>
            <input type="password" className="usernameBox" placeholder={this.state.password} onChange={this.handlePassword}/>
            <button type="button" className="loginButton" onClick={this.validate}>Login</button>
          <h2>{this.state.message}</h2>
        </div>
      )
    }
  }
}
