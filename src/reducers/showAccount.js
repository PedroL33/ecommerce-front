const showAccount = (state=false, action) => {
  switch(action.type) {
    case "TOGGLE_ACCOUNT":
      return !state;
    case "HIDE_ACCOUNT":
      return false;
    default:
      return state;
  }
}

export default showAccount;