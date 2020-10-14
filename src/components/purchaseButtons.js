import React, { useState } from 'react';
import styles from '../styles/purchaseButtons.module.css';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { addCart, addCartNotification, showNotification } from '../actions';
import Loader from './loader';  

function PurchaseButtons(props) {

  const dispatch = useDispatch();
  const [disableButtons, setDisableButtons] = useState(false);

  function handleClick(e) {
    e.preventDefault();
    dispatch(addCart(props.product))
    setDisableButtons(true)
    setTimeout(() => {
      dispatch(addCartNotification(props.product, `${props.product.name} added to your cart!`))
      dispatch(showNotification());
      setDisableButtons(false)
    }, 700);
  }

  return (
    <div className={styles.itemButtons}>
      <Link className={styles.button} onClick={(e)=> handleClick(e)}>
        {disableButtons ? <Loader dotSize="small" height="16px" background="rgba(0,0,0,0.01)" /> : "Add to cart"}
      </Link>
      <Link to={`/purchase/${props.product._id}`} className={styles.button}>Buy Now</Link>
    </div>
  )
}

export default PurchaseButtons;