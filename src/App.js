import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class UserDisplay extends Component{
  render(){
    return(
      <div className="headerUser">
        <h3> {this.props.name} </h3>
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
            <img src={logo} className="logo" alt="Logo"/>
          </div>
          <div className="headerTitle">
            <h1> My2Cents </h1>
          </div>
          <UserDisplay name={this.props.userName}/>
        </div>
      )
  }
}

class PollButton extends Component{
  render(){
    return (

      <button type="button" className="createPollButton">Create new Poll</button>

      )
  }
}
class Poll extends Component {
  render(){
    return(
      <div className="pollContainer">
        <h3 className="pollTitle"> {this.props.title} </h3>
        <p className="pollText"> 
        {this.props.body}
        </p>
        <button type="button" className="agree">Agree</button>
        <button type="button" className="disagree">Disagree</button>
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
        <Header userName="Drew" />
        <PollButton/>
        <div className="PollList">
          <Poll title="Buy Google" body="I think that we should buy a bunch of shares of Google because of X Y and Z. What do you think? Do you agree or disagree?"/>
          <Poll title="Sell Apple" body="I think that we should sell a bunch of shares of Apple because of X Y and Z. What do you think? Do you agree or disagree?"/>
          <Poll title="Buy AMD" body="I think that we should buy a bunch of shares of AMD because of X Y and Z. What do you think? Do you agree or disagree?"/>
        </div>      
      </div>
    );
  }
}


export default App;
