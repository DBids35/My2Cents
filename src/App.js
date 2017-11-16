import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class UserDisplay extends Component{
  render(){
    return(
      <div className="headerUser">
        <h3> Drew </h3>
        <p> 10 </p>
      </div>
      )
  }
}
class Header extends Component {
  render(){
    return(
        <div className="header">
          <div className="headerLogo">
            <img src={logo} className="logo"/>
          </div>
          <div className="headerTitle">
            <h1> My2Cents </h1>
          </div>
          <div className="headerUser">
            <h3> Drew </h3>
            <p> 10 </p>
          </div>
        </div>
      )
  }
}

class App extends Component {

  componentDidMount() {
    
  }
  render() {
    return (
      <div className="App">
        <Header/>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}


export default App;