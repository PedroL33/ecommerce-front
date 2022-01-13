import React, { useState, useCallback, useEffect } from 'react';
import { CSSTransition } from 'react-transition-group';
import PriceInfo from './priceInfo';
import styles from '../../styles/priceInfo.module.css';
import { centsToPrice, getTotal } from '../../functions/priceHelpers';

function ResPriceInfo(props) {

  const [showResCart, setShowResCart] = useState(false);
  const [total, setTotal] = useState({});

  const getPriceInfo = useCallback(async () => {
    if(props.items && props.details) {
      const priceInfo = await getTotal(props.items, props.details);
      setTotal(priceInfo)
    }
  }, [props.items, props.details])

  useEffect(() => {
    getPriceInfo();
  }, [getPriceInfo, props.details])

  return (
    <div className={styles.resPriceInfo}>
      <div className={styles.orderSummary} onClick={()=>setShowResCart(!showResCart)}>
        <div className={styles.toggle}>
          { !showResCart ? "Show order summary" : "Hide order Summary" }
          <i className={showResCart ? "fas fa-chevron-up" : "fas fa-chevron-down"}></i>
        </div>
        <div className={styles.cartTotal}>
          {total.total ? centsToPrice(total.total) : centsToPrice(total.subtotal)}
        </div>
      </div>
      <CSSTransition in={showResCart} timeout={300} classNames="resCartInfo" unmountOnExit>
        <PriceInfo {...props} />
      </CSSTransition>
    </div>
  )
}

export default ResPriceInfo;