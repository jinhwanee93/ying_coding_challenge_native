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

class ToDoList extends Component {

  constructor() {
    super()
    this.state = {
      entry: '',
      todos: []
    }
    this.handleEntryChange = this.handleEntryChange.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
  }

  componentDidMount() {
    axios.get('http://localhost:8082/api/getAllTasks')
    .then(result => {
      console.log('what is the result object? ', result)
      // this.setState({
      //   todos: result.data
      // })
    })
  }

  handleEntryChange(e) {
    this.setState({
      entry: e
    })
  }

   handleAdd() {
     const body = {
       entry: this.state.entry
     }
    axios.post('http://localhost:8082/api/addTask', body)
    .then( result => {
      this.setState({
        todos: [...this.state.todos, result.data]
      })
    })
  }

  render() {
    return(
      <View>
        <TextInput placeholder="write your todos here" onChangeText={(e) => this.handleEntryChange()}></TextInput>
        <TouchableOpacity onPress={() => this.handleAdd()}><Text>Add</Text></TouchableOpacity>
        <ScrollView>
          {this.state.todos.map(todoEntries => {
            <TodoEntry key={todoEntries.id} entry={todoEntries.entry} isItCompleted={todoEntries.isCompleted} />
          })}
        </ScrollView>
      </View>
    )
  }
}

export default ToDoList;