export function activeOrdersRequest() {
  return {
    type: "ACTIVE_ORDERS_REQUEST"
  }
}

export function activeOrdersError(error) {
  return {
    type: "ACTIVE_ORDERS_ERROR",
    payload: error
  }
}

export function activeOrdersSuccess(orders) {
  return {
    type: "ACTIVE_ORDERS_SUCCESS",
    payload: orders
  }
}

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

export function clearProducts() {
  return {
    type: "CLEAR_PRODUCTS"
  }
}

export function getActiveOrders(history) {
  return function(dispatch) {
    dispatch(activeOrdersRequest()) 
    fetch("https://mysterious-crag-36502.herokuapp.com/orders/active", {
      method: "get",
      headers: {
        Authorization: `Bearer: ${localStorage.getItem("authentication")}`
      }
    })
    .then(res => res.json())
    .then(data => {
      if(data.error) {
        dispatch(activeOrdersError([data]))
        history.push('/login')
      }else {
        dispatch(activeOrdersSuccess(data))
      }
    })
    .catch(err => {
      dispatch(activeOrdersError(err));
    })
  }
}

export function loadProducts() {
  return function(dispatch) {
    dispatch(loadProductsRequest())
    fetch('https://mysterious-crag-36502.herokuapp.com/products', {
      method: "GET"
    })
    .then(res => res.json())
    .then(products => {
      dispatch(loadProductsSuccess(products))
    })
    .catch(err => dispatch(loadProductsError(err)))
  }
}

export function updateProducts(id, newProduct) {
  return function(dispatch) {
    fetch(`https://mysterious-crag-36502.herokuapp.com/products/update/${id}`, {
      method: "POST", 
      headers: {
        'Authorization': `Bearer: ${localStorage.getItem("authentication")}`,
        'Content-Type': 'application/json'
      }, 
      body: JSON.stringify({
        new_product: newProduct
      })
    })
    .then(res => res.json())
    .then(data => {
      dispatch(loadProducts())
    })
    .catch(err => {
      console.log(err)
    })
  }
}

export function uploadPhoto(id, image) {
  return async function(dispatch) {
    await fetch(`https://mysterious-crag-36502.herokuapp.com/products/uploadPhoto/${id}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer: ${localStorage.getItem("authentication")}`,
      },
      body: image
    })
  }
}

export function completeOrder(id, tracking) {
  return async function(dispatch) {
    await fetch(`https://mysterious-crag-36502.herokuapp.com/orders/update/${id}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer: ${localStorage.getItem("authentication")}`,
      },
      body: JSON.stringify({
        tracking: tracking
      })
    })
    .then(data => console.log(data))
    .catch(err => console.log(err))
  }
}