import { combineReducers } from 'redux';
import firstReducer from './first_reducer';

const rootReducer = combineReducers({
  first: firstReducer,
});

export default rootReducer;
