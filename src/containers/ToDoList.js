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
      todos: [{
        entry: 'i hate this thing so much right now',
        isCompleted: false,
        createdAt: 'today'
      }]
    }
    this.handleEntryChange = this.handleEntryChange.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
  }

  componentWillMount() {
    axios.get('http://localhost:8082/api/getAllTasks')
    .then(result => {
      this.setState({
        todos: result.data
      }, () => console.log('PLISSS', this.state.todos))
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