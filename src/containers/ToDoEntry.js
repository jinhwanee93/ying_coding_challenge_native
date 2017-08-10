import React, { Component } from 'react';
import {
  Text,
  TouchableOpacity,
  TextInput,
  View,
  Image,
  StyleSheet
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
      toggleEdit: false,
    }
    this.autoBind(
      "handleToggleComplete",
      "handleEdit",
      "handleSubmitEdit",
      "handleEntryChange"
    )
  }

  // Updating props to properly display filtered TASKS (completed vs, pending)
  componentWillReceiveProps(props) {
    this.setState({
      entry: props.entry,
      completed: props.isCompleted
    })
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
  
// Handle TASK entry change
  handleEntryChange(e) {
    this.setState({
      entry: e
    })
  }


  // Handle editting submission
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

  render() {
    return (
      <View style={styles.entry}>
        <Text>Date: {this.props.createdAt.slice(0, 10)}</Text>
        <TouchableOpacity 
          onPress={() => this.handleEdit()}>{this.state.toggleEdit ? 
            <View style={{ flexDirection: 'row' }}>
              <TextInput 
                placeholder="Edit the task" 
                onChangeText={(e) => this.handleEntryChange(e)}>
              </TextInput>
              <TouchableOpacity 
                onPress={() => this.handleSubmitEdit()}>  
                <Image 
                  style={{ height: 15, width: 15 }}
                  source={require('../assets/submit.png')}/>
              </TouchableOpacity>
            </View>
             : 
            <View style={{ flexDirection: 'row' }}>
              <Text> 
                {this.state.entry}
              </Text>
              <Image 
                  style={{ height: 15, width: 15 }}
                  source={require('../assets/edit.png')}/>
            </View>}
        </TouchableOpacity>

        <View 
          style={{ flexDirection: 'row' }}>    
        <TouchableOpacity 
          onPress={(e, c) => this.props.deleteFunc(this.state.task_id, this.props.index)}>
            <Image 
              style={{ height: 30 , width: 30 }}
              source={require('../assets/entry_delete.png')}/>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={(e, c) => this.handleToggleComplete(this.props.id, this.props.entry)}>
            {this.state.completed ? 
              <Image 
                style={{ height: 30 , width: 30 }} 
                source={require('../assets/completed.png')} /> :
              <Image 
                style={{ height: 30 , width: 30 }} 
                source={require('../assets/entry_pending.png')} />
            }
        </TouchableOpacity>
        </View> 
      </View>    
    )
  }
};

const styles = StyleSheet.create({
  entry: {
    paddingBottom: 20,
    marginTop: 20,
    borderBottomColor: '#bbb',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomRightRadius: 10
  }
})

export default ToDoEntry;