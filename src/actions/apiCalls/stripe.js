import * as actions from '../';
import { handleErrors } from './utils';
import { store } from '../../';

export const getClientSecret = async (order_details) => {
  return fetch(`http://localhost:3000/stripe/secret`, {
    method: "POST",
    headers: {
      'Authorization': `Bearer: ${localStorage.getItem('cartToken')}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      shipping_address: order_details.shipping_address,
      shipping_method: order_details.shipping
    })
  })
  .then(res => handleErrors(res))
  .catch(err => store.dispatch(actions.setNotification(err.message, 'error')))
}