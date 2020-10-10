import { combineReducers } from 'redux';
import products from '../reducers/products';
import showCart from '../reducers/showCart';
import searchProducts from '../reducers/searchProducts';
import showMenu from '../reducers/showMenu';
import results from './results';
import singleProduct from './singleProduct';

const rootReducer = combineReducers({
  products,
  showCart,
  showMenu,
  searchProducts,
  results,
  singleProduct
});

export default rootReducer;