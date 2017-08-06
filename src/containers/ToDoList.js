import React, { Component } from 'react';
import { 
  View, 
  Text,
  StyleSheet 
} from 'react-native';
import TodoEntry from '../components/ToDoEntry'

class ToDoList extends Component {

  constructor() {
    super()
    this.state = {
      entry: ''
    }
    this.handleEntryChange = this.handleEntryChange.bind(this);
  }

  handleEntryChange(e) {
    this.setState({
      entry: e
    })
  }

  render() {
    return(
      <View>

      </View>
    )
  }
}

export default ToDoList;