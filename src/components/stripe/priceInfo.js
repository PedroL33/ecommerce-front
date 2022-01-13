import React from 'react';
import styles from '../../styles/priceInfo.module.css';
import { centsToPrice } from '../../functions/priceHelpers';

function PriceInfo(props) {

  return (
    <div className={styles.container}>
      <div className={styles.cartItemContainer}>
        {props.items.map(item => 
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
          <div className={styles.itemValue}>{ centsToPrice(props.total.subtotal) }</div>
        </div>
        <div className={styles.priceItem}>
          <div className={styles.itemLabel}>Shipping:</div>
          { props.total.shipping ? <div className={styles.itemValue}>{centsToPrice(props.total.shipping)}</div> : <div className={styles.noValue}>{"Calculated at shipping step."}</div> }
        </div>
        <div className={styles.priceItem}>
          <div className={styles.itemLabel}>Tax: </div>
          <div className={styles.itemValue}>{ props.total.tax && centsToPrice(props.total.tax) }</div>
        </div>
        <div className={styles.priceItem}>
          <div className={styles.itemLabel}>Total: </div>
          <div className={styles.itemValue}>
              {props.total.total && centsToPrice(props.total.total)}
            </div>
        </div>
      </div>
    </div>
  )
}

export default PriceInfo;