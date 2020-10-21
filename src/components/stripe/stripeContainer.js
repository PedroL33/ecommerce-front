import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './checkoutForm';

function StripeContainer() {

  const publicKey = process.env.REACT_APP_STRIPE_PUBLIC_KEY;  
  const stripeTestPromise = loadStripe(publicKey);

  return (
    <div>
      <Elements stripe={stripeTestPromise}>
        <CheckoutForm />
      </Elements>
    </div>
  )
}

export default StripeContainer;