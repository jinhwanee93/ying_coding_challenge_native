import React, { Component } from 'react';
import { 
  View, 
  Text,
  StyleSheet 
} from 'react-native';

class App extends Component {
  constructor() {
    super()
  }

render() {
  return(
    <View>
      <Text style={styles.title}>
        ToDo:
      </Text>
    </View>
  )
}
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    textAlign: 'center',
    marginTop: 100,
    margin: 10,
  }
})

export default App;