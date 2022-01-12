const notification = (state={}, action) => {
  switch(action.type) {
    case "SET_NOTIFICATION":
      return {
        status: action.status,
        message: action.payload
      };
    case "CLEAR_NOTIFICATION":
      return {};
    default:
      return state;
  }
}

export default notification;