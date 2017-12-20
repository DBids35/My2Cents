import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import ActivePoll from './ActivePoll';
import PollTemplate from './PollTemplate';
import Header from './Header';

export default class Home extends Component {
  static propTypes = {};

  static defaultProps = {};

  static displayName = "Home";

  state = {
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
  goToCreate = () => {
    window.location= '/create'
  }

  

  render() {
    return (
      <div className="App">
        <Header userName={this.props.user}/>
        <button type="button" className="createPollButton" onClick={this.goToCreate}>Create new Proposal</button>
        <div className="pollList">
          {this.state.polls.map(poll => (
            <ActivePoll
              user={this.props.user}
              id={poll.id}
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
