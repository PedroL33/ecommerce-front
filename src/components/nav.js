import React, {useState, useEffect, useRef} from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/nav.module.css';
import Cart from './cart';
import SearchMenu from './searchmenu';
import { useDispatch, useSelector } from 'react-redux';
import { showCart, hideCart } from '../actions';

function Nav() {

  const dispatch = useDispatch();
  const cart = useSelector(state => state.showCart);

  const [showShop, setShowShop] = useState(false);
  const shopRef = useRef(null);
  const menuRef = useRef(null);
  const cartButtonRef = useRef(null);

  useEffect(() => {
    function handleOutsideClick(e) {
      if(shopRef.current && !shopRef.current.contains(e.target) && menuRef.current && !menuRef.current.contains(e.target)) {
        setShowShop(false);
      }
      if(cartButtonRef.current && !cartButtonRef.current.contains(e.target)) {
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
        <div className={styles.shopLink} ref={shopRef} onClick={()=> setShowShop(!showShop)}>Shop</div>
        <div className={showShop ? `${styles.shopMenu} ${styles.active}` : styles.shopMenu} ref={menuRef}>
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
          <i class="fas fa-shopping-cart"></i>  
        </div>   
      </div>
      <div className={cart ? `${styles.cartContainer} ${styles.active}`: styles.cartContainer}>
        <Cart />
      </div>
    </div>
  )
}

export default Nav;