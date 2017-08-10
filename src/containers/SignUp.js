import React, { Component } from 'react';
import { 
  View, 
  Text,
  TextInput,
  TouchableOpacity,
  AsyncStorage,
  StyleSheet 
} from 'react-native';
import Base from '../components/Base'
import { signupUser } from '../actions/Authentication';


// Bare bones sign-up container
class SignUp extends Base {

  constructor() {
    super()
    this.state = {
      username: '',
      password: ''
    }
    this.autoBind(
      "usernameChange",
      "passwordChange",
      "handleSignUpClick"
    )
  }

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

  handleSignUpClick() {
    const creds = { 
      username: this.state.username,
      password: this.state.password
    }
    this.props.dispatch(signupUser(creds))
  }


  render() {
    return(
      <View style={{ marginTop: 200 }}>
        <TextInput placeholder="username" onChangeText={text => this.usernameChange(text) }></TextInput>
        <TextInput placeholder="password" onChangeText={text => this.passwordChange(text) }></TextInput>
        <TouchableOpacity onPress={ () => { this.handleSignUpClick() }}><Text>Sign Up</Text></TouchableOpacity>
      </View>
    )
  }
}

export default SignUp;