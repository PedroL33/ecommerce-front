import React, { useState, useEffect, useCallback } from 'react';
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
import Loader from '../loader';
import Thankyou from '../thankyou';

function CheckoutForm() {

  const [step, setStep] = useState(1);
  const cart = useSelector(state => state.cart);
  const [details, setDetails] = useState({});
  const [total, setTotal] = useState({});
  const [complete, setComplete] = useState(false);

  const getPriceInfo = useCallback(async () => {
    if(cart && details) {
      const priceInfo = await getTotal(cart, details);
      setTotal(priceInfo)
    }
  }, [cart, details])

  useEffect(() => {
    getPriceInfo();
  }, [getPriceInfo, details])

  return (
    <>
      {complete ? <Thankyou />:
      !cart ? <Loader background="white" height="calc(100vh - 100px)" dotSize="large" dotColor="#cd5554"/> :
      !cart.length ? <div className={styles.emptyCart}><div>Your cart is empty.</div></div>:
      <div className={styles.container}>
        <div className={styles.resPriceInfo}>
          <ResPriceInfo total={total} items={cart} details={details} />
        </div>
        <div className={styles.formContainer}>
          <StepTracker step={step} setStep={setStep} />
          <div className={styles.form}>
            <SwitchTransition mode="out-in">
              <CSSTransition key={step} classNames="checkoutForm" timeout={300}>
                {
                  step===1 ? <ContactForm setStep={setStep} setDetails={setDetails} details={details} />:
                  step===2 ? <ShippingForm setStep={setStep} setDetails={setDetails} details={details} />:
                  <PaymentForm setStep={setStep} setDetails={setDetails} details={details} setComplete={setComplete} />
                }
              </CSSTransition>
            </SwitchTransition>
          </div>
        </div>
        <div className={styles.priceInfo}>
          <PriceInfo total={total} items={cart} details={details} />
        </div>
      </div>
      }
    </>
  );
};

export default CheckoutForm;