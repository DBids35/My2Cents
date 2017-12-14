import React, { Component } from 'react';

import PollCountdown from './PollCountdown';

export default class Poll extends Component {
  state = {
    agreeVotes:0,
    disagreeVotes:0,
    userVoteStatus:0
  };

  componentDidMount(){}

  incrementAgree=()=>{
    if (this.state.userVoteStatus==0){
      this.setState(prevState => ({agreeVotes: prevState.agreeVotes + 1,}))
      this.setState({userVoteStatus:1})
    }
    else if (this.state.userVoteStatus==-1){
      this.setState(prevState => ({agreeVotes: prevState.agreeVotes + 1,}))
      this.setState(prevState => ({disagreeVotes: prevState.disagreeVotes - 1,}))
      this.setState({userVoteStatus:1})
    }
    
    this.props.onClick();
  }

  incrementDisagree=()=>{
    if (this.state.userVoteStatus==0){
      this.setState(prevState => ({disagreeVotes: prevState.disagreeVotes + 1,}))
      this.setState({userVoteStatus:-1})
    }
    else if (this.state.userVoteStatus==1){
      this.setState(prevState => ({disagreeVotes: prevState.disagreeVotes + 1,}))
      this.setState(prevState => ({agreeVotes: prevState.agreeVotes - 1,}))
      this.setState({userVoteStatus:-1})
    }
    
    this.props.onClick();
  }

  render(){
    return(
      <div className="pollContainer">
        <h3 className="pollTitle"> {this.props.title} </h3>
        <p className="pollText">
        {this.props.body}
        </p>
        <button type="button" className="agree" onClick={this.incrementAgree}>+1</button>
        <button type="button" className="disagree" onClick={this.incrementDisagree}>-1</button>
        <PollCountdown endTime={this.props.endTime}/>
        <p> {this.state.agreeVotes} agree </p>
        <p> {this.state.disagreeVotes} disagree </p>
      </div>
      )
  }
}
