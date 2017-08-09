import React, { Component } from 'react';
import { 
  View, 
  Text,
  TextInput,
  AsyncStorage,
  TouchableOpacity,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { loginUser } from '../actions/Authentication';
import Base from '../components/Base';

console.log('this is the asynstorage in the global', AsyncStorage.getItem('id_token').then(result => console.log(result)))

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
      <View style={{ marginTop: 200 }}>
        <TextInput placeholder="username" onChangeText={text => this.usernameChange(text) }></TextInput>
        <TextInput placeholder="password" onChangeText={text => this.passwordChange(text) }></TextInput>
        <TouchableOpacity onPress={ () => { this.handleLoginClick() }}><Text>Login</Text></TouchableOpacity>
        <TouchableOpacity onPress={ () => { Actions.signup() }}><Text>Sign Up</Text></TouchableOpacity>
      </View>
    )
  }
}

export default Login;