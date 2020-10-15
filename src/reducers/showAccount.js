const showAccount = (state=false, action) => {
  switch(action.type) {
    case "SHOW_ACCOUNT":
      return true;
    case "HIDE_ACCOUNT":
      return false;
    default:
      return state;
  }
}

export default showAccount;