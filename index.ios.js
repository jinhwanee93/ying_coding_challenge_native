import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import App from './src/containers/App';

export default class coding_challenge extends Component {
  render() {
    return (
      <View>
        {/* <Text style={styles.welcome}>
          Welcome to your coding challenge!
        </Text> */}
        <App />
      </View>
    );
  }
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#F5FCFF',
//   },
//   welcome: {
//     fontSize: 20,
//     textAlign: 'center',
//     margin: 10,
//   },
// });

AppRegistry.registerComponent('coding_challenge', () => coding_challenge);
