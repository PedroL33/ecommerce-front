import React from 'react';
import styles from '../styles/footer.module.css';

function Footer() {
  return (
    <div className={styles.container}>
      <div className={styles.row}>
        <div className={styles.links}>
          <div className={styles.link}>About Us</div>
          <div className={styles.link}>Terms and Conditions</div>
          <div className={styles.link}>Privacy Policy</div>
          <div className={styles.link}>Returns</div>
          <div className={styles.link}>Contact Us</div>
        </div>
        <div className={styles.subscribe}>
          <div className={styles.subscribeMsg}>
            Subscribe!
          </div>
          <form className={styles.subscribeForm}>
            <input className={styles.subscribeInput} type="text" placeholder="email"></input>
            <button className={styles.subscribeButton}><i className="fas fa-arrow-right"></i></button>
          </form>
        </div>
      </div>
      <div className={styles.bottom}>
        © Peter Lee 
      </div>
    </div>
  )
}

export default Footer;