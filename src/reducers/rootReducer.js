import { combineReducers } from 'redux';
import products from '../reducers/products';
import showCart from '../reducers/showCart';
import filteredProducts from '../reducers/filteredProducts';

const rootReducer = combineReducers({
  products,
  showCart,
  filteredProducts
});

export default rootReducer;