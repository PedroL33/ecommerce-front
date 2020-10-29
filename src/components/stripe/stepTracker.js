import React from 'react';
import styles from '../../styles/stepTracker.module.css';

function StepTracker(props) {

  const steps = ["Contact", "Shipping", "Payment"];

  return (
    <div className={styles.container}>
      {
        steps.map((item, index) => 
          <div key={index} className={styles.stepContainer}>
            {props.step > index+1 ? <div className={styles.completeStep} onClick={()=>props.setStep(index+1)}>{item}</div> : 
            <div className={props.step===index+1 ? styles.activeStep : styles.incompleteStep}>{item}</div>}
            {index < 2 && <i className="fas fa-chevron-right"></i>}
          </div>
        )
      }
    </div>
  )
}

export default StepTracker;