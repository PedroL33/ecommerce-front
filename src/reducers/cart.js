const cart = (state=[], action) => {
  switch(action.type) {
    case "ADD_CART":
      return updateCart(state, action.payload, "add");
    case "REMOVE_CART":
      return updateCart(state, action.payload, "remove");
    case "REMOVE_ALL_CART":
      return updateCart(state, action.payload, "remove-all")
    case "CLEAR_CART":
      return [];
    default:
      return state;
  }
}

function updateCart(cart, product, type) {
  let item = cart.find((item) => item._id === product._id)
  const index = item ? cart.indexOf(item): null;
  if(type==="add") {
    if(index !== null) {
      item.count += 1;
      cart.splice(index, 1, item)
      return [...cart]
    }else {
      item = {...product, count: 1};
      return [...cart, item]
    }
  }else if(type==="remove") {
    if(index!==null && item.count > 1) {
      item.count -= 1;
      cart.splice(index, 1, item)
      return [...cart]
    }else {
      cart.splice(index, 1)
      return [...cart]
    }
  }else {
    cart.splice(index, 1)
    return [...cart]
  }
}

export default cart;