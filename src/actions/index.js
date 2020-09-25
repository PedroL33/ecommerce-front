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
export function loadFilteredProductsSuccess(response) {
  return {
    type: "FILTERED_PRODUCTS_SUCCESS",
    payload: response
  }
}

export function loadFilteredProductsRequest() {
  return {
    type: "FILTERED_PRODUCTS_REQUEST"
  }
}

export function loadFilteredProductsError(error) {
  return {
    type: "FILTERED_PRODUCTS_ERROR",
    payload: error
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

export function loadFilteredProducts(filter) {
  return function(dispatch, getState) {
    dispatch(loadFilteredProductsRequest())
    fetch(`http://localhost:3000/products/filter/${filter}`, {
      method: "GET"
    })
    .then(res => res.json())
    .then(products => dispatch(loadFilteredProductsSuccess(products)))
    .catch(err => dispatch(loadFilteredProductsError(err)))
  }
}