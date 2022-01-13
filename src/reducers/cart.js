const cart = (state=null, action) => {
  switch(action.type) {
    case "GET_CART_REQUEST":
      return ["loading"];
    case "GET_CART_SUCCESS":
      return action.payload;
    case "CLEAR_CART":
      return [];
    default:
      return state;
  }
}

export default cart;