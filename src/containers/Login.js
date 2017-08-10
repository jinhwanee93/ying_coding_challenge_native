import React, { Component } from 'react';
import { 
  View, 
  Text,
  TextInput,
  AsyncStorage,
  TouchableOpacity,
  Image,
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
        <Text style={styles.description}>Login to View Your Tasks</Text>

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

      <View style={{ paddingTop: 15, flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
        <TouchableOpacity 
          onPress={ () => { this.handleLoginClick() }}>
            <Image 
              style={{ height: 40, width: 40 }} 
              source={ require('../assets/log_in.png')} />
            <Text>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          onPress={ () => { Actions.signup() }}>
            <Image 
              style={{ height: 40, width: 40 }} 
              source={ require('../assets/sign_up.png')} />
            <Text>SignUp</Text>
        </TouchableOpacity>
      </View>

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
    borderBottomRightRadius: 10
  },
  password: {
    borderBottomColor: '#bbb',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomRightRadius: 10
  },
})

export default Login;