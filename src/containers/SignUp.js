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

console.log('this is the asynstorage in the global', AsyncStorage.getItem('id_token').then(result => console.log(result)))

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
    console.log('what is the creds? ', creds)
    this.props.dispatch(signupUser(creds))
  }


  render() {
    console.log('what is the state? ', this.state)
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