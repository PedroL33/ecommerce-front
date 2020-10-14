const cart = (state=[], action) => {
  let updatedCart;
  switch(action.type) {
    case "ADD_CART":
      updatedCart = updateCart(state, action.payload, "add");
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      return updatedCart;
    case "REMOVE_CART":
      updatedCart = updateCart(state, action.payload, "remove");
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      return updatedCart;
    case "REMOVE_ALL_CART":
      updatedCart = updateCart(state, action.payload, "remove-all");
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      return updatedCart;
    case "SET_CART":
      return action.payload;
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