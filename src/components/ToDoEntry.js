import React, { Component } from 'react';
import {
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import Base from './Base';

class ToDoEntry extends Base {
  constructor(props) {
    super(props)
    this.autoBind(
      "handleComplete",
      "handleEdit",
      "handleDelete"
    )
  }

  handleComplete() {
    this.props.isCompleted = true
    console.log(this.props.isCompleted)
  }
  
  handleEdit() {
    
  }

  handleDelete() {
    
  }

  render() {
    return (
      <View>
        <Text>{this.props.entry}</Text>
        <TouchableOpacity>
          <Text>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text>Delete</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => this.handleComplete()}>
            {this.props.isCompleted ? <Text>Completed</Text> : <Text>Pending</Text>}
        </TouchableOpacity>
        <Text>Create At: {this.props.createdAt}</Text>
      </View>    
    )
  }
};

export default ToDoEntry;