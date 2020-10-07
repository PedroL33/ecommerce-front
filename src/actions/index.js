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
      dispatch(searchProductsSuccess(products))
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
      dispatch(resultsSuccess(products))
    })
    .catch(err => dispatch(resultsError(err)))
  }
}