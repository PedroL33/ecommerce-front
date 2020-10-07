const searchProducts = (state=[], action) => {
  switch(action.type) {
    case "SEARCH_PRODUCTS_REQUEST": 
      return ["loading"];
    case "SEARCH_PRODUCTS_ERROR":
      return action.payload
    case "SEARCH_PRODUCTS_SUCCESS":
      return action.payload
    case "SEARCH_PRODUCTS_CLEAR":
      return [];
    default:
      return state
  }
}

export default searchProducts;