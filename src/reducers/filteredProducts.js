const filteredProducts = (state=[], action) => {
  switch(action.type) {
    case "FILTERED_PRODUCTS_REQUEST": 
      return ["loading"];
    case "FILTERED_PRODUCTS_ERROR":
      return action.payload
    case "FILTERED_PRODUCTS_SUCCESS":
      return action.payload
    default:
      return state
  }
}

export default filteredProducts;