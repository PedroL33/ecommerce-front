import React, { useState, useEffect } from 'react';
import { SwitchTransition, CSSTransition } from 'react-transition-group';
import ContactForm from './contactForm';
import PaymentForm from './paymentForm';
import ShippingForm from './shippingForm';
import styles from '../../styles/checkoutForm.module.css';
import PriceInfo from './priceInfo';
import StepTracker from './stepTracker';
import { getTotal } from '../../functions/priceHelpers';
import { useSelector } from 'react-redux';
import ResPriceInfo from './resPriceInfo';

function CheckoutForm() {

  const [step, setStep] = useState(1);
  const checkoutInfo = useSelector(state => state.checkoutInfo)
  const [total, setTotal] = useState({});

  useEffect(() => {
    if(checkoutInfo.contact && checkoutInfo.contact.address) {
      getTotal(checkoutInfo).then(total => {
        setTotal(total)
      })
    }
  }, [checkoutInfo])

  return (
    <div>
      {!checkoutInfo.order ? <div className={styles.emptyCart}><div>Your cart is empty.</div></div> :
      <div className={styles.container}>
        <ResPriceInfo total={total} checkoutInfo={checkoutInfo} />
        <div className={styles.formContainer}>
          <StepTracker step={step} setStep={setStep} />
          <SwitchTransition mode="out-in">
            <CSSTransition key={step} classNames="checkoutForm" timeout={300}>
              {
                step===1 ? <ContactForm setStep={setStep} />:
                step===2 ? <ShippingForm setStep={setStep} />:
                <PaymentForm setStep={setStep} />
              }
            </CSSTransition>
          </SwitchTransition>
        </div>
        <div className={styles.priceInfo}>
          <PriceInfo total={total} checkoutInfo={checkoutInfo}/>
        </div>
      </div>
      }
    </div>
  );
};

export default CheckoutForm;