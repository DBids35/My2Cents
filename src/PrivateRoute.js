class PrivateRoute extends Component{
  
  render(){
   if (this.props.loggedIn){
    return <Route path={this.props.path} component={this.props.component} />
   }
   else{
    return <Redirect to='/'/>
   }
}
}