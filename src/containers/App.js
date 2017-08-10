import React, { Component } from 'react';
import {
  Router, 
  Scene, 
  Modal, 
  Actions 
} from 'react-native-router-flux';
import { 
  View, 
  Text
} from 'react-native';
import { connect } from 'react-redux';
import Login from './Login';
import ToDoList from './ToDoList';
import SignUp from './SignUp';

//Parent container
class App extends Component {

  constructor() {
    super()
  }

// Establishing routes for the containers and components
render() {
  // Deconstructed Redux functions
  const { dispatch, errorMessage, isAuthenticated } = this.props;
  return(

    <Router>
      <Scene key="root" >
        <Scene key="login" component={Login} hideNavBar={true} title="Login" isAuthenticated={isAuthenticated} errorMessage={errorMessage} dispatch={dispatch} initial />
        <Scene key="todo" component={ToDoList} hideNavBar={true} title="Todo" isAuthenticated={isAuthenticated} dispatch={dispatch} />
        <Scene key="signup" component={SignUp} hideNavBar={true} title="Signup" isAuthenticated={isAuthenticated} errorMessage={errorMessage} dispatch={dispatch} />
      </Scene>
    </Router>
  )
}
}

// Connecting file to Redux to access the functions
mapStateToProps = (state) => {
  const { auth } = state;
  const { isAuthenticated, errorMessage } = auth;

  return { 
    isAuthenticated,
    errorMessage
  }
}

export default connect(mapStateToProps)(App);