import * as actions from '../';
import { handleErrors } from './utils';

export function getCart() {
  return function(dispatch) {
    fetch("http://localhost:3000/carts", {
      method: "GET",
      headers: {
        'Authorization': `Bearer: ${localStorage.getItem('cartToken')}`
      }
    })
    .then(res => handleErrors(res))
    .then(data => {
      dispatch(actions.getCartSuccess(data))
    })
    .catch(err => {
      console.log(err)
      dispatch(actions.setNotification(err.message, "error"));
    })
  }
}

export function createCart() {
  return function(dispatch) {
    fetch("http://localhost:3000/carts", {
      method: "POST"
    })
    .then(res => handleErrors(res))
    .then(data => {
      localStorage.setItem('cartToken', data.token);
      dispatch(getCart(data.token));
    })
    .catch(err => {
      dispatch(actions.setNotification(err.message, "error"));
    })
  }
}

export function createCartItem(product, quantity) {
  return function(dispatch) {
    fetch("http://localhost:3000/cart_items", {
      method: "POST",
      headers: {
        'Authorization': `Bearer: ${localStorage.getItem('cartToken')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        quantity,
        product
      })
    })
    .then(res => handleErrors(res))
    .then(data => {
      dispatch(getCart(localStorage.getItem('cartToken')));
    })
    .catch(err => {
      dispatch(actions.setNotification(err.message, "error"))
    })
  }
}

export function updateCartItem(product_id, quantity) {
  return function(dispatch) {
    fetch("http://localhost:3000/cart_items", {
      method: "PUT",
      headers: {
        'Authorization': `Bearer: ${localStorage.getItem('cartToken')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        quantity,
        product_id
      })
    })
    .then(res => handleErrors(res))
    .then(data => {
      dispatch(getCart(localStorage.getItem('cartToken')));
    })
    .catch(err => {
      dispatch(actions.setNotification(err.message, 'error'));
    })
  }
}

export function deleteCartItem(product_id) {
  return function(dispatch) {
    fetch('http://localhost:3000/cart_items', {
      method: "DELETE",
      headers: {
        'Authorization': `Bearer: ${localStorage.getItem('cartToken')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        product_id
      })
    })
    .then(res => handleErrors(res))
    .then(data => {
      dispatch(getCart(localStorage.getItem('cartToken')));
    })
    .catch(err => {
      dispatch(actions.setNotification(err.message, 'error'));
    })
  }
}