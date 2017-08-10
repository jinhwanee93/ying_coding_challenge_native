import React, { Component } from 'react';
import { 
  View, 
  Text,
  TextInput,
  AsyncStorage,
  TouchableOpacity,
  StyleSheet
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
      <View style={styles.container}>
        <Text style={styles.title}>TODO</Text>
        <Text style={styles.description}>Login to Your Tasks</Text>
        <TextInput style={styles.username} placeholder="username" onChangeText={text => this.usernameChange(text) }></TextInput>
        <TextInput style={styles.password} placeholder="password" onChangeText={text => this.passwordChange(text) }></TextInput>
        <TouchableOpacity onPress={ () => { this.handleLoginClick() }}><Text>Login</Text></TouchableOpacity>
        <TouchableOpacity onPress={ () => { Actions.signup() }}><Text>Sign Up</Text></TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 100
  },
  title: {
    fontSize: 100,
    textAlign: 'center'
  },
  description: {
    marginTop: 40,
    fontSize: 20,
    textAlign: 'center'
  },
  username: {
    marginTop: 100,
    borderBottomColor: '#bbb',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  password: {
    borderBottomColor: '#bbb',
    borderBottomWidth: StyleSheet.hairlineWidth,
  }
})

export default Login;