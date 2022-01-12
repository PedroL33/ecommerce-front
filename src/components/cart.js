import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from '../styles/cart.module.css';
import { hideCart, setOrder } from '../actions';
import { updateCartItem, deleteCartItem } from '../actions/apiCalls/cart';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { centsToPrice, getSubtotal } from '../functions/priceHelpers';
import { Link } from 'react-router-dom';
import Fade from 'react-reveal/Fade';

function Cart(props) {

  const dispatch = useDispatch();
  const cartRef = useRef(null);
  const showCart = useSelector(state => state.showCart);
  const cartItems = useSelector(state => state.cart);

  useEffect(() => {
    function handleOutsideClick(e) {
      if(e.defaultPrevented) return;
      if(cartRef.current &&
        !cartRef.current.contains(e.target) &&
        showCart && 
        props.button.current && 
        !props.button.current.contains(e.target) &&
        !props.notificationRef.current.contains(e.target)
        ) {
        dispatch(hideCart());
      }
    }
    window.addEventListener('click', handleOutsideClick);
    return () => {
      window.removeEventListener('click', handleOutsideClick);
    }
  })

  function handleClick() {
    dispatch(setOrder(cartItems));
    dispatch(hideCart());
  }

  function removeItem(id, quantity) {
    if(quantity === 1) {
      dispatch(deleteCartItem(id));
    }else {
      dispatch(updateCartItem(id, -1));
    }
  }

  function addItem(id) {
    dispatch(updateCartItem(id, 1));
  }

  function removeAll(id) {
    dispatch(deleteCartItem(id));
  }

  return(
    <div className={styles.container} ref={cartRef}>
      {
        cartItems.length > 0 ?
        <Fade>
          <div className={styles.content}>
            <div className={styles.header}>
              Your cart {` (${cartItems.map(item => item.quantity).reduce((x,y) => x+y)})`}
              <i onClick={() => dispatch(hideCart())} className={`${styles.closeCart} fas fa-times`}></i>
            </div>
            <TransitionGroup className={styles.itemsContainer}>
              {cartItems.map(item => (
                <CSSTransition key={item.id} timeout={500} classNames={"cartItem"}>
                  <div className={styles.itemDetail}>
                    <i onClick={() => removeAll(item.id)} className={`${styles.removeAll} fas fa-minus`}></i>
                    <div className={styles.itemImage} style={{backgroundImage: `url(${item.image ? item.image: window.location.origin + "/images/noImage.png"})`}}></div>
                    <div className={styles.nameAndCount}>
                      <div className={styles.itemName}>{item.name}</div>
                      <div className={styles.itemCount}>
                        <i onClick={() => removeItem(item.id)} className={`${styles.countRemove} fas fa-minus`}></i>
                        <div>{item.quantity}</div>
                        <i onClick={() => addItem(item.id, item.quantity)} className={`${styles.countAdd} fas fa-plus`}></i>
                      </div>
                    </div>
                    <div className={styles.itemPrice}>{centsToPrice(item.price)}</div>
                  </div>
                </CSSTransition>
              ))}
            </TransitionGroup>
            <div className={styles.total}>Subtotal: {centsToPrice(getSubtotal(cartItems))}</div>
            <div className={styles.checkout}>
              <Link className={styles.checkoutButton} to="/checkout" onClick={() => handleClick()}>Checkout</Link>
            </div>
          </div>
        </Fade> :
        <div className={styles.isEmpty}>
          Your cart is empty.
        </div>
      }
    </div>
  )
}

export default Cart;