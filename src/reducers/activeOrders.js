const activeOrders = (state=[], action) => {
  switch(action.type) {
    case "ACTIVE_ORDERS_REQUEST":
      return ["loading"];
    case "ACTIVE_ORDERS_SUCCESS":
      return action.payload;
    case "ACTIVE_ORDERS_ERROR":
      return action.payload;
    default:
      return state;
  }
}

export default activeOrders;