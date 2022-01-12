const results = (state=[], action) => {
  switch(action.type) {
    case "RESULTS_REQUEST":
      return ["loading"];
    case "RESULTS_SUCCESS":
      return action.payload;
    case "CLEAR_RESULTS":
      return [];
    case "SORT_RESULTS":
      return [...state.sort(compare(action.field, action.order))]
    default:
      return state;
  }
}

function compare(field, order) {
  return (a, b) => {
    const fieldA = order ? a[field] : b[field];
    const fieldB = order ? b[field] : a[field];
    if (fieldA > fieldB) {
      return 1;
    } else if (fieldA < fieldB) {
      return -1;
    }
  }
}

export default results;