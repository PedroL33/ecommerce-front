import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from '../styles/cart.module.css';
import { hideCart } from '../actions';

function Cart(props) {

  const dispatch = useDispatch();
  const cartRef = useRef(null);
  const showCart = useSelector(state => state.showCart)

  useEffect(() => {
    function handleOutsideClick(e) {
      if(e.defaultPrevented) return;
      if(cartRef.current && !cartRef.current.contains(e.target) && showCart && !props.button.current.contains(e.target)) {
        dispatch(hideCart());
      }
    }
    window.addEventListener('click', handleOutsideClick);
    return () => {
      window.removeEventListener('click', handleOutsideClick);
    }
  })

  return(
    <div className={styles.container} ref={cartRef}>
      cart
    </div>
  )
}

export default Cart;