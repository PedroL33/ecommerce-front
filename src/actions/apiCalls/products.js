import * as actions from '../';
import * as adminActions from '../adminActions';
import { handleErrors } from './utils';

export function loadSearchProducts(value) {
  return function(dispatch) {
    dispatch(actions.searchProductsRequest())
    fetch(`https://mysterious-crag-36502.herokuapp.com/products/search/${value}`, {
      method: "GET"
    })
    .then(res => handleErrors(res))
    .then(products => {
      dispatch(actions.searchProductsSuccess(products))
    })
    .catch(err => dispatch(actions.setNotification(err.message, "error")))
  }
}

export function loadResults(type, value) {
  return function(dispatch) {
    dispatch(actions.resultsRequest())
    fetch(`https://mysterious-crag-36502.herokuapp.com/products/${type}/${value}`, {
      method: "GET"
    })
    .then(res => handleErrors(res))
    .then(products => {
      dispatch(actions.resultsSuccess(products))
    })
    .catch(err => dispatch(actions.setNotification(err.message, "error")))
  }
}

export function loadProductById(id) {
  return function(dispatch) {
    dispatch(actions.singleProductRequest());
    fetch(`https://mysterious-crag-36502.herokuapp.com/products/${id}`, {
      method: "GET"
    })
    .then(res => handleErrors(res))
    .then(product => {
      dispatch(actions.singleProductSuccess(product));
    })
    .catch(err => dispatch(actions.setNotification(err.message, "error")));
  }
}

export function loadAllProducts() {
  return function(dispatch) {
    dispatch(adminActions.loadProductsRequest())
    fetch('https://mysterious-crag-36502.herokuapp.com/products', {
      method: "GET"
    })
    .then(res => handleErrors(res))
    .then(products => {
      dispatch(adminActions.loadProductsSuccess(products))
    })
    .catch(err => dispatch(actions.setNotification(err.message, "error")))
  }
}

export function updateProducts(id, newProduct) {
  return function(dispatch) {
    fetch(`https://mysterious-crag-36502.herokuapp.com/products/${id}`, {
      method: "PUT", 
      headers: {
        'Authorization': `Bearer: ${localStorage.getItem("authentication")}`,
        'Content-Type': 'application/json'
      }, 
      body: JSON.stringify(
        newProduct
      )
    })
    .then(res => handleErrors(res))
    .then(data => {
      dispatch(loadAllProducts());
    })
    .catch(err => {
      dispatch(actions.setNotification(err.message, 'error'))
    })
  }
}


export function uploadPhoto(id, image) {
  return async function(dispatch) {
    await fetch(`https://mysterious-crag-36502.herokuapp.com/products/uploadPhoto/${id}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer: ${localStorage.getItem("authentication")}`,
      },
      body: image
    })
    .then(res => handleErrors(res))
    .catch(err => dispatch(actions.setNotification(err.message, 'error')))
  }
}