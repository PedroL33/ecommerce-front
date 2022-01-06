import * as actions from '../';

export function loadSearchProducts(value) {
  return function(dispatch) {
    dispatch(actions.searchProductsRequest())
    fetch(`http://localhost:3000/products/search/${value}`, {
      method: "GET"
    })
    .then(res => res.json())
    .then(products => {
      setTimeout(() => dispatch(actions.searchProductsSuccess(products)), 500)
    })
    .catch(err => dispatch(actions.searchProductsError([err])))
  }
}

export function loadResults(type, value) {
  return function(dispatch) {
    dispatch(actions.resultsRequest())
    fetch(`http://localhost:3000/products/${type}/${value}`, {
      method: "GET"
    })
    .then(res => res.json())
    .then(products => {
      setTimeout(() => dispatch(actions.resultsSuccess(products)), 1000)
    })
    .catch(err => dispatch(actions.resultsError(err)))
  }
}

export function loadProductById(id) {
  return function(dispatch) {
    dispatch(actions.singleProductRequest());
    fetch(`http://localhost:3000/products/${id}`, {
      method: "GET"
    })
    .then(res => res.json())
    .then(product => {
      setTimeout(() => dispatch(actions.singleProductSuccess(product)), 1000);
    })
    .catch(err => dispatch(actions.singleProductError(err)), 1000);
  }
}