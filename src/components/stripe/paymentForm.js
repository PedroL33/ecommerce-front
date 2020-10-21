import React from 'react';
import { useSelector } from 'react-redux';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import styles from '../../styles/checkoutForm.module.css';

function PaymentForm(props) {

  const stripe = useStripe();
  const elements = useElements();
  const cartItems = useSelector(state => state.cart);

  async function handleSubmit(e) {
    e.preventDefault();
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement)
    }) 

    if(!error) {
      console.log(paymentMethod);
    }else {
      console.log(error.message);
    }
  }

  return (
    <div>
      <form className={styles.container} onSubmit={(e) => handleSubmit(e)}>
        <CardElement 
          options={{
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
          }} 
        />
        <button>Pay</button>
      </form>
      <button onClick={()=> {props.setStep(2)}}>Back to shipping</button>
    </div>
  )
}

export default PaymentForm;