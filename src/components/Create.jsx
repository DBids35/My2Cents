import React, { Component } from 'react';

import ActivePoll from './ActivePoll';
import PollTemplate from './PollTemplate';
import Header from './Header';

export default class Create extends Component {
  static propTypes = {};

  static defaultProps = {};

  static displayName = "Create";


  handleNewPollClick = (buyOrSell, ticker, explanation) => {
    const now = new Date();
    const endTime = now.setDate(now.getDate() + .001);
    
    fetch('http://my2cents.pythonanywhere.com/getStockPrice/'+ticker, {
        method: 'POST',
        headers: {Accept: 'application/json','Content-Type': 'application/json'},
        body: JSON.stringify({action: buyOrSell, asset:ticker, explanation: explanation, endTime:endTime })
      }
    )
    .then(result => result.json())
    .then(result => {
      if(result.msg == 'valid'){
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
          window.location= '/home'
        })
      }
      else{
        alert("Invalid ticker")
      }

      })
    }

  

  render() {
    return (
      <div className="App">
        <Header userName={this.props.user}/>
        <PollTemplate onClick={this.handleNewPollClick}/>
      </div>
    );
  }
}
