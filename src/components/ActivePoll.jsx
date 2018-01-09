import React, { Component } from 'react';

import PollCountdown from './PollCountdown';

export default class ActivePoll extends Component {
  state = {
    userVoteStatus:"none",
    id:this.props.id,
    voteMessage:"You haven't voted yet!"
  };

  componentWillMount(){
    this.getPollInfo()

    
  }
  componentDidMount(){
    
  }
  getPollInfo(){
    fetch('http://my2cents.pythonanywhere.com/getUserVoteStatus', {
        method: 'POST',
        headers: {Accept: 'application/json','Content-Type': 'application/json'},
        body: JSON.stringify({user: this.props.user, pollID:this.state.id})
      }
    )
    .then(result => result.json())
    .then(result => {
      this.setState({userVoteStatus:result.vote});
      this.updateVoteMessage(result.vote)
      this.setState({numberVoted:result.numberVoted});
      this.setState({numberUsers:result.numberUsers});
      console.log("finished")
    })
  }
  handlePollVoteClick = (pollID, vote, timestamp) => {
    fetch('http://my2cents.pythonanywhere.com/addVote', {
        method: 'POST',
        headers: {Accept: 'application/json','Content-Type': 'application/json'},
        body: JSON.stringify({pollID:pollID, user:this.props.user, vote:vote, timestamp:timestamp })
      }
    )
    .then(result => result.json())
    .then(result => {
      console.log(result.msg);
      this.getPollInfo()
      
    })
  }
  updateVoteMessage(vote){
    if(vote==1){
        this.setState({voteMessage: "You voted Yes"})
      }
      else if(vote==-1){
        this.setState({voteMessage: "You voted No"})
      }
      else if(vote==0){
        this.setState({voteMessage: "You voted Not Sure"})
      }
  }
  
  incrementAgree=()=>{
    this.setState({userVoteStatus:1})
    this.updateVoteMessage(1)
    this.handlePollVoteClick(this.state.id, 1, Date.now())
    
  }

  incrementDisagree=()=>{
    this.setState({userVoteStatus:-1})
    this.updateVoteMessage(-1)
    this.handlePollVoteClick(this.state.id, -1, Date.now())
    
    
  }

  incrementNotSure=()=>{
    this.setState({userVoteStatus:0})
    this.updateVoteMessage(0)
    this.handlePollVoteClick(this.state.id, 0, Date.now())
    
    
    
  }
  

  render(){
    return(
      
      <div className="pollContainer">
        <h3 className="pollTitle"> {this.props.title} </h3>
        <p className="pollText">
        {this.props.body}
        </p>
        <div className="buttonContainer">
          <button type="button" className="agree" onClick={this.incrementAgree}>Yes</button>
          <button type="button" className="notSure" onClick={this.incrementNotSure}>Not Sure</button>
          <button type="button" className="disagree" onClick={this.incrementDisagree}>No</button>
        </div>
        <h3>{this.state.voteMessage} </h3>
        <h3>{this.state.numberVoted} out of {this.state.numberUsers} have voted on this poll </h3>
        <PollCountdown endTime={this.props.endTime} id={this.state.id} updatePolls={this.props.updatePolls}/>
        
      </div>
      )
  }
}
