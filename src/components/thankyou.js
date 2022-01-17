import React from 'react';
import styles from '../styles/thankyou.module.css';
import { Link } from 'react-router-dom';

function Thankyou() {

  const info = localStorage.getItem('contact');

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.thankyou}>Thank you for your order.</div>
        <div className={styles.message}>Tracking details and more information will be sent to {info.email} within the business day.</div>
        <div className={styles.deals}>
          Consider <Link className={styles.signupLink} to="/signup">Signing Up</Link> to recieve information on sales and other promotional deals.
        </div>
        <Link to="/" className={styles.returnButton}>Return to site</Link>
      </div>
    </div>
  )
}

export default Thankyou;