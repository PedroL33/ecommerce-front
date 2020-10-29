import React, { useState} from 'react';
import { CSSTransition } from 'react-transition-group';
import PriceInfo from './priceInfo';
import styles from '../../styles/priceInfo.module.css';
import { centsToPrice, getSubtotal } from '../../functions/priceHelpers';

function ResPriceInfo(props) {

  const [showResCart, setShowResCart] = useState(false);

  return (
    <div className={styles.resPriceInfo}>
      <div className={styles.orderSummary} onClick={()=>setShowResCart(!showResCart)}>
        <div className={styles.toggle}>
          { !showResCart ? "Show order summary" : "Hide order Summary" }
          <i className={showResCart ? "fas fa-chevron-up" : "fas fa-chevron-down"}></i>
        </div>
        <div className={styles.cartTotal}>
          {props.total.total ? centsToPrice(props.total.total) : centsToPrice(getSubtotal(props.checkoutInfo.order))}
        </div>
      </div>
      <CSSTransition in={showResCart} timeout={300} classNames="resCartInfo" unmountOnExit>
        <PriceInfo total={props.total} checkoutInfo={props.checkoutInfo} />
      </CSSTransition>
    </div>
  )
}

export default ResPriceInfo;