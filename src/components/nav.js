import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/nav.module.css';
import Cart from './cart';
import SearchMenu from './searchmenu';
import { useDispatch, useSelector } from 'react-redux';
import { showCart, showMenu } from '../actions';
import { CSSTransition } from "react-transition-group";

function Nav() {

  const dispatch = useDispatch();
  const cart = useSelector(state => state.showCart);
  const menu = useSelector(state => state.showMenu);

  const shopButtonRef = useRef(null);
  const cartButtonRef = useRef(null);

  return(
    <div className={styles.container}>
      <div className={styles.shop}>
        <div className={styles.shopLink} ref={shopButtonRef} onClick={()=> dispatch(showMenu())}>Shop</div>
        <CSSTransition in={menu} mountOnEnter unmountOnExit classNames='shopMenu' timeout={500} >
          <SearchMenu button={shopButtonRef} />
        </CSSTransition>
      </div>
      <Link to="/" className={styles.logo}>
        <i className="fas fa-store"></i>
        <div className={styles.logoName}>Ecommerce</div>
      </Link>
      <div className={styles.nav}>
        <div className={styles.account}>
          <div className={styles.accountButton}>Account</div>
          <div className={styles.accountLinks}>
            <Link to="/Login" className={styles.accountLink}>Login</Link>
            <Link to="/Signup" className={styles.accountLink}>Signup</Link>
          </div>
        </div>
        <div className={styles.cartButton} onClick={()=>dispatch(showCart())} ref={cartButtonRef}>
          <i className="fas fa-shopping-cart"></i>  
        </div>   
      </div>
      <CSSTransition in={cart} mountOnEnter unmountOnExit classNames='cart' timeout={300} >
        <Cart button={cartButtonRef} />
      </CSSTransition>
    </div>
  )
}

export default Nav;