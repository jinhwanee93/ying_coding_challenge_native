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
import { logoutUser } from '../actions/Authentication';


class ToDoList extends Base {
  constructor() {
    super()
    this.state = {
      user_id: '',
      entry: '',
      todos: [],
    }

    this.autoBind(
      "handleEntryChange",
      "handleAdd",
      "handleDelete",
      "handleLogOut",
      "handleCompletedFilter",
      "handlePendingFilter",
      "handleShowAll"
    )
  }


  componentWillMount() {
    AsyncStorage.getItem('id_token')
    .then(result => {
      this.setState({
        user_id: result
      })
    })
    .then(() => {
      axios.get(`http://localhost:8082/api/getTasks/${this.state.user_id}`)
      .then(result => {
        this.setState({
          todos: result.data
        })
      })
    })
  }

  handleCompletedFilter() {
    axios.get(`http://localhost:8082/api/getCompletedTasks/${this.state.user_id}/true`)
    .then(result => {
      this.setState({
        todos: result.data
      })
    })
    .catch(err => console.log('error ', err))
  }

  handlePendingFilter() {
    axios.get(`http://localhost:8082/api/getCompletedTasks/${this.state.user_id}/false`)
    .then(result => {
      this.setState({
        todos: result.data
      })
    })
    .catch(err => console.log('error ', err))
  }

  handleShowAll() {
    axios.get(`http://localhost:8082/api/getTasks/${this.state.user_id}`)
      .then(result => {
        this.setState({
          todos: result.data
        })
      })
      .catch(err => console.log('error ', err))
    }

  handleEntryChange(e) {
    this.setState({
      entry: e
    })
  }

  handleAdd() {
    const body = {
      user_id: this.state.user_id,
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

  handleLogOut() {
    this.props.dispatch(logoutUser())
  }

  render() {
    return(
      <View style={styles.container}>

      <TouchableOpacity 
        onPress={() => this.handleShowAll()}>
          <Text>Show All</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        onPress={() => this.handleCompletedFilter()}>
          <Text>Completed</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        onPress={() => this.handlePendingFilter()}>
          <Text>Pending</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        onPress={() => this.handleLogOut()}>
          <Text>Logout</Text>
      </TouchableOpacity>

        <TextInput 
          placeholder="todos here" 
          onChangeText={(e) => this.handleEntryChange(e)}>
        </TextInput>

        <TouchableOpacity 
          style={{ paddingBottom: 20 }}
          onPress={() => this.handleAdd()}>
            <Text>Add</Text>
        </TouchableOpacity>

          <ScrollView>
            {this.state.todos.map(todoEntries => (
              <TodoEntry
                key={this.state.todos.indexOf(todoEntries)}
                indexShiet={this.state.todos.indexOf(todoEntries)} 
                deleteFunc={this.handleDelete}
                id={todoEntries.id}
                entry={todoEntries.entry}
                isCompleted={todoEntries.isCompleted} 
                createdAt={todoEntries.createdAt}
              />
            ))}
          </ScrollView>
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