import { combineReducers } from 'redux';
import products from '../reducers/products';
import currentUser from '../reducers/currentUser';

const rootReducer = combineReducers({
  products,
  currentUser
});

export default rootReducer;