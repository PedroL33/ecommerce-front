const paymentStatus = (state={}, action) => {
  switch(action.type) {
    case "PAYMENT_REQUEST":
      return {
        message: "Loading",
        success: false
      }
    case "PAYMENT_SUCCESS":
      return action.payload;
    case "PAYMENT_ERROR":
      return action.payload;
    case "PAYMENT_CLEAR":
      return {}
    default:
      return state;
  }
}

export default paymentStatus;