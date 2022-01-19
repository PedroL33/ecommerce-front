import React, { useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from '../styles/nav.module.css';
import Cart from './cart';
import SearchMenu from './searchmenu';
import { useSelector } from 'react-redux';
import { CSSTransition } from "react-transition-group";
import { checkAuth } from '../functions/authHelpers';

function Nav(props) {

  const cart = useSelector(state => state.cart);
  const shopButtonRef = useRef(null);
  const cartButtonRef = useRef(null);
  const currentLocation = useLocation();
  const [showMenu, setShowMenu] = useState(false);

  function logout() {
    localStorage.removeItem('authentication');
  }

  return(
    <div className={styles.container}>
      <div className={styles.shop}>
        <CSSTransition in={showMenu} mountOnEnter unmountOnExit classNames='shopMenu' timeout={500} >
          <SearchMenu button={shopButtonRef} setShowMenu={setShowMenu} showMenu={showMenu} />
        </CSSTransition>
      </div>
      <div className={styles.nav}>
        <Link to="/" className={styles.logo}>
          E-commerce
        </Link>
        <div className={styles.right}>
          {!checkAuth() ? 
            <Link to="/Login" className={styles.accountLink}><i className="fas fa-user-alt"></i></Link>:
            <Link to="/user" className={`${styles.accountLink} ${styles.active}`}><i className="fas fa-user-alt"></i></Link>
          }
          <div className={styles.shopLink} ref={shopButtonRef} onClick={()=> setShowMenu(true)}>
            <i className="fas fa-search"></i>
          </div>
          {currentLocation.pathname !== "/checkout" && 
            <div className={styles.cartButton} onClick={()=>props.setShowCart(true)} ref={cartButtonRef}>
              <i className="fas fa-shopping-cart"></i>  
              {cart && cart.length ? <div className={styles.cartCount}>{cart.map(item=>item.quantity).reduce((x,y) => x+y, 0)}</div>: null}
            </div>  
          } 
        </div>
      </div>
      <CSSTransition in={props.showCart} mountOnEnter unmountOnExit classNames='cart' timeout={300} >
        <Cart button={cartButtonRef} notificationRef={props.notificationRef} showCart={props.showCart} setShowCart={props.setShowCart} />
      </CSSTransition>
    </div>
  )
}

export default Nav;