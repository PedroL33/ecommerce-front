import React from 'react';
import styles from '../styles/signup.module.css';
import {Link} from 'react-router-dom';

function Signup() {
  return (
    <div className={styles.container}>
      <div>Signup will be available soon.</div>
      <Link to="/">Return home.</Link>
    </div>
  )
}

export default Signup;