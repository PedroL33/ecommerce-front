import React, { useState, useEffect } from 'react';
import { SwitchTransition, CSSTransition } from 'react-transition-group';
import ContactForm from './contactForm';
import PaymentForm from './paymentForm';
import ShippingForm from './shippingForm';
import styles from '../../styles/checkoutForm.module.css';
import PriceInfo from './priceInfo';
import { getTotal, centsToPrice, getSubtotal } from '../../functions/priceHelpers';
import { useSelector } from 'react-redux';

function CheckoutForm() {

  const [step, setStep] = useState(1);
  const [total, setTotal] = useState({});
  const cart = useSelector(state => state.cart)
  const checkoutInfo = useSelector(state => state.checkoutInfo)
  const [showResCart, setShowResCart] = useState(false);

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
        <div className={styles.resPriceInfo}>
          <div className={styles.orderSummary} onClick={()=>setShowResCart(!showResCart)}>
            <div className={styles.toggle}>
              { !showResCart ? "Show order summary" : "Hide order Summary" }
              <i className={showResCart ? "fas fa-chevron-up" : "fas fa-chevron-down"}></i>
            </div>
            <div className={styles.cartTotal}>
              {total.total ? centsToPrice(total.total) : centsToPrice(getSubtotal(cart))}
            </div>
          </div>
          <CSSTransition in={showResCart} timeout={300} classNames="resCartInfo" unmountOnExit>
            <PriceInfo total={total} />
          </CSSTransition>
        </div>
        <div className={styles.formContainer}>
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
          <PriceInfo total={total} />
        </div>
      </div>
      }
    </div>
  );
};

export default CheckoutForm;