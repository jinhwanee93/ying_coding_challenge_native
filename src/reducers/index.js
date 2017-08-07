import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';


// Combining the Reducers
const RootReducer = combineReducers({
  auth: AuthReducer
})

export default RootReducer;