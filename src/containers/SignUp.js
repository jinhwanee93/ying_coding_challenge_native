import React, { Component } from 'react';
import { 
  View, 
  Text,
  StyleSheet 
} from 'react-native';


// Bare bones sign-up container
class SignUp extends Component {

  constructor() {
    super()
    this.state = {}
  }

  render() {
    return(
      <View>
        <Text>
          Sign-up container
        </Text>
      </View>
    )
  }
}

export default SignUp;