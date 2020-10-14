import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { clearNotification, hideNotification, showCart } from '../actions';
import styles from '../styles/notification.module.css';

const Container = styled.div`
  position: fixed;
  height: 100px;
  width: 300px;
  bottom: ${props => props.top ? "25px": "-150px"};
  right: 0px;
  transition: bottom   700ms ease-in-out;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(to bottom right, #b0db7d 40%, #99dbb4 100%);
  color: #494d5f;
  margin: 20px;
  border-radius: 20px;
  z-index: 3;
  opacity: 0.9;
`

function Notification() {

  const dispatch = useDispatch();
  const notificationRef = useRef(null);
  const notification = useSelector(state => state.notification);
  const showNotif = useSelector(state => state.showNotification)

  useEffect(() => {
    function handleOutsideClick(e) {
      if(!notificationRef.current.contains(e.target)) {
        dispatch(hideNotification())
        if(e.defaultPrevented) return
        setTimeout(() => dispatch(clearNotification()), 700);
      }
    }

    window.addEventListener('click', handleOutsideClick);

    return () => {
      window.removeEventListener('click', handleOutsideClick);
    }
  })

  function handleClick(e) {
    e.preventDefault();
    dispatch(showCart());
    dispatch(hideNotification());
  }

  return (
    <Container className={styles.container} top={showNotif} onClick={(e) => handleClick(e)}>
      <div className={styles.message} ref={notificationRef}>
        {notification.msg}
      </div>
    </Container>
  )
}

export default Notification;