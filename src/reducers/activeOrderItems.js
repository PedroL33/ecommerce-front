const activeOrderItems = (state=[], action) => {
  switch(action.type) {
    case "ACTIVE_ORDER_ITEMS_REQUEST":
      return ['loading'];
    case "ACTIVE_ORDER_ITEMS_SUCCESS":
      return action.payload;
    case "CLEAR_ACTIVE_ORDER_ITEMS":
      return [];
    default:
      return state
  }
}

export default activeOrderItems;