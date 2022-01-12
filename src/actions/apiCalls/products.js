import * as actions from '../';
import * as adminActions from '../adminActions';
import { handleErrors } from './utils';

export function loadSearchProducts(value) {
  return function(dispatch) {
    dispatch(actions.searchProductsRequest())
    fetch(`http://localhost:3000/products/search/${value}`, {
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
    fetch(`http://localhost:3000/products/${type}/${value}`, {
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
    fetch(`http://localhost:3000/products/${id}`, {
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
    fetch('http://localhost:3000/products', {
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
    fetch(`http://localhost:3000/products/${id}`, {
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
    await fetch(`http://localhost:3000/products/uploadPhoto/${id}`, {
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