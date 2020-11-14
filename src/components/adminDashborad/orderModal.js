import React, { useEffect, useState, useRef } from 'react';
import styles from '../../styles/adminModals.module.css';
import PriceInfo from '../stripe/priceInfo';
import { getTotal } from '../../functions/priceHelpers';
import { useDispatch } from 'react-redux';
import { getActiveOrders, completeOrder } from '../../actions/adminActions';

function OrderModal(props) {

  const dispatch = useDispatch();
  const modalRef = useRef(null);
  const [total, setTotal] = useState({})
  const [tracking, setTracking] = useState("");

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
    getTotal(props.order).then(total => {
      setTotal(total)
    })
  }, [props.order])

  async function handleClick() {
    await dispatch(completeOrder(props.order._id, tracking))
    props.setShowModal(-1);
    dispatch(getActiveOrders())
  }

  return (
    <div className={styles.container}>
      <div className={styles.modal} ref={modalRef}>
        <div className={styles.modalHeader}>
          {props.order._id}
          <span className={styles.modalClose} onClick={()=> props.setShowModal(-1)}>
            <i class="fas fa-times"></i>
          </span>
        </div>
        <div className={styles.modalItem}>
          <div className={styles.modalLabel}>
            Contact Email: 
            <div className={styles.modalInfo}>&nbsp;{props.order.contact.email}</div>
          </div>
        </div>
        <div className={styles.modalItem}>
          <div className={styles.modalLabel}>
            Contact Addres: 
            <div className={styles.modalInfo}>&nbsp;{props.order.contact.address}</div>
          </div>
        </div>
        <div className={styles.modalItem}>
          <div className={styles.modalLabel}>
            Shipping Method:
            <div className={styles.modalInfo}>&nbsp;{props.order.shipping.name}</div>
          </div>
        </div>
        <div className={styles.modalItem}>
          <div className={styles.orderHeader}>Order:</div>
          <PriceInfo checkoutInfo={props.order} total={total} />
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