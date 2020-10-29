import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styles from '../styles/thankyou.module.css';
import { getTotal } from '../functions/priceHelpers';
import PriceInfo from './stripe/priceInfo';
import { Link } from 'react-router-dom';

function Thankyou() {

  const { orderInfo } = useParams();
  const [order, setOrder] = useState({})
  const [total, setTotal] = useState({});

  useEffect(() => {
    try{
      const data = JSON.parse(decodeURIComponent(orderInfo));
      if(data.contact && data.order && data.shipping) {
        setOrder(data)
      }else {
        setOrder({
          error: "There's nothing here."
        })
      }
    } catch(err) {
      setOrder({
        error: "There's nothing here."
      })
    }
  }, [])

  useEffect(() => {
    getTotal(order).then(total => {
      setTotal(total)
    })
  }, [order])

  function isEmpty() {
    return Object.keys(order).length===0
  }

  return (
    <div className={styles.container}>
      {
        order.error || isEmpty() ? <div className={styles.errorContainer}>
          <div>{order.error}</div>
        </div> : 
        <div className={styles.thankyouContainer}>
          <div className={styles.header}>
            <div className={styles.thankyou}>Thank you for your order.</div>
            <div className={styles.message}>Tracking details and more information will be sent to {order.contact.email} within the business day.</div>
            <div className={styles.deals}>
              Consider <Link className={styles.signupLink} to="/signup">Signing Up</Link> to recieve information on sales and other promotional deals.
            </div>
            <Link to="/" className={styles.returnButton}>Return to site</Link>
          </div>
          <div className={styles.orderInfo}>
            <div>Your order: </div>
            <PriceInfo checkoutInfo={order} total={total} /> 
          </div>
        </div>  
      }
    </div>
  )
}

export default Thankyou;