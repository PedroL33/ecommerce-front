import React from 'react';
import './App.css';
import Dashboard from './components/dashboard';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

function App() {

  const publicKey = process.env.REACT_APP_STRIPE_PUBLIC_KEY;  
  const stripeTestPromise = loadStripe(publicKey);

  return (
    <div>
      <Elements stripe={stripeTestPromise}>
        <Dashboard />
      </Elements>
    </div>
  );
}

export default App;
