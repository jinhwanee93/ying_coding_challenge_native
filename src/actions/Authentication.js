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

exports.loginUser = (creds) => {
  return (dispatch) => {
    dispatch(requestLogin(creds));
    return axios.get(`http://localhost:8082/api/login/${creds.username}/${creds.password}`)
      .then((response) => {
        console.log('what is the response that we are getting right here? ', response)
        if (!response.data) {
          dispatch(loginError('Bad Request...'));
          return Promise.reject(response);
        }
        AsyncStorage.setItem('id_token', response.data.id_token);
        console.log('what is in the AsynStorage? ', AsyncStorage)
        dispatch(receiveLogin(response.data));
        Actions.todo();
      })
      .catch((err) => {
        console.log('Error: ', err);
      });
  };
};

exports.signupUser = (creds) => {
  const body = {
    username: creds.username,
    password: creds.password,
  };
  return (dispatch) => {
    dispatch(requestLogin(creds));
    return axios.post('http://localhost:8082/api/addUser')
      .then((response) => {
        console.log('what is the response? ', response.data)
        AsyncStorage.setItem('id_token', response.data.id_token);
        dispatch(receiveLogin(response.data));
        Actions.login();
      })
      .catch((err) => {
        console.log('Error: ', err);
      });
  };
};

exports.logoutUser = () => {
  return (dispatch) => {
    dispatch(requestLogout());
    AsyncStorage.removeItem('id_token');
    dispatch(receiveLogout());
    Actions.login();
  };
};