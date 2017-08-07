import React, { Component } from 'react';
import { 
  View, 
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { loginUser } from '../actions/Authentication';
import Base from '../components/Base';

class Login extends Base {

  constructor() {
    super()
    this.state = {
      username: '',
      password: '',
    }
    this.autoBind(
      "handleLoginClick",
      "usernameChange",
      "passwordChange"
    )
  }

  // Handle username input
  usernameChange (e) {
    this.setState({
      username: e
    })
  }

  // Handle password input
  passwordChange (e) {
    this.setState({
      password: e
    })
  }

  // Handle login submission
  handleLoginClick() {
    const creds = { 
      username: this.state.username,
      password: this.state.password
    }
    this.props.dispatch(loginUser(creds))
  }

  // Rendering login component
  render() {
    return(
      <View style={{ marginTop: 10 }}>
        <TextInput placeholder="username" onChangeText={text => this.usernameChange(text) }></TextInput>
        <TextInput placeholder="password" onChangeText={text => this.passwordChange(text) }></TextInput>
        <TouchableOpacity onPress={ () => { this.handleLoginClick() }}><Text>Login</Text></TouchableOpacity>
      </View>
    )
  }
}

export default Login;