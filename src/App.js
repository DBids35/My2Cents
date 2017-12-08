import React, { Component } from 'react';
import {
  BrowserRouter as Router, Switch, Route
} from 'react-router-dom';
import logo from './logo.svg';
import './App.css';

class UserDisplay extends Component{
  render(){
    return(
      <div className="headerUser">
        <h3> {this.props.userName} </h3>
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
          <UserDisplay userName={this.props.userName}/>
        </div>
      )
  }
}

class CallAPI extends Component{
  constructor(props){
    super(props)
    this.state={apiCall:null}
    fetch('http://my2cents.pythonanywhere.com/api')
    .then(result => result.json())
    .then(result => {
      console.log(result.msg)
      const message= result.msg;
      this.setState({apiCall:message})
    })
  }
  render(){
    return(
        <p>{this.state.apiCall}</p>
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
    this.state={agreeVotes:0, disagreeVotes:0, endTime:null}
    this.incrementAgree=this.incrementAgree.bind(this)
    this.incrementDisagree=this.incrementDisagree.bind(this)
    
    
  }
  componentDidMount(){
    const now=new Date()
    const endTime=now.setDate(now.getDate()+3)
    this.setState({endTime})
    
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
        <PollCountdown endTime={this.state.endTime}/>
        <p> {this.state.agreeVotes} agree </p>
        <p> {this.state.disagreeVotes} disagree </p>
      </div>
      )
  }
}
class PollCountdown extends Component{
  constructor(props){
    super(props)
    this.state={days:3, hours:0, minutes:0, seconds:0} 
    this.tick=this.tick.bind(this)
  }
  componentDidMount(){
    this.timerID = setInterval(()=> this.tick(), 1000);
  }
  tick(){
    var now= new Date()
    var then=this.props.endTime
    var diff=(then-now)
    var seconds=Math.floor(diff/1000)
    var minutes=Math.floor(seconds/60)
    seconds=seconds-(minutes*60)
    var hours=Math.floor(minutes/60)
    minutes=minutes-(hours*60)
    var days=Math.floor(hours/24)
    hours=hours-(days*24)
    
    this.setState({days})
    this.setState({hours})
    this.setState({minutes})
    this.setState({seconds})
  }
  render(){
    return(
      <h2>{this.state.days.toString()}:{this.state.hours.toString()}:{this.state.minutes.toString()}:{this.state.seconds.toString()} </h2>

      )
  }
}
class Home extends Component {
  constructor(props) {
    super(props)
    this.state={user:{name:'Drew', ownershipPercentage:50, accuracy: 1}, polls:[]}
    this.handleNewPollClick=this.handleNewPollClick.bind(this)
  }

  handleNewPollClick(buyOrSell, numShares, ticker, explanation){
    const newItem = {
      title: buyOrSell+" "+numShares+" shares of "+ticker,
      text: explanation
    };
    this.setState(prevState => ({
      polls: prevState.polls.concat(newItem)
    }));
  }
  handlePollVoteClick(){
    console.log("voted")
  }
  render() {
    return (
      <div className="App">
        <Header userName={this.state.user.name}/>
        <CallAPI/>
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
class Login extends Component{
  render(){
    return(
      <div>
        <h2>Username</h2>
        <h2>Password</h2>
      </div>
      )
  }
}
class App extends Component{
  render(){
    return(
      <Router>
        <Switch>
          
          <Route exact path='/' component={Home} />
          <Route path='/login' component={Login} />
          
        </Switch>
      </Router>
      )
  }
}

export default App;
