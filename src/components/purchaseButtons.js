import React, { useState } from 'react';
import styles from '../styles/purchaseButtons.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { createCartItem, updateCartItem } from '../actions/apiCalls/cart';
import { showCart } from '../actions';
import Loader from './loader';  

function PurchaseButtons(props) {

  const dispatch = useDispatch();
  const [disableButtons, setDisableButtons] = useState(false);
  const cart = useSelector(state => state.cart)

  function handleClick(e) {
    e.preventDefault();
    setDisableButtons(true)
    let cartItem = cart.filter(item => item.id === props.product.id);
    if(cartItem.length) {
      console.log(cartItem)
      dispatch(updateCartItem(props.product.id, cartItem[0].quantity+1))
    }else {
      dispatch(createCartItem(props.product.name, 1))
    }
    dispatch(showCart());
    setTimeout(() => {
      setDisableButtons(false);
    }, 700);
  }

  return (
    <div className={styles.itemButtons}>
      <div className={styles.button} onClick={(e)=> handleClick(e)}>
        {disableButtons ? <Loader dotSize="small" height="25px" background="rgba(0,0,0,0.01)" /> : "Add to cart"}
      </div>
    </div>
  )
}

export default PurchaseButtons;