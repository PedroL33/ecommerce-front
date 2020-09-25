const products = (state = [], action) => {
  switch (action.type) {
    case "PRODUCTS_SUCCESS":
      return action.payload
    case "PRODUCTS_REQUEST":
      return ["loading"]
    case "PRODUCTS_ERROR":
      return action.payload
    default:
      return state;
  }
}

export default products;