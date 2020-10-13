const cart = (state=[], action) => {
  switch(action.type) {
    case "ADD_CART":
      return updateCart(state, action.payload, true);
    case "REMOVE_CART":
      return updateCart(state, action.payload, false);
    case "CLEAR_CART":
      return [];
    default:
      return state;
  }
}

function updateCart(cart, product, add) {
  let item = cart.find((item) => item._id === product._id)
  const index = item ? cart.indexOf(item): null;
  if(add) {
    if(item) {
      item.quantity += 1;
      return [...cart.slice(index, 1, item)]
    }else {
      item= {...product, quantity: 1};
      return [...cart, item]
    }
  }else {
    cart.splice(index, 1)
    return [...cart]
  }
}

export default cart;