import React, { useEffect, useState, useCallback } from 'react';
import styles from '../../styles/priceInfo.module.css';
import { centsToPrice, getTotal } from '../../functions/priceHelpers';
import { useSelector } from 'react-redux';

function PriceInfo(props) {

  const orderItems = useSelector(state => state.activeOrderItems);
  const orderDetails = useSelector(state => state.activeOrders).filter(item => item.id=props.orderId)
  const [total, setTotal] = useState({});

  const getPriceInfo = useCallback(async () => {
    if(orderItems && orderDetails) {
      const priceInfo = await getTotal(orderItems, orderDetails[0]);
      setTotal(priceInfo)
    }
  }, [orderItems])

  useEffect(() => {
    getPriceInfo();
  }, [getPriceInfo])

  return (
    <div className={styles.container}>
      <div className={styles.cartItemContainer}>
        {orderItems.map(item => 
          <div key={item.id} className={styles.cartItem}>
            <div className={styles.itemDetails}>
              <div className={styles.itemImage} style={{backgroundImage: item.image ? `url(${item.image})` : `url(${window.location.origin}/images/noImage.png)`}}></div>
              <div className={styles.itemCount}>{item.quantity}</div>
              <div className={styles.itemName}>{item.name}</div>
            </div>
            <div>
              {centsToPrice(item.price)}
            </div>
          </div>
        )}
      </div>
      <div className={styles.priceContainer}>
        <div className={styles.priceItem}>
          <div className={styles.itemLabel}>Subtotal:</div>
          <div className={styles.itemValue}>{ centsToPrice(total.subtotal) }</div>
        </div>
        <div className={styles.priceItem}>
          <div className={styles.itemLabel}>Shipping:</div>
          { total.shipping ? <div className={styles.itemValue}>{centsToPrice(total.shipping)}</div> : <div className={styles.noValue}>{"Calculated at shipping step."}</div> }
        </div>
        <div className={styles.priceItem}>
          <div className={styles.itemLabel}>Tax: </div>
          <div className={styles.itemValue}>{ total.tax && centsToPrice(total.tax) }</div>
        </div>
        <div className={styles.priceItem}>
          <div className={styles.itemLabel}>Total: </div>
          <div className={styles.itemValue}>
              {total.total && centsToPrice(total.total)}
            </div>
        </div>
      </div>
    </div>
  )
}

export default PriceInfo;