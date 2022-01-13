import React, { useState, useEffect } from 'react';
import shipping from '../../constants/shipping.json';
import styles from '../../styles/shippingForm.module.css';
import { centsToPrice } from '../../functions/priceHelpers';
import { setShipping } from '../../actions';
import { useDispatch, useSelector } from 'react-redux';

function ShippingForm(props) {

  const [method, setMethod] = useState({});
  // const dispatch = useDispatch();
  const checkoutInfo = useSelector(state => state.checkoutInfo);

  useEffect(() => {
    if(checkoutInfo.shipping) {
      setMethod(checkoutInfo.shipping);
    }
  }, [checkoutInfo.shipping])

  function handleClick(item) {
    console.log(item)
    props.setDetails({...props.details, shipping: item.name})
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>Choose a shipping method:</div>
      <div className={styles.methodsContainer}>
        {
          Object.values(shipping).map(item => 
            <div key={item.name} className={props.details.shipping===item.name ? `${styles.methodContainer} ${styles.active}` : styles.methodContainer} onClick={() => handleClick(item)}>
              <div className={styles.itemInfo}>
                <div className={styles.itemName}>{item.name}</div>
                <div className={styles.itemDuration}>{item.duration}</div>
              </div>
              {method.name===item.name ? <i className="fas fa-caret-left"></i>: null}
              <div className={styles.itemPrice}>{centsToPrice(item.price)}</div>
            </div>
          )
        }
      </div>
      <div className={styles.buttonContainer}>
        <button className={styles.backButton} onClick={() => props.setStep(1)}>Back to Contact</button>
        <button className={styles.nextButton} disabled={ props.details.shipping ? false: true} onClick={() => props.setStep(3)}>Continue to Payment</button>
      </div>
    </div>
  )
}

export default ShippingForm;