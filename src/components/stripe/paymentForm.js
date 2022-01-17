import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import styles from '../../styles/paymentForm.module.css';
import { clearCart, setNotification } from '../../actions';
import { getClientSecret } from '../../actions/apiCalls/stripe';
import { createCart } from '../../actions/apiCalls/cart';
import Loader from '../loader';

function PaymentForm(props) {

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const [isFilled, setIsFilled] = useState(false);

  function handleChange(e) {
    e.complete ? setIsFilled(true) : setIsFilled(false);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    const { client_secret } = await getClientSecret(props.details);
    if(!client_secret) {
      setLoading(false);
      return;
    }
    const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(client_secret, {
      payment_method: {
        card: elements.getElement(CardElement),
      }
    })
    if(stripeError) {
      dispatch(setNotification(stripeError.message, 'error'));
      setLoading(false);
      return;
    }
    if(paymentIntent.status === 'succeeded') {
      props.setComplete(true);
      dispatch(createCart())
      dispatch(clearCart())
    }
  }

  function handleClick(e) {
    e.preventDefault()
    props.setStep(2);
  }

  return (
    <div className={styles.container}>
      <label className={styles.header}>
        Enter your card information.
      </label>
      <form className={styles.formContainer} onSubmit={handleSubmit}>
        <CardElement 
          onChange={handleChange}
          options={
            {
            style: {
              base: {
                fontSize: '24px',
                color: '#424770',
                '::placeholder': {
                  color: '#aab7c4',
                },
              },
              invalid: {
                color: '#9e2146',
              },
            },
          }
        } 
        />
        <div className={styles.buttonContainer}>
          <button onClick={handleClick} className={styles.backButton}>Shipping</button>
          <button className={styles.payButton} type="submit" disabled={isFilled ? false: true}>
            {loading ? <Loader dotSize="small" height="25px" dotColor="#fceed1" background="rgba(0,0,0,0.01)" />: "Pay"}
          </button>
        </div>
      </form>
    </div>
  )
}

export default PaymentForm;