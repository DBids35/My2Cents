import React, { Component } from 'react';

import Poll from './Poll';
import PollTemplate from './PollTemplate';
import Header from './Header';

export default class Home extends Component {
  static propTypes = {};

  static defaultProps = {};

  static displayName = "Home";

  state = {
    user: {
      name:'Drew',
      ownershipPercentage: 50,
      accuracy: 1
    },
    polls:[],
    apiCall: null,
  };

  componentDidMount() {
    this.getPolls();
    this.getApiStatus();
  }

  getPolls = () => {
    fetch('http://my2cents.pythonanywhere.com/createPoll')
      .then(result => result.json())
      .then(result => {
        console.log(result.polls)
        this.setState({polls:result.polls})
      });
  }

  getApiStatus = () => {
    fetch('http://my2cents.pythonanywhere.com/api')
    .then(result => result.json())
    .then(result => {
      console.log(result.msg);
      const message = result.msg;
      this.setState({
        apiCall: message
      });
    });
  }

  handleNewPollClick = (buyOrSell, ticker, explanation) => {
    const now = new Date();
    const endTime = now.setDate(now.getDate() + 3);
    
    fetch('http://my2cents.pythonanywhere.com/createPoll', {
        method: 'POST',
        headers: {Accept: 'application/json','Content-Type': 'application/json'},
        body: JSON.stringify({action: buyOrSell, asset:ticker, explanation: explanation, endTime:endTime })
      }
    )
    .then(result => result.json())
    .then(result => {
      console.log(result.polls);
      this.setState({polls:result.polls});
    })
  }

  handlePollVoteClick = () => {
    console.log("voted");
  }

  render() {
    return (
      <div className="App">
        <Header userName={this.state.user.name}/>
        <p>{this.state.apiCall}</p>
        <PollTemplate
          onClick={this.handleNewPollClick}
        />
        <div className="pollList">
          {this.state.polls.reverse().map(poll => (
            <Poll
              title = {`${poll.action} ${poll.asset}`}
              body={poll.text}
              endTime={poll.endTime}
              onClick={this.handlePollVoteClick}
            />
          ))}
        </div>
      </div>
    );
  }
}
