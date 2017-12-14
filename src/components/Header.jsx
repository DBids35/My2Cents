import React, { Component } from 'react';
import logo from '../logo.svg';

export default class Header extends Component {
  render(){
    return (
        <div className="header">
          <div className="headerLogo">
            <img src={logo} className="logo" alt="Logo"/>
          </div>
          <div className="headerTitle">
            <h1> My2Cents </h1>
          </div>
          <div className="headerUser">
            <h3>{this.props.userName}</h3>
          </div>
        </div>
      )
  }
}
