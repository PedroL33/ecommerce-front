import { combineReducers } from 'redux';
import products from '../reducers/products';
import searchProducts from '../reducers/searchProducts';
import results from './results';
import singleProduct from './singleProduct';
import cart from './cart';
import notification from './notification';
import loginErrors from './loginErrors';
import signupErrors from './signupErrors';
import activeOrders from './activeOrders';
import activeOrderItems from './activeOrderItems';

const rootReducer = combineReducers({
  products,
  searchProducts,
  results,
  singleProduct,
  cart,
  notification,
  loginErrors,
  signupErrors,
  activeOrders, 
  activeOrderItems,
});

export default rootReducer;