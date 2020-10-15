import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/nav.module.css';
import Cart from './cart';
import SearchMenu from './searchmenu';
import { useDispatch, useSelector } from 'react-redux';
import { showMenu, showCart, showAccount, hideAccount } from '../actions';
import { CSSTransition } from "react-transition-group";
import styled from 'styled-components';

const AccountLinks = styled.div`
  background:  #494d5f;
  height: ${props => props.show ? "64px" : "0"};
  opacity: ${props => props.show ? "1" : "0"};
  position: absolute;
  transition: all .5s ease;
  top: 70px;
  width: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 10;
`

function Nav() {

  const dispatch = useDispatch();
  const displayCart = useSelector(state => state.showCart);
  const menu = useSelector(state => state.showMenu);
  const cart = useSelector(state => state.cart);
  const account = useSelector(state => state.showAccount);

  const shopButtonRef = useRef(null);
  const cartButtonRef = useRef(null);
  const accountButtonRef = useRef(null);

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

  return(
    <div className={styles.container}>
      <div className={styles.shop}>
        <div className={styles.shopLink} ref={shopButtonRef} onClick={()=> dispatch(showMenu())}>
          <i class="fas fa-search"></i>
        </div>
        <CSSTransition in={menu} mountOnEnter unmountOnExit classNames='shopMenu' timeout={500} >
          <SearchMenu button={shopButtonRef} />
        </CSSTransition>
      </div>
      <Link to="/" className={styles.logo}>
        <i className="fas fa-store"></i>
      </Link>
      <div className={styles.nav}>
        <div className={styles.account}>
          <div className={styles.accountButton} ref={accountButtonRef} onClick={()=>dispatch(showAccount())}>
            <i className="fas fa-user-alt"></i>
          </div>
          <AccountLinks show={account}>
            <Link to="/Login" className={styles.accountLink}>Login</Link>
            <Link to="/Signup" className={styles.accountLink}>Signup</Link>
          </AccountLinks>
        </div>
        <div className={styles.cartButton} onClick={()=>dispatch(showCart())} ref={cartButtonRef}>
          <i className="fas fa-shopping-cart"></i>  
          {cart.length > 0 && <div className={styles.cartCount}>{cart.map(item=>item.count).reduce((x,y) => x+y)}</div>}
        </div>   
      </div>
      <CSSTransition in={displayCart} mountOnEnter unmountOnExit classNames='cart' timeout={300} >
        <Cart button={cartButtonRef} />
      </CSSTransition>
    </div>
  )
}

export default Nav;