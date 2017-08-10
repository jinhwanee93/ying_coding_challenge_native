import React, { Component } from 'react';
import { 
  View, 
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  AsyncStorage,
  Image,
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

// Front-load USER id
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

  // Shows completed TASK_LIST
  handleCompletedFilter() {
    axios.get(`http://localhost:8082/api/getCompletedTasks/${this.state.user_id}/true`)
    .then(result => {
      this.setState({
        todos: result.data
      })
    })
    .catch(err => console.log('error ', err))
  }

  // Shows pending TASK_LIST
  handlePendingFilter() {
    axios.get(`http://localhost:8082/api/getCompletedTasks/${this.state.user_id}/false`)
    .then(result => {
      this.setState({
        todos: result.data
      })
    })
    .catch(err => console.log('error ', err))
  }

  // Shows all the TASKS
  handleShowAll() {
    axios.get(`http://localhost:8082/api/getTasks/${this.state.user_id}`)
      .then(result => {
        this.setState({
          todos: result.data
        })
      })
      .catch(err => console.log('error ', err))
    }

  // Handle entry change
  handleEntryChange(e) {
    this.setState({
      entry: e
    })
  }

  // Handle adding a new TASK
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

  // Handle deleting a TASK
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

  // Handle logout
  handleLogOut() {
    this.props.dispatch(logoutUser())
  }

  render() {
    return(
      <View style={styles.container}>

      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>

      <TouchableOpacity 
        style={styles.centerImages}
        onPress={() => this.handleShowAll()}>
          <Image 
            style={{ height: 40, width: 40 }}
            source={require('../assets/show_all.png')}/>
              <Text>Show All</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.centerImages}
        onPress={() => this.handleCompletedFilter()}>
          <Image 
              style={{ height: 40, width: 40 }}
              source={require('../assets/completed.png')}/>
                <Text>Completed</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.centerImages}
        onPress={() => this.handlePendingFilter()}>
          <Image 
            style={{ height: 40, width: 40 }}
            source={require('../assets/pending.png')}/>
              <Text>Pending</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.centerImages}
        onPress={() => this.handleLogOut()}>
          <Image 
            style={{ height: 40, width: 40 }}
            source={require('../assets/log_out.png')}/>
              <Text>Logout</Text>
      </TouchableOpacity>
      </View>

        <TextInput 
          style={styles.input}
          placeholder="todos here" 
          onChangeText={(e) => this.handleEntryChange(e)}>
        </TextInput>

        <TouchableOpacity 
          style={styles.add}
          onPress={() => this.handleAdd()}>
            <Text>Add</Text>
        </TouchableOpacity>

          <ScrollView 
            style={styles.scroll}>
            {this.state.todos.map(todoEntries => (
              <TodoEntry
                key={this.state.todos.indexOf(todoEntries)}
                index={this.state.todos.indexOf(todoEntries)} 
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
    marginTop: 40,
    paddingBottom: 10
  },
  input: {
    marginTop: 20,
     borderBottomColor: '#bbb',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomRightRadius: 10
  },
  add: {
    paddingBottom: 20
  },
  scroll: {
    height: 450
  },
  centerImages: {
    alignItems: 'center'
  }
})

export default ToDoList;