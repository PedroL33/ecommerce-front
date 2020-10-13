import React from 'react';
import styles from '../styles/loader.module.css';
import styled, { keyframes } from 'styled-components';

function Loader(props) {

  const width = props.dotSize === "large" ? "20px" : props.dotSize === "small" ? "8px" : "16px";

  const background = props.background ? props.background : "#d0bdf4";
   
  const bounce = keyframes`
    to {
      width: ${width}px;
      height: ${width}px;
      transform: translate3d(0, -${width}, 0);
    }
  `;

  const Dot = styled.div`
    border-radius: 50%;
    margin: 5px;
    width: ${width};
    height: ${width};
    animation: ${bounce} 0.6s alternate infinite;
    transform: translate3d(0, ${width}, 0);
  `


  return (
    <div style={{height: `${props.height}`, background: `${background}`}} className={styles.container}>
      <Dot></Dot>
      <Dot></Dot>
      <Dot></Dot>
    </div>
  )
}

export default Loader;