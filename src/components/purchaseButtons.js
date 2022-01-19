import React, { useState, useEffect } from 'react';
import styles from '../styles/purchaseButtons.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { createCartItem, updateCartItem } from '../actions/apiCalls/cart';
import Loader from './loader';  

function PurchaseButtons(props) {

  const dispatch = useDispatch();
  const [isDisabled, setIsDisabled] = useState(false);
  const cart = useSelector(state => state.cart)

  function handleClick(e) {
    e.preventDefault();
    setIsDisabled(true)
    const cartItem = cart.filter(item => item.id === props.product.id);
    if(cartItem.length) {
      dispatch(updateCartItem(props.product.id, 1))
    }else {
      dispatch(createCartItem(props.product.name, 1))
    }
    props.setShowCart(true)
    setTimeout(() => {
      setIsDisabled(false);
    }, 700);
  }

  useEffect(() => {
    if(!cart) {
      setIsDisabled(true)
    }else {
      setIsDisabled(false)
    }
  }, [cart])

  return (
    <div className={styles.itemButtons}>
      <button className={styles.button} onClick={(e)=> handleClick(e)} disabled={isDisabled}>
        {isDisabled ? <Loader dotSize="small" height="25px" dotColor="#fceed1" background="rgba(0,0,0,0.01)" /> : "Add to cart"}
      </button>
    </div>
  )
}

export default PurchaseButtons;