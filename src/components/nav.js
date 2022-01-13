import React, { useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from '../styles/nav.module.css';
import Cart from './cart';
import SearchMenu from './searchmenu';
import { useDispatch, useSelector } from 'react-redux';
import { showMenu, showCart, toggleAccount, hideAccount } from '../actions';
import { CSSTransition } from "react-transition-group";
import styled from 'styled-components';
import { checkAuth } from '../functions/authHelpers';

const AccountLinks = styled.div`
  background:  #494d5f;
  height: ${props => props.show ? "64px" : "0"};
  transform: ${props => props.show ? "scale(1)": "scale(0)"};
  position: absolute;
  transition: all .5s ease;
  top: 60px;
  width: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 10;
`

function Nav(props) {

  const dispatch = useDispatch();
  const displayCart = useSelector(state => state.showCart);
  const menu = useSelector(state => state.showMenu);
  const cart = useSelector(state => state.cart);
  const account = useSelector(state => state.showAccount);
  const shopButtonRef = useRef(null);
  const cartButtonRef = useRef(null);
  const accountButtonRef = useRef(null);
  const currentLocation = useLocation();

  useEffect(() => {
    function handleOutsideClick(e) {
      if(!accountButtonRef.current.contains(e.target) && account) {
        dispatch(hideAccount())
      }
    }
    window.addEventListener('click', handleOutsideClick)
    return () => {
      window.removeEventListener('click', handleOutsideClick)
    }
  })

  function logout() {
    localStorage.removeItem('authentication');
  }

  return(
    <div className={styles.container}>
      <div className={styles.shop}>
        <CSSTransition in={menu} mountOnEnter unmountOnExit classNames='shopMenu' timeout={500} >
          <SearchMenu button={shopButtonRef} />
        </CSSTransition>
      </div>
      <div className={styles.nav}>
        <Link to="/" className={styles.logo}>
          E-commerce
        </Link>
        <div className={styles.right}>
          <div className={styles.account}>
            <div className={styles.accountButton} ref={accountButtonRef} onClick={()=>dispatch(toggleAccount())}>
              <i className="fas fa-user-alt"></i>
            </div>
            {!checkAuth() ? 
              <AccountLinks show={account}>
                <Link to="/Login" className={styles.accountLink}>Login</Link>
                <Link to="/Signup" className={styles.accountLink}>Signup</Link>
              </AccountLinks>:
              <AccountLinks show={account}>
                <Link to="/user" className={styles.accountLink}>Home</Link>
                <Link to="/" className={styles.accountLink} onClick={logout}>Logout</Link>
              </AccountLinks>
            }
          </div>
          <div className={styles.shopLink} ref={shopButtonRef} onClick={()=> dispatch(showMenu())}>
            <i className="fas fa-search"></i>
          </div>
          {currentLocation.pathname !== "/checkout" && 
            <div className={styles.cartButton} onClick={()=>dispatch(showCart())} ref={cartButtonRef}>
              <i className="fas fa-shopping-cart"></i>  
              {cart && cart.length ? <div className={styles.cartCount}>{cart.map(item=>item.quantity).reduce((x,y) => x+y, 0)}</div>: null}
            </div>  
          } 
        </div>
      </div>
      <CSSTransition in={displayCart} mountOnEnter unmountOnExit classNames='cart' timeout={300} >
        <Cart button={cartButtonRef} notificationRef={props.notificationRef} />
      </CSSTransition>
    </div>
  )
}

export default Nav;