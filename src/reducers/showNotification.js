const showNotification = (state=false, action) => {
  switch(action.type) {
    case "SHOW_NOTIFICATION":
      return true;
    case "HIDE_NOTIFICATION":
      return false;
    default:
      return state;
  }
}

export default showNotification;