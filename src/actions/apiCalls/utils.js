export const handleErrors = (res) => {
  if(!res.ok) {
    return res.json().then(body => {
      throw new Error(body.msg);
    })
  }else {
    return res.json();
  }
}