import React, { Component } from 'react';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import { AppRegistry } from 'react-native';
import App from './src/containers/App';
import rootReducer from './src/reducers/index';

// Disabled logger so the application won't lag as hard
// const logger = createLogger({});

// Applying middleware and creating store
const middleWare = [thunk]
const createStoreWithMiddleWare = applyMiddleware(...middleWare)(createStore);

const store = createStoreWithMiddleWare(rootReducer);
  console.disableYellowBox = true;

// Most parent component of the application, AppRegistry file (similar to regular REACT's ReactDOM.render)
// Applied Provider 
export default class coding_challenge extends Component {
  render() {
    return (
      <Provider store={store}>
        <App />
      </Provider>
    );
  }
}

// Rendering the application on the mobile environment
AppRegistry.registerComponent('coding_challenge', () => coding_challenge);
