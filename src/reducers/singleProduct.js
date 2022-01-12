const singleProduct = (state={}, action) => {
  switch(action.type) {
    case "SINGLE_PRODUCT_REQUEST":
      return {status: "loading"};
    case "SINGLE_PRODUCT_SUCCESS":
      return action.payload
    case "SINGLE_PRODUCT_CLEAR":
      return {};
    default:
      return state
  }
}

export default singleProduct;