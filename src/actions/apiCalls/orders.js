import * as actions from '../adminActions';

export function getActiveOrders() {
  return function(dispatch) {
    dispatch(actions.activeOrdersRequest()) 
    fetch("http://localhost:3000/orders/pending", {
      method: "GET",
      headers: {
        Authorization: `Bearer: ${localStorage.getItem("authentication")}`
      }
    })
    .then(res => res.json())
    .then(data => {
      if(data.error) {
        dispatch(actions.activeOrdersError([data]))
      }else {
        dispatch(actions.activeOrdersSuccess(data))
      }
    })
    .catch(err => {
      dispatch(actions.activeOrdersError(err));
    })
  }
}

export function getActiveOrderItems(id) {
  return function(dispatch) {
    dispatch(actions.activeOrderItemsRequest());
    fetch(`http://localhost:3000/orders/items/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer: ${localStorage.getItem("authentication")}`
      }
    })
    .then(res => res.json())
    .then(data => {
      dispatch(actions.activeOrderItemsSuccess(data))
    })
    .catch(err => {
      dispatch(actions.activeOrderItemsError(err))
    })
  }
}

export function getOrderDetails() {

}