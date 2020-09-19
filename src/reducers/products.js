const products = (state = [], action) => {
  switch (action.type) {
    case "GET_PRODUCTS":
      return action.payload
    case "REQUEST_PRODUCTS":
      return ["loading"]
    case "ERROR_PRODUCTS":
      return action.payload
    default:
      return state;
  }
}

export default products;