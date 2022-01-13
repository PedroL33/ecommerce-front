import React from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { clearNotification } from '../actions';
import styles from '../styles/notification.module.css';

const Container = styled.div`
  position: fixed;
  width: 300px;
  bottom: ${props => props.show ? "0px": "-50px"};
  right: 0px;
  transition: bottom 700ms ease-in-out;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.status === "error" ? "#ED4F32": "#15CD72"};
  color: white;
  border-radius: 3px;
  z-index: 3;
`

function Notification(props) {

  const dispatch = useDispatch();
  const notification = useSelector(state => state.notification);

  const handleClick = () => {
    dispatch(clearNotification());
  }

  return (
    <Container className={styles.container} show={props.show} status={notification.status} onClick={() => handleClick()}>
      <div className={styles.message} ref={props.notificationRef}>
        {notification.message}
      </div>
    </Container>
  )
}

export default Notification;