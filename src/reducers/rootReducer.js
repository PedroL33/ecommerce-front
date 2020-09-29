import { combineReducers } from 'redux';
import products from '../reducers/products';
import showCart from '../reducers/showCart';
import filteredProducts from '../reducers/filteredProducts';
import showMenu from '../reducers/showMenu';

const rootReducer = combineReducers({
  products,
  showCart,
  showMenu,
  filteredProducts
});

export default rootReducer;