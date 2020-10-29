const checkoutInfo = (state={}, action) => {
  switch(action.type) {
    case "SET_CONTACT":
      return {...state, "contact": action.payload}
    case "SET_SHIPPING":
      return {...state, "shipping": action.payload}
    case "SET_ORDER":
      return {...state, "order": action.payload}
    case "CLEAR_CHECKOUT":
      return {};
    default:
      return state;
  }
}

export default checkoutInfo;