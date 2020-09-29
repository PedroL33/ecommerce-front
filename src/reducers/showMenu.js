const showMenu = (state=false, action) => {
  switch(action.type) {
    case "SHOW_MENU":
      return true;
    case "HIDE_MENU":
      return false;
    default:
      return state;
  }
}

export default showMenu;