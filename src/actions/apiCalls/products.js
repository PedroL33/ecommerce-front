import * as actions from '../';
import * as adminActions from '../adminActions';

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

export function loadAllProducts() {
  return function(dispatch) {
    dispatch(adminActions.loadProductsRequest())
    fetch('http://localhost:3000/products', {
      method: "GET"
    })
    .then(res => res.json())
    .then(products => {
      dispatch(adminActions.loadProductsSuccess(products))
    })
    .catch(err => dispatch(adminActions.loadProductsError(err)))
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
    .catch(err => {
      console.log(err)
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
  }
}