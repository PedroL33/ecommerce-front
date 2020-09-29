import React, {useEffect, useRef} from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/nav.module.css';
import Cart from './cart';
import SearchMenu from './searchmenu';
import { useDispatch, useSelector } from 'react-redux';
import { showCart, hideCart, showMenu, hideMenu, filteredProductsClear } from '../actions';

function Nav() {

  const dispatch = useDispatch();
  const cart = useSelector(state => state.showCart);
  const menu = useSelector(state => state.showMenu);

  const shopButtonRef = useRef(null);
  const shopMenuRef = useRef(null);
  const cartButtonRef = useRef(null);
  const cartMenuRef = useRef(null);

  useEffect(() => {
    function handleOutsideClick(e) {
      if(shopButtonRef.current && !shopButtonRef.current.contains(e.target) && shopMenuRef.current && !shopMenuRef.current.contains(e.target) && menu) {
        dispatch(hideMenu());
        dispatch(filteredProductsClear())
      }
      if(cartButtonRef.current && !cartButtonRef.current.contains(e.target) && cartMenuRef.current && !cartMenuRef.current.contains(e.target) && cart) {
        dispatch(hideCart());
      }
    }
    window.addEventListener('click', handleOutsideClick);
    return () => {
      window.removeEventListener('click', handleOutsideClick);
    }
  })

  return(
    <div className={styles.container}>
      <div className={styles.shop}>
        <div className={styles.shopLink} ref={shopButtonRef} onClick={()=> dispatch(showMenu())}>Shop</div>
        <div className={menu ? `${styles.shopMenu} ${styles.active}` : styles.shopMenu} ref={shopMenuRef}>
          <SearchMenu />
        </div>
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
        <div className={styles.cart} onClick={()=>dispatch(showCart())} ref={cartButtonRef}>
          <i className="fas fa-shopping-cart"></i>  
        </div>   
      </div>
      <div className={cart ? `${styles.cartContainer} ${styles.active}`: styles.cartContainer} ref={cartMenuRef}>
        <Cart />
      </div>
    </div>
  )
}

export default Nav;