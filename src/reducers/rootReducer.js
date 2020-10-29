import { combineReducers } from 'redux';
import products from '../reducers/products';
import showCart from '../reducers/showCart';
import searchProducts from '../reducers/searchProducts';
import showMenu from '../reducers/showMenu';
import results from './results';
import singleProduct from './singleProduct';
import cart from './cart';
import notification from './notification';
import showNotification from './showNotification';
import showAccount from './showAccount';
import checkoutInfo from './checkoutInfo';
import paymentStatus from './paymentStatus';

const rootReducer = combineReducers({
  products,
  showCart,
  showMenu,
  searchProducts,
  results,
  singleProduct,
  cart,
  notification,
  showNotification, 
  showAccount,
  checkoutInfo,
  paymentStatus
});

export default rootReducer;