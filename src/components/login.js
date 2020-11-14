import React, { useState, useEffect } from 'react';
import { login, clearLoginErrors } from '../actions';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import styles from '../styles/login.module.css';

function Login() {

  const dispatch = useDispatch();
  const history = useHistory();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const error = useSelector(state => state.loginErrors)

  useEffect(() => {
    return ()=> {
      dispatch(clearLoginErrors());
    }
  }, [dispatch])

  async function handleClick() {
    if(password.length && username.length) {
      dispatch(login(username, password, history));
      setUsername("");
      setPassword("");
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.loginForm}>
        <div className={styles.formTitle}>
          Login
          {error && <span className={styles.formError}>{error}</span>}  
        </div>
        <input className={styles.userInput} type="text" placeholder="Username" value={username} onChange={(e)=>setUsername(e.target.value)}></input>
        <input className={styles.userInput} type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)}></input>
        <button disabled={username.length && password.length ? false : true} className={styles.submitBtn} onClick={handleClick}>Login</button>
      </div>
    </div>
  )
}

export default Login