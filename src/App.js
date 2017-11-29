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


class PollTemplate extends Component{
  constructor(props){
    super(props)
    this.state={buyOrSell:"Buy", numShares:10, ticker:'GOOG', explanation:"Why?"}
    this.handleBuyOrSellChange=this.handleBuyOrSellChange.bind(this)
    this.handleNumSharesChange=this.handleNumSharesChange.bind(this)
    this.handleTickerChange=this.handleTickerChange.bind(this)
    this.handleExplanationChange=this.handleExplanationChange.bind(this)
  }
  handleBuyOrSellChange(event){
    this.setState({buyOrSell:event.target.value})
  }
  handleNumSharesChange(event){
    this.setState({numShares:event.target.value})
  }
  handleTickerChange(event){
    this.setState({ticker:event.target.value})
  }
  handleExplanationChange(event){
    this.setState({explanation:event.target.value})
  }
  render(){
    return(
      <div className="pollTemplateContainer">
        <h3> Create Proposal </h3>
        <select onChange={this.handleBuyOrSellChange}>
          <option value="Buy">Buy</option>
          <option value="Sell">Sell</option>
        </select>
        <input type="text" className="numSharesBox" defaultValue={this.state.numShares} onChange={this.handleNumSharesChange}/>
        shares of: <input type="text" className="tickerBox" defaultValue={this.state.ticker} onChange={this.handleTickerChange}/>
        <br/>
        <textarea id="explanationTextArea" rows="6" cols="25" defaultValue={this.state.explanation} onChange={this.handleExplanationChange}></textarea>

        <button type="button" className="createPollButton" onClick={() => this.props.onClick(this.state.buyOrSell, this.state.numShares, this.state.ticker, this.state.explanation)}>Create new Proposal</button>

      </div>
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
    this.props.onClick()
  }
  incrementDisagree(){
    this.setState({disagreeVotes:this.state.disagreeVotes+1})
    this.props.onClick()
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
        <p> {this.state.agreeVotes} agree </p>
        <p> {this.state.disagreeVotes} disagree </p>
      </div>
      )
  }
}
class App extends Component {
  constructor(props) {
    super(props)
    this.state={userName:'Drew', votes:100, polls:[]}
    this.handleNewPollClick=this.handleNewPollClick.bind(this)
  }

  handleNewPollClick(buyOrSell, numShares, ticker, explanation){
    var votes=this.state.votes-10
    this.setState({votes})
    const newItem = {
      title: buyOrSell+" "+numShares+" shares of "+ticker,
      text: explanation
    };
    this.setState(prevState => ({
      polls: prevState.polls.concat(newItem)
    }));
  }
  handlePollVoteClick(){
    var votes=this.state.votes-1
    this.setState({votes})
  }
  render() {
    return (
      <div className="App">
        <Header userName={this.state.userName} votes={this.state.votes} />
        <PollTemplate onClick={this.handleNewPollClick}/>
        
        <div className="pollList">
          {this.state.polls.reverse().map(poll => (
          <Poll title={poll.title} body={poll.text} onClick={() => this.handlePollVoteClick()}/>
          ))}
        </div>      
      </div>
    );
  }
}


export default App;
