// Filtered products for searchbar
export function searchProductsSuccess(response) {
  return {
    type: "SEARCH_PRODUCTS_SUCCESS",
    payload: response
  }
}

export function searchProductsRequest() {
  return {
    type: "SEARCH_PRODUCTS_REQUEST"
  }
}

export function searchProductsError(error) {
  return {
    type: "SEARCH_PRODUCTS_ERROR",
    payload: error
  }
}

export function searchProductsClear() {
  return {
    type: "SEARCH_PRODUCTS_CLEAR"
  }
}

// Filtered products for results component

export function resultsRequest() {
  return {
    type: "RESULTS_REQUEST"
  }
}

export function resultsSuccess(products) {
  return {
    type: "RESULTS_SUCCESS",
    payload: products
  }
}

export function resultsError(error) {
  return {
    type: "RESULTS_ERROR",
    payload: error
  }
}

export function clearResults() {
  return {
    type: "CLEAR_RESULTS"
  }
}

export function sortResults(field, order) {
  return {
    type: "SORT_RESULTS",
    field: field,
    order: order
  }
}

// Single product for product detail component

export function singleProductRequest() {
  return {
    type: "SINGLE_PRODUCT_REQUEST"
  }
}

export function singleProductSuccess(product) {
  return {
    type: "SINGLE_PRODUCT_SUCCESS",
    payload: product
  }
}

export function singleProductError(error) {
  return {
    type: "SINGLE_PRODUCT_ERROR",
    payload: error
  }
}

export function singleProductClear() {
  return {
    type: "SINGLE_PRODUCT_CLEAR"
  }
}

// Shop menu

export function showMenu() {
  return {
    type: "SHOW_MENU"
  }
}

export function hideMenu() {
  return {
    type: "HIDE_MENU"
  }
}

// Cart 
export function showCart() {
  return {
    type: "SHOW_CART"
  }
}

export function hideCart() {
  return {
    type: "HIDE_CART"
  }
}

export function addCart(product) {
  return {
    type: "ADD_CART", 
    payload: product
  }
}

export function removeCart(product) {
  return {
    type: "REMOVE_CART",
    payload: product
  }
}

export function removeAllCart(product) {
  return {
    type: "REMOVE_ALL_CART",
    payload: product
  }
}

export function setCart(cart) {
  return {
    type: "SET_CART", 
    payload: cart
  }
}

export function clearCart() {
  return {
    type: "CLEAR_CART"
  }
}

// Notifications

export function addCartNotification(product, message) {
  return {
    type: "ADD_CART_NOTIFICATION",
    payload: product, 
    message: message
  }
}

export function clearNotification() {
  return {
    type: "CLEAR_NOTIFICATION"
  }
}

export function showNotification() {
  return {
    type: "SHOW_NOTIFICATION"
  }
}

export function hideNotification() {
  return {
    type: "HIDE_NOTIFICATION"
  }
}

// Account buttons

export function showAccount() {
  return {
    type: "SHOW_ACCOUNT"
  }
}

export function hideAccount() {
  return {
    type: "HIDE_ACCOUNT"
  }
}

// Checkout information

export function setContact(info) {
  return{
    type: "SET_CONTACT",
    payload: info
  }
}

export function setShipping(info) {
  return {
    type:'SET_SHIPPING',
    payload: info
  }
}

export function setOrder(info) {
  return{
    type:'SET_ORDER',
    payload: info
  }
}

export function clearCheckout() {
  return {
    type: "CLEAR_CHECKOUT"
  }
}

// payment status

export function paymentRequest() {
  return {
    type: "PAYMENT_REQUEST",
  }
}

export function paymentSuccess(details) {
  return {
    type: "PAYMENT_SUCCESS",
    payload: details
  }
}

export function paymentError(details) {
  return {
    type: "PAYMENT_ERROR",
    payload: details
  }
}

export function paymentClear() {
  return {
    type: "PAYMENT_CLEAR"
  }
}

// Authentication

export function setLoginErrors(errors) {
  return {
    type: "SET_LOGIN_ERRORS",
    payload: errors
  }
}

export function clearLoginErrors() {
  return {
    type: "CLEAR_LOGIN_ERRORS"
  }
}

export function setSignupErrors(errors) {
  return {
    type: "SET_LOGIN_ERRORS",
    payload: errors
  }
}

export function clearSignupErrors() {
  return {
    type: "CLEAR_LOGIN_ERRORS"
  }
}

export function loadSearchProducts(type, filter) {
  return function(dispatch) {
    dispatch(searchProductsRequest())
    fetch(`https://mysterious-crag-36502.herokuapp.com/products/${type}/${filter}`, {
      method: "GET"
    })
    .then(res => res.json())
    .then(products => {
      setTimeout(() => dispatch(searchProductsSuccess(products)), 500)
    })
    .catch(err => dispatch(searchProductsError([err])))
  }
}

export function loadResults(type, filter) {
  return function(dispatch) {
    dispatch(resultsRequest())
    fetch(`https://mysterious-crag-36502.herokuapp.com/products/${type}/${filter}`, {
      method: "GET"
    })
    .then(res => res.json())
    .then(products => {
      setTimeout(() => dispatch(resultsSuccess(products)), 1000)
    })
    .catch(err => dispatch(resultsError(err)))
  }
}

export function loadProductById(id) {
  return function(dispatch) {
    dispatch(singleProductRequest());
    fetch(`https://mysterious-crag-36502.herokuapp.com/products/${id}`, {
      method: "GET"
    })
    .then(res => res.json())
    .then(product => {
      setTimeout(() => dispatch(singleProductSuccess(product)), 1000);
    })
    .catch(err => dispatch(singleProductError(err)), 1000);
  }
}

export function makePayment(amount, token, order) {
  return function(dispatch) {
    dispatch(paymentRequest());
    fetch('https://mysterious-crag-36502.herokuapp.com/stripe/charge', {
      method: "POST",
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        amount: amount,
        token: token,
        order: order
      })
    })
    .then(res => res.json())
    .then(data => {
      if(!data.success) {
        dispatch(paymentError(data))
      }else {
        dispatch(paymentSuccess(data))
      }
    })
    .catch(err => dispatch(paymentError(err)));
  }
}

export function login(username, password, history) {
  return function(dispatch) {
    fetch('https://mysterious-crag-36502.herokuapp.com/login', {
      method: "POST",
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        username: username,
        password: password
      })
    })
    .then(res => res.json())
    .then(data => {
      if(data.token) {
        localStorage.setItem("authentication", data.token)
        history.push('/user')
      }else {
        dispatch(setLoginErrors(data.msg));
      }
    })
    .catch(err => {
      console.log(err)
    })
  }
}