import jwt_decode from "jwt-decode";

export function checkAuth() {
  const token = localStorage.getItem("authentication")
  try {
    const decoded = jwt_decode(token)
    if(decoded.exp > Date.now()/1000) {
      return true;
    }
  }
  catch {
    return false;
  }
  return false;
}

