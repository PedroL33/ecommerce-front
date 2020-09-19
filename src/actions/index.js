export function loadProductsSuccess(response) {
  return {
    type: "GET_PRODUCTS",
    payload: response
  }
}

export function loadProductsRequest() {
  return {
    type: "REQUEST_PRODUCTS",
  }
}

export function loadProductsError(error) {
  return {
    type: "ERROR_PRODUCTS",
    payload: error
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