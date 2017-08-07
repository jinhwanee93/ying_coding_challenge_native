import React, { Component } from 'react';
import {
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import Base from './Base';
import axios from 'axios';

// ToDo entry
class ToDoEntry extends Base {
  constructor(props) {
    super(props)
    this.state = {
      completed: false,
      task_id: ''
    }
    this.autoBind(
      "handleComplete",
      "handleEdit",
      "handleDelete"
    )
  }

  // Attempted to front load data properly to reflect on the native client
  // Objects were stored in as an array and passed down, but was having difficulties
  // Identifying the proper IDs of the tasks to resemble each individual statuses 
  componentDidMount() {
    axios.get(`http://localhost:8082/api/getAllTasks`)
    .then(results => {
      for(var i = 0; i < results.data.length; i++) {
        this.setState({
          completed: results.data[i].isCompleted
        })
      }
    })
  }

  // Handle if the task has been completed or not
  handleComplete(e, c) {
    const body = {
      entry: c,
      isCompleted: true
    }
    axios.put(`http://localhost:8082/api/updateTask/${e}`, body)
    .then(() => {
      this.setState({
        completed: true
      })
    })
  }
  

  // Handle the edit functionality
  handleEdit() {
    
  }

  // Handle the delete functionality
  handleDelete() {
    
  }

  // Rendering components in an MVP fashion
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
          onPress={(e, c) => this.handleComplete(this.props.id, this.props.entry)}>
            {this.state.completed ? <Text>Completed</Text> : <Text>Pending</Text>}
        </TouchableOpacity>
        <Text>Create At: {this.props.createdAt}</Text>
      </View>    
    )
  }
};

export default ToDoEntry;