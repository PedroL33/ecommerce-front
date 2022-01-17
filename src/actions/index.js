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

export function getCartRequest() {
  return {
    type: "GET_CART_REQUEST"
  }
}

export function getCartSuccess(cart) {
  return {
    type: "GET_CART_SUCCESS",
    payload: cart
  }
}

export function clearCart() {
  return {
    type: "CLEAR_CART"
  }
}

// Notifications

export function setNotification(message, status) {
  return {
    type: "SET_NOTIFICATION",
    payload: message, 
    status: status
  }
}

export function clearNotification() {
  return {
    type: "CLEAR_NOTIFICATION"
  }
}

// Account buttons

export function toggleAccount() {
  return {
    type: "TOGGLE_ACCOUNT"
  }
}

export function hideAccount() {
  return {
    type: "HIDE_ACCOUNT"
  }
}


export function clearCheckout() {
  return {
    type: "CLEAR_CHECKOUT"
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