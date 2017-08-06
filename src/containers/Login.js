import React, { Component } from 'react';
import { 
  View, 
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet 
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { loginUser } from '../actions/Authentication';

class Login extends Component {

  constructor() {
    super()
    this.state = {
      username: '',
      password: '',
    }
    this.handleLoginClick = this.handleLoginClick.bind(this);
    this.usernameChange = this.usernameChange.bind(this);
    this.passwordChange = this.passwordChange.bind(this);

  }

  usernameChange (e) {
    console.log('what is the e? ', e)
    this.setState({
      username: e
    })
  }

  passwordChange (e) {
    console.log('what is the e? ', e)
    this.setState({
      password: e
    })
  }

  handleLoginClick() {
    const creds = { 
      username: this.state.username,
      password: this.state.password
    }
    console.log('this is creds on line 48',creds)
    this.props.dispatch(loginUser(creds))
  }

  render() {
    console.log('what is the state? ', this.state)
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