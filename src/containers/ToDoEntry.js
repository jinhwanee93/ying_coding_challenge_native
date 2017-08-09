import React, { Component } from 'react';
import {
  Text,
  TouchableOpacity,
  TextInput,
  View
} from 'react-native';
import Base from '../components/Base';
import axios from 'axios';

// ToDo entry
class ToDoEntry extends Base {
  constructor(props) {
    super(props)
    this.state = {
      task_id: this.props.id,
      entry: this.props.entry,
      completed: this.props.isCompleted,
      toggleEdit: false
    }
    this.autoBind(
      "handleToggleComplete",
      "handleEdit",
      "handleSubmitEdit",
      "handleEntryChange"
    )
  }

  // Handle if the task has been completed or not
  handleToggleComplete(e, c) {
    if(this.state.completed) {
      const body = {
        entry: c,
        isCompleted: false,
      }
      axios.put(`http://localhost:8082/api/updateTask/${e}`, body)
      .then(() => {
        this.setState({
          completed: false
        })
      })
    } else {
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
  }
  

  handleEntryChange(e) {
    this.setState({
      entry: e
    }, () => console.log('handleEdit state', this.state.entry))
  }


  handleSubmitEdit() {
    const body = {
      entry: this.state.entry
    }
    axios.put(`http://localhost:8082/api/updateTask/${this.state.task_id}`, body)
    .then(() => {
      this.setState({
        toggleEdit: false
      })
    })
  }

  // Handle the edit functionality
  handleEdit(e) {
    this.setState({
      toggleEdit: true
    })
  }

  // Rendering components in an MVP fashion
  render() {
    console.log('what is the state of entry? ', this.state.entry)
    return (
      <View style={{ paddingBottom: 20 }}>
        <Text>Task Id: {this.props.id}</Text>

        <TouchableOpacity onPress={() => this.handleEdit()}>{this.state.toggleEdit ? 
            <View>
              <TextInput 
                placeholder="Edit the task" 
                onChangeText={(e) => this.handleEntryChange(e)}>
              </TextInput>
              <TouchableOpacity onPress={() => this.handleSubmitEdit()}>  
                <Text>Submit</Text>
              </TouchableOpacity>
            </View>
             : 
            <Text> 
              {this.state.entry}
            </Text>}
        </TouchableOpacity>

        <TouchableOpacity onPress={(e, c) => this.props.deleteFunc(this.state.task_id, this.props.indexShiet)}>
          <Text>X</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={(e, c) => this.handleToggleComplete(this.props.id, this.props.entry)}>
            {this.state.completed ? <Text>Completed</Text> : <Text>Pending</Text>}
        </TouchableOpacity>
        <Text>Create At: {this.props.createdAt}</Text>
      </View>    
    )
  }
};

export default ToDoEntry;