import React, { Component } from 'react';
import { 
  View, 
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  AsyncStorage,
  StyleSheet 
} from 'react-native';
import TodoEntry from './ToDoEntry';
import axios from 'axios';
import Base from '../components/Base';

console.log('this is the asynstorage in the global', AsyncStorage.getItem('id_token').then(result => console.log(result)))

class ToDoList extends Base {
  constructor() {
    super()
    this.state = {
      entry: '',
      todos: [],
    }

    this.autoBind(
      "handleEntryChange",
      "handleAdd",
      "handleDelete"
    )
  }

  componentWillMount() {
    axios.get('http://localhost:8082/api/getAllTasks')
    .then(result => {
      this.setState({
        todos: result.data
      })
    })
  }

  handleEntryChange(e) {
    this.setState({
      entry: e
    })
  }

  handleAdd() {
    const body = {
      entry: this.state.entry,
      isCompleted: false
    }
  axios.post('http://localhost:8082/api/addTask', body)
  .then(result => {
    this.setState({
      todos: [...this.state.todos, result.data]
    })
  })
  }

  handleDelete(e, c) {
    axios.delete(`http://localhost:8082/api/deleteTask/${e}`)
    .then(() => {
      this.state.todos.splice(c, 1)
    })
    .then(() => {
      this.setState({
        todos: this.state.todos
      })
    })
  }

  render() {
    return(
      <View style={styles.container}>
        <TextInput 
          placeholder="todos here" 
          onChangeText={(e) => this.handleEntryChange(e)}>
        </TextInput>
          <TouchableOpacity style={{ paddingBottom: 20 }}
            onPress={() => this.handleAdd()}>
              <Text>Add</Text>
          </TouchableOpacity>
          <ScrollView>
            {this.state.todos.map(todoEntries => (
              <TodoEntry
                deleteFunc={this.handleDelete}
                indexShiet={this.state.todos.indexOf(todoEntries)} 
                id={todoEntries.id}
                entry={todoEntries.entry}
                isCompleted={todoEntries.isCompleted} 
                createdAt={todoEntries.createdAt}
              />
            ))}
          </ScrollView>
          <TodoEntry />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 100,
    paddingBottom: 100
  }
})

export default ToDoList;