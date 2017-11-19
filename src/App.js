import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class UserDisplay extends Component{
  render(){
    return(
      <div className="headerUser">
        <h3> {this.props.userName} </h3>
        <p> {this.props.votes} </p>
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
          <UserDisplay userName={this.props.userName} votes={this.props.votes}/>
        </div>
      )
  }
}

class PollButton extends Component{
  render(){
    return (

      <button type="button" className="createPollButton" onClick={this.props.onClick}>Create new Poll</button>

      )
  }
}
class Poll extends Component {
  constructor(props){
    super(props)
    this.state={agreeVotes:0, disagreeVotes:0}
    this.incrementAgree=this.incrementAgree.bind(this)
    this.incrementDisagree=this.incrementDisagree.bind(this)

  }
  incrementAgree(){
    this.setState({agreeVotes:this.state.agreeVotes+1})
  }
  incrementDisagree(){
    this.setState({disagreeVotes:this.state.disagreeVotes+1})
  }
  render(){
    return(
      <div className="pollContainer">
        <h3 className="pollTitle"> {this.props.title} </h3>
        <p className="pollText"> 
        {this.props.body}
        </p>
        <button type="button" className="agree" onClick={this.incrementAgree}>Agree</button>
        <button type="button" className="disagree" onClick={this.incrementDisagree}>Disagree</button>
        <p> {this.state.agreeVotes} agree </p>
        <p> {this.state.disagreeVotes} disagree </p>
      </div>
      )
  }
}
class App extends Component {
  constructor(props) {
    super(props)
    this.state={userName:'Drew', votes:100}

  }
  componentDidMount() {
    
  }
  handleNewPollClick(){
    var votes=this.state.votes-10
    this.setState({votes})
  }
  render() {
    return (
      <div className="App">
        <Header userName={this.state.userName} votes={this.state.votes} />
        <PollButton onClick={() => this.handleNewPollClick()}/>
        <div className="pollList">
          <Poll title="Buy Google" body="I think that we should buy a bunch of shares of Google because of X Y and Z. What do you think? Do you agree or disagree?"/>
          <Poll title="Sell Apple" body="I think that we should sell a bunch of shares of Apple because of X Y and Z. What do you think? Do you agree or disagree?"/>
          <Poll title="Buy AMD" body="I think that we should buy a bunch of shares of AMD because of X Y and Z. What do you think? Do you agree or disagree?"/>
        </div>      
      </div>
    );
  }
}


export default App;
