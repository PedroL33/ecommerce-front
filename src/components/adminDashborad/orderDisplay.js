import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getActiveOrders } from '../../actions/apiCalls/orders';
import styles from '../../styles/orderDisplay.module.css';
import moment from 'moment';
import OrderModal from './orderModal';
import Loader from '../loader';

function OrderDisplay() {

  const dispatch = useDispatch();
  const orders = useSelector(state => state.activeOrders);
  const [showModal, setShowModal] = useState(-1)

  useEffect(() => {
    dispatch(getActiveOrders())
  }, [dispatch])

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.headerItem}>Order ID</div>
        <div className={styles.headerItem}>Placed</div>
        <div className={styles.headerItem}></div>
      </div>
      {
        orders[0] === "loading" ? <Loader height="100%" background="#cd5554"/>:
        orders[0] !== "loading" && orders.length ? orders.map((order, index) => (
          <div className={styles.order} key={index}>
            <div className={styles.orderItem}>{order.id}</div>
            <div className={styles.orderItem}>{moment(order.ordered_at).fromNow()}</div>
            <div className={styles.orderItem}><i className={`fas fa-info-circle ${styles.moreInfo}`} onClick={(e) => setShowModal(index)}></i></div>
            {showModal===index && <OrderModal setShowModal={setShowModal} order={order} />}
          </div>
        )): 
        <div className={styles.emptyMessage}>Currently no active orders.</div>
      }
    </div>
  )
}

export default OrderDisplay;