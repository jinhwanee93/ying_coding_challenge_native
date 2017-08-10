import React, { Component } from 'react';
import { 
  View, 
  Text,
  TextInput,
  TouchableOpacity,
  AsyncStorage,
  StyleSheet 
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { signupUser } from '../actions/Authentication';
import Base from '../components/Base'


// SignUp component
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

  // Handle signup submission
  handleSignUpClick() {
    const creds = { 
      username: this.state.username,
      password: this.state.password
    }
    this.props.dispatch(signupUser(creds))
  }


  render() {
    return(
      <View style={styles.container}>
        <TextInput 
          style={styles.username}
          placeholder="username" 
          onChangeText={text => this.usernameChange(text) }>
        </TextInput>
        <TextInput 
          style={styles.password}
          placeholder="password" 
          onChangeText={text => this.passwordChange(text) }>
        </TextInput>
        <TouchableOpacity 
          onPress={ () => { this.handleSignUpClick() }}>
            <Text>Sign Up</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          onPress={ () => { Actions.login() }}>
            <Text>Back to Login</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 200
  },
  username: {
    borderBottomColor: '#bbb',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomRightRadius: 10
  },
  password: {
    borderBottomColor: '#bbb',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomRightRadius: 10
  }
})

export default SignUp;