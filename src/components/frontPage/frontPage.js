import React from 'react';
import styles from '../../styles/frontpage.module.css';
import { Link } from 'react-router-dom';

function FrontPage() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.greeting}>
          <div className={styles.greetingMsg}>
            Welcome to your one stop shop for items, things, and gadgets.
          </div>
        </div>
        <div className={styles.deal}>
          <div className={styles.msgContainer}>
            <div className={styles.dealMsg}>
              Recieve 15% off your first order when you sign up as a member.
            </div>
            <button className={styles.signupButton}>
              Sign Up!
            </button>
          </div>
        </div>
      </div>
      <div className={styles.categoryContainer}>
        <div className={styles.category} style={{backgroundImage: `url(${window.location.origin + '/images/things.jpg'})`}}>
          <div className={styles.categoryContent}>
            <Link className={styles.categoryLink} to="/category/things">Shop Things</Link>
          </div>
        </div>
        <div className={styles.category} style={{backgroundImage: `url(${window.location.origin + '/images/items.jpg'})`}}>
          <div className={styles.categoryContent}>
            <Link className={styles.categoryLink} to="/category/items">Shop Items</Link>
          </div>
        </div>
        <div className={styles.category} style={{backgroundImage: `url(${window.location.origin + '/images/gadgets.jpg'})`}}>
          <div className={styles.categoryContent}>
            <Link className={styles.categoryLink} to="/category/gadgets">Shop Gadgets</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FrontPage;