import React, { Component } from 'react';

export default class PollCountdown extends Component {
  static propTypes = {};

  static defaultProps = {};

  static displayName = "PollCountdown";

  state = {
    days: 3,
    hours: 0,
    minutes: 0,
    seconds: 0,
  };

  componentDidMount(){
    this.timerID = setInterval(()=> this.tick(), 1000);
  }

  tick = () => {
    var now=new Date();
    var then=this.props.endTime;
    var diff=(then-now);
    if (diff <=0){
      fetch('http://my2cents.pythonanywhere.com/pollComplete', {
        method: 'POST',
        headers: {Accept: 'application/json','Content-Type': 'application/json'},
        body: JSON.stringify({pollID:this.props.id})
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
    var seconds=Math.floor(diff/1000);
    var minutes=Math.floor(seconds/60);
    seconds=seconds-(minutes*60);
    var hours=Math.floor(minutes/60);
    minutes=minutes-(hours*60);
    var days=Math.floor(hours/24);
    hours=hours-(days*24);

    this.setState({days});
    this.setState({hours});
    this.setState({minutes});
    this.setState({seconds});
  }
  render(){
    return (
      <h2>{this.state.days.toString()}:{this.state.hours.toString()}:{this.state.minutes.toString()}:{this.state.seconds.toString()} </h2>
      )
  }
}
