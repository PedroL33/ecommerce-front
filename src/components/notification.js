import React from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { clearNotification } from '../actions';
import styles from '../styles/notification.module.css';

const Container = styled.div`
  position: fixed;
  height: 100px;
  width: 250px;
  bottom: ${props => props.show ? "25px": "-150px"};
  right: 0px;
  transition: bottom 700ms ease-in-out;
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

function Notification(props) {

  const dispatch = useDispatch();
  const notification = useSelector(state => state.notification);

  const handleClick = () => {
    dispatch(clearNotification());
  }

  return (
    <Container className={styles.container} show={props.show} onClick={() => handleClick()}>
      <div className={styles.message} ref={props.notificationRef}>
        {notification.message}
      </div>
    </Container>
  )
}

export default Notification;