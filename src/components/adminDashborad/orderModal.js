import React, { useEffect, useState, useRef, useCallback } from 'react';
import styles from '../../styles/adminModals.module.css';
import PriceInfo from '../stripe/priceInfo';
import { useDispatch, useSelector } from 'react-redux';
import { getActiveOrders, getActiveOrderItems } from '../../actions/apiCalls/orders';
import { completeOrder, clearActiveOrderItems } from '../../actions/adminActions';
import { getTotal } from '../../functions/priceHelpers';
import moment from 'moment';

function OrderModal(props) {

  const dispatch = useDispatch();
  const modalRef = useRef(null);
  const [tracking, setTracking] = useState("");
  const activeOrderItems = useSelector(state => state.activeOrderItems);
  const [total, setTotal] = useState({});

  const getPriceInfo = useCallback(async () => {
    if(activeOrderItems && props.order) {
      const priceInfo = await getTotal(activeOrderItems, props.order);
      setTotal(priceInfo)
    }
  }, [activeOrderItems, props.order])

  useEffect(() => {
    getPriceInfo();
  }, [getPriceInfo, activeOrderItems])

  useEffect(() => {

    function handleOutsideClick(e) {
      if(modalRef.current && !modalRef.current.contains(e.target)) {
        e.preventDefault();
        props.setShowModal(-1);
      }
    }

    window.addEventListener('click', handleOutsideClick)

    return () => {
      window.removeEventListener('click', handleOutsideClick)
    }
  }, [props])

  useEffect(() => {
    dispatch(getActiveOrderItems(props.order.id))
    return function() {
      dispatch(clearActiveOrderItems());
    }
  }, [])

  function handleClick() {
    dispatch(completeOrder(props.order.id, tracking))
    props.setShowModal(-1);
    dispatch(getActiveOrders())
  }

  return (
    <div className={styles.container}>
      <div className={styles.modal} ref={modalRef}>
        <div className={styles.modalHeader}>
          <span className={styles.modalClose} onClick={()=> props.setShowModal(-1)}>
            <i class="fas fa-times"></i>
          </span>
        </div>
        <div className={styles.modalItem}>
          <div className={styles.modalLabel}>
            Order ID: 
            <div className={styles.modalInfo}>&nbsp;{props.order.id}</div>
          </div>
        </div>
        <div className={styles.modalItem}>
          <div className={styles.modalLabel}>
            Contact Email: 
            <div className={styles.modalInfo}>&nbsp;{props.order.contact}</div>
          </div>
        </div>
        <div className={styles.modalItem}>
          <div className={styles.modalLabel}>
            Shipping Address: 
            <div className={styles.modalInfo}>&nbsp;{props.order.shipping_address}</div>
          </div>
        </div>
        <div className={styles.modalItem}>
          <div className={styles.modalLabel}>
            Shipping Method:
            <div className={styles.modalInfo}>&nbsp;{props.order.shipping}</div>
          </div>
        </div>
        <div className={styles.modalItem}>
          <div className={styles.modalLabel}>
            Ordered at:
            <div className={styles.modalInfo}>&nbsp;{moment(props.order.ordered_at).calendar()}</div>
          </div>
        </div>
        <div className={styles.modalItem}>
          <div className={styles.orderHeader}>Order:</div>
          <PriceInfo total={total} items={activeOrderItems} details={props.order}/>
        </div>
        <div className={styles.modalItem}>
          <input className={styles.modalInput} onChange={(e)=> setTracking(e.target.value)} type="text" placeholder="Tracking number">
          </input>
        </div>
        <div className={styles.submitContainer}>
          <button className={styles.completeOrderButton} onClick={handleClick} disabled={tracking ? false : true}>
            Complete
          </button>
        </div>
      </div>
    </div>
  )
}

export default OrderModal;