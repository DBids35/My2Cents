import React, { Component } from 'react';
import {
  BrowserRouter as Router, Switch, Route, Redirect
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
    this.state={buyOrSell:"Buy", ticker:'GOOG', explanation:"Why?"}
    this.handleBuyOrSellChange=this.handleBuyOrSellChange.bind(this)
    this.handleTickerChange=this.handleTickerChange.bind(this)
    this.handleExplanationChange=this.handleExplanationChange.bind(this)
  }
  handleBuyOrSellChange(event){
    this.setState({buyOrSell:event.target.value})
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
        <input type="text" className="tickerBox" placeholder={this.state.ticker} onChange={this.handleTickerChange}/>
        <br/>
        <textarea id="explanationTextArea" rows="6" cols="25" placeholder={this.state.explanation} onChange={this.handleExplanationChange}></textarea>

        <button type="button" className="createPollButton" onClick={() => this.props.onClick(this.state.buyOrSell, this.state.ticker, this.state.explanation)}>Create new Proposal</button>

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
  componentDidMount(){
       
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
        <PollCountdown endTime={this.props.endTime}/>
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
    var now=new Date()
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
    
    fetch('http://my2cents.pythonanywhere.com/nextPollKey')
    .then(result => result.json())
    .then(result => {
      console.log(result.polls)
      this.setState({polls:result.polls})
    }
    )
    this.handleNewPollClick=this.handleNewPollClick.bind(this)
  }

  handleNewPollClick(buyOrSell, ticker, explanation){
    const now=new Date() 
    const endTime=now.setDate(now.getDate()+3)
    console.log("now is ", now, "and end is ", endTime)
    const title=buyOrSell+" "+ticker
    fetch('http://my2cents.pythonanywhere.com/nextPollKey', {
  method: 'POST',
  headers: {Accept: 'application/json','Content-Type': 'application/json'},
  body: JSON.stringify({title: title, explanation: explanation, endTime:endTime })
}).then(result => result.json())
    .then(result => {
      console.log(result.polls)
      this.setState({polls:result.polls})
    }
    )}
    
    

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
          <Poll title={poll.title} body={poll.text} endTime={poll.endTime} onClick={() => this.handlePollVoteClick()}/>
          ))}
        </div>      
      </div>
    );
  }
}
class Login extends Component{
  constructor(props){
    super(props)
    this.state={username:"Username", password:"Password", valid:false, message:"Please Login"}
    this.handleUsername=this.handleUsername.bind(this)
    this.handlePassword=this.handlePassword.bind(this)
    this.validate=this.validate.bind(this)
    
  }
  handleUsername(event){
    this.setState({username:event.target.value})
  }
  handlePassword(event){
    this.setState({password:event.target.value})
  }
  validate(){
    const username=this.state.username
    const password=this.state.password
    fetch('http://my2cents.pythonanywhere.com/validate', {
  method: 'POST',
  headers: {Accept: 'application/json','Content-Type': 'application/json'},
  body: JSON.stringify({user: username, pass: password})
}).then(result => result.json())
    .then(result => {
      console.log(result.msg);
      this.setState({valid:result.msg})
      if (this.state.valid){
        this.setState({message:"Logging In..."})
      }
      else{
        this.setState({message:"Incorrect username or password, please try again"})
      }
    }
  )
    
  }


  render(){
    if (this.state.valid){
      return <Redirect to='/home'/>
    }
    else{
      return(
      <div>
        <h2>Username</h2>
        <input type="text" className="usernameBox" placeholder={this.state.username} onChange={this.handleUsername}/>
        <h2>Password</h2>
        <input type="password" className="usernameBox" placeholder={this.state.password} onChange={this.handlePassword}/>
        <button type="button" className="loginButton" onClick={this.validate}>Login</button>
        <h2>{this.state.message}</h2>
      </div>
      )
    }
    
  }
}
class PrivateRoute extends Component{
  
  render(){
   return <h2> hi </h2>
  }
}
class App extends Component{
  render(){
    return(
      <Router>
        <Switch>
          
          <Route exact path='/' component={Login} />
          <Route path='/home' component={Home} />
          
        </Switch>
      </Router>
      )
  }
}

export default App;
