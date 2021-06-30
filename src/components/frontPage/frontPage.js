import React from 'react';
import styles from '../../styles/frontpage.module.css';
import { Link } from 'react-router-dom';

function FrontPage() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.title}>E-commerce</div>
        <div className={styles.desc}>An online store.</div>
        <Link to="/Login" className={styles.action}>Sign up now!</Link>
        <svg xmlns="http://www.w3.org/2000/svg" width="100%" preserveAspectRatio="none" viewBox="0 0 1440 300"><path fill="#cd5554" fill-opacity="1" d="M0,128L60,128C120,128,240,128,360,154.7C480,181,600,235,720,224C840,213,960,139,1080,128C1200,117,1320,171,1380,197.3L1440,224L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"></path></svg>
      </div>
      <div className={styles.greeting}>
        <div>Check out what we have!</div>
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