import * as adminActions from '../adminActions';
import * as actions from '../';
import { handleErrors } from './utils';

export function getActiveOrders() {
  return function(dispatch) {
    dispatch(adminActions.activeOrdersRequest()) 
    fetch("https://mysterious-crag-36502.herokuapp.com/orders/pending", {
      method: "GET",
      headers: {
        Authorization: `Bearer: ${localStorage.getItem("authentication")}`
      }
    })
    .then(res => handleErrors(res))
    .then(data => {
        dispatch(adminActions.activeOrdersSuccess(data))
    })
    .catch(err => {
      dispatch(actions.setNotification(err.message, 'error'));
    })
  }
}

export function getActiveOrderItems(id) {
  return function(dispatch) {
    dispatch(adminActions.activeOrderItemsRequest());
    fetch(`https://mysterious-crag-36502.herokuapp.com/orders/items/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer: ${localStorage.getItem("authentication")}`
      }
    })
    .then(res => handleErrors(res))
    .then(data => {
      dispatch(adminActions.activeOrderItemsSuccess(data))
    })
    .catch(err => {
      dispatch(actions.setNotification(err.message, 'error'))
    })
  }
}