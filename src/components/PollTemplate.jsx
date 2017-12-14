import React, { Component } from 'react';

export default class PollTemplate extends Component{
  state= {
    buyOrSell: "Buy",
    ticker: 'GOOG',
    explanation: "Why?"
  };

  handleBuyOrSellChange = (event) => {
    this.setState({buyOrSell:event.target.value})
  }

  handleTickerChange = (event) => {
    this.setState({ticker:event.target.value})
  }

  handleExplanationChange = (event) => {
    this.setState({
      explanation: event.target.value
    });
  }

  handleCreatePoll = () => {
    this.props.onClick(this.state.buyOrSell, this.state.ticker, this.state.explanation);
  }

  render(){
    return (
      <div className="pollTemplateContainer">
        <h3> Create Proposal </h3>
        <select onChange={this.handleBuyOrSellChange}>
          <option value="Buy">Buy</option>
          <option value="Sell">Sell</option>
        </select>
        <input type="text" className="tickerBox" placeholder={this.state.ticker} onChange={this.handleTickerChange}/>
        <br/>
        <textarea id="explanationTextArea" rows="6" cols="25" placeholder={this.state.explanation} onChange={this.handleExplanationChange}></textarea>
        <button type="button" className="createPollButton" onClick={this.handleCreatePoll}>Create new Proposal</button>
      </div>
      )
  }
}
