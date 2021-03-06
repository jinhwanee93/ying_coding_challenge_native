import axios from 'axios';
import { 
  AsyncStorage
} from 'react-native';
import { 
  Actions, 
  ActionConst 
} from 'react-native-router-flux';
import ToDoList from '../containers/ToDoList';
import Login from '../containers/Login';

// Most of Redux functionality, actions are defined here
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE';

const requestLogin = creds => ({
  type: 'LOGIN_REQUEST',
  isFetching: true,
  isAuthenticated: false,
  creds,
});
const receiveLogin = user => ({
  type: 'LOGIN_SUCCESS',
  isFetching: false,
  isAuthenticated: true,
  id_token: user.id_token,
});
const loginError = message => ({
  type: 'LOGIN_FAILURE',
  isFetching: false,
  isAuthenticated: false,
  message,
});
const requestLogout = () => ({
  type: 'LOGOUT_REQUEST',
  isFetching: true,
  isAuthenticated: true,
});
const receiveLogout = () => ({
  type: 'LOGOUT_SUCCESS',
  isFetching: false,
  isAuthenticated: false,
});


// Logging in the user and sequencing functions through the thunks middleware for dispatching functions 
// in an organized manner, attempting to avoid asynchronous code firing off at different and possibly
// random times... 

// Also setting id_token for login autherization, this is used to kill session of a user so that when 
// another user logs in the tasks are not persisted to a different user

exports.loginUser = (creds) => {
  return (dispatch) => {
    dispatch(requestLogin(creds));
    return axios.get(`http://localhost:8082/api/login/${creds.username}/${creds.password}`)
      .then((response) => {
        if (response.data === 'Username and/or password does not match') {
          dispatch(loginError('Bad Request...'));
          Actions.login();
          return Promise.reject(response);
        } else {
          AsyncStorage.setItem('id_token', JSON.stringify(response.data.user.id))
          dispatch(receiveLogin(response.data));
          Actions.todo();
        }
      })
      .catch((err) => {
        console.log('Error: ', err);
      });
  };
};

// Sign up user 
exports.signupUser = (creds) => {
  const body = {
    username: creds.username,
    password: creds.password,
  };
  return (dispatch) => {
    dispatch(requestLogin(creds));
    return axios.post('http://localhost:8082/api/addUser', body)
      .then((response) => {
        AsyncStorage.setItem('id_token', response.data.id_token);
        dispatch(receiveLogin(response.data));
        Actions.login();
      })
      .catch((err) => {
        console.log('Error: ', err);
      });
  };
};


// Logging out the user
// Killing id_token

exports.logoutUser = () => {
  return (dispatch) => {
    dispatch(requestLogout());
    AsyncStorage.removeItem('id_token');
    dispatch(receiveLogout());
    Actions.login();
  };
};