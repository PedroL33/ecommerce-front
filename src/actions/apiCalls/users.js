import * as actions from '../';

export function login(username, password, history) {
  return function(dispatch) {
    fetch('https://mysterious-crag-36502.herokuapp.com/login', {
      method: "POST",
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        username: username,
        password: password
      })
    })
    .then(res => res.json())
    .then(data => {
      if(data.token) {
        localStorage.setItem("authentication", data.token)
        history.push('/user')
      }else {
        dispatch(actions.setLoginErrors(data.msg));
      }
    })
    .catch(err => {
      console.log(err)
    })
  }
}