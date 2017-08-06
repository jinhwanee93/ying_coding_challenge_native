import React, { Component } from 'react';
import {
  Router, 
  Scene, 
  Modal, 
  Actions 
} from 'react-native-router-flux';
import { 
  View, 
  Text,
  StyleSheet 
} from 'react-native';
import { connect } from 'react-redux';
import Login from './Login';
import ToDoList from './ToDoList';
import SignUp from './SignUp';


class App extends Component {

  constructor() {
    super()
    this.state = {}
  }

render() {
  const { dispatch, errorMessage, isAuthenticated } = this.props;
  return(
    <Router>
      <Scene key="root" >
        <Scene key="login" component={Login} hideNavBar={true} title="Login" isAuthenticated={isAuthenticated} errorMessage={errorMessage} dispatch={dispatch} initial />
        <Scene key="todo" component={ToDoList} hideNavBar={true} title="Todo" />
        <Scene key="signup" component={SignUp} hideNavBar={true} title="Signup" />

      </Scene>
    </Router>
  )
}
}

mapStateToProps = (state) => {
  const { auth } = state;
  const { isAuthenticated, errorMessage } = auth;

  return { 
    isAuthenticated,
    errorMessage
  }
}

export default connect(mapStateToProps)(App);