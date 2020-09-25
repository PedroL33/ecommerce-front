const showCart = (state=false, action) => {
  switch(action.type) {
    case "SHOW_CART":
      return true;
    case "HIDE_CART":
      return false;
    default:
      return state;
  }
}

export default showCart;