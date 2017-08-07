import React, { Component } from 'react';
import { 
  View, 
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet 
} from 'react-native';
import TodoEntry from '../components/ToDoEntry';
import axios from 'axios';
import Base from '../components/Base';

class ToDoList extends Base {
  constructor() {
    super()
    this.state = {
      entry: '',
      todos: [],
    }

    this.autoBind(
      "handleEntryChange",
      "handleAdd"
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

  render() {
    console.log('what is the state?', this.state.todos)
    return(
      <View style={styles.container}>
        <TextInput 
          placeholder="todos here" 
          onChangeText={(e) => this.handleEntryChange(e)}>
        </TextInput>
          <TouchableOpacity 
            onPress={() => this.handleAdd()}>
              <Text>Add</Text>
          </TouchableOpacity>
          <ScrollView>
            {this.state.todos.map(todoEntries => (
              <TodoEntry 
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
  }
})

export default ToDoList;