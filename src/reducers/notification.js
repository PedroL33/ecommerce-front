const notification = (state={}, action) => {
  switch(action.type) {
    case("ADD_CART_NOTIFICATION"):
      return {product: action.payload, msg: action.message};
    case("CLEAR_NOTIFICATION"):
      return {};
    default:
      return state;
  }
}

export default notification;