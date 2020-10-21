// All Products
export function loadProductsSuccess(response) {
  return {
    type: "PRODUCTS_SUCCESS",
    payload: response
  }
}

export function loadProductsRequest() {
  return {
    type: "PRODUCTS_REQUEST",
  }
}

export function loadProductsError(error) {
  return {
    type: "PRODUCTS_ERROR",
    payload: error
  }
}

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
  return{
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

export function loadProducts() {
  return function(dispatch, getState) {
    dispatch(loadProductsRequest())
    fetch('http://localhost:3000/products', {
      method: "GET"
    })
    .then(res => res.json())
    .then(products => dispatch(loadProductsSuccess(products)))
    .catch(err => dispatch(loadProductsError(err)))
  }
}

export function loadSearchProducts(type, filter) {
  return function(dispatch, getState) {
    dispatch(searchProductsRequest())
    fetch(`http://localhost:3000/products/${type}/${filter}`, {
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
  return function(dispatch, getState) {
    dispatch(resultsRequest())
    fetch(`http://localhost:3000/products/${type}/${filter}`, {
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
  return function(dispatch, getState) {
    dispatch(singleProductRequest());
    fetch(`http://localhost:3000/products/${id}`, {
      method: "GET"
    })
    .then(res => res.json())
    .then(product => {
      setTimeout(() => dispatch(singleProductSuccess(product)), 1000);
    })
    .catch(err => dispatch(singleProductError(err)), 1000);
  }
}