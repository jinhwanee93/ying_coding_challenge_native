import React, { Component } from 'react';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import { AppRegistry } from 'react-native';
import App from './src/containers/App';
import rootReducer from './src/reducers/index';

// const logger = createLogger({});
const middleWare = [thunk]
const createStoreWithMiddleWare = applyMiddleware(...middleWare)(createStore);

const store = createStoreWithMiddleWare(rootReducer);
  console.disableYellowBox = true;

export default class coding_challenge extends Component {
  render() {
    return (
      <Provider store={store}>
        <App />
      </Provider>
    );
  }
}

AppRegistry.registerComponent('coding_challenge', () => coding_challenge);
