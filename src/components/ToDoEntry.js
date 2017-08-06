import React, { Component } from 'react';
import {
  Text,
  TouchableOpacity,
  View
} from 'react-native';

class ToDoEntry extends Component {
  constructor(props) {
    super(props)
    this.state = {
      
    }
  } 

  handleEdit(e) {

  }

  handleDelete() {

  }

  render() {
    return(
      <View>
        <Text>{this.props.entry}</Text>
        <Text>{this.props.isItCompleted}</Text>
        <TouchableOpacity onPress={(e) => this.handleEdit(e)}></TouchableOpacity>
        <TouchableOpacity onPress={() => this.handleDelete()}></TouchableOpacity>
      </View>    
    )
  }
}

export default ToDoEntry;