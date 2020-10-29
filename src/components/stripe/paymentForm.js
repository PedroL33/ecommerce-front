import React, {useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import styles from '../../styles/paymentForm.module.css';
import { makePayment, paymentClear, clearCart, clearCheckout } from '../../actions';
import { getTotal, centsToPrice } from '../../functions/priceHelpers';
import Loader from '../loader';
import { useHistory } from 'react-router-dom';

function PaymentForm(props) {

  const history = useHistory()
  const dispatch = useDispatch();
  const [total, setTotal] = useState({})
  const stripe = useStripe();
  const elements = useElements();
  const checkoutInfo = useSelector(state => state.checkoutInfo);
  const [complete, setComplete] = useState(false);
  const paymentStatus = useSelector(state => state.paymentStatus);

  useEffect(() => {
    getTotal(checkoutInfo)
    .then(total => setTotal(total))
  }, [])

  useEffect(() => {
    return () => {
      dispatch(paymentClear())
    }
  }, [])

  useEffect(() => {
    if(paymentStatus.success) {
      localStorage.removeItem("cart")
      dispatch(clearCart())
      history.push(`/thankyou/${encodeURIComponent(JSON.stringify(checkoutInfo))}`);
      dispatch(clearCheckout());
    }
  }, [paymentStatus])

  function handleChange(e) {
    e.complete ? setComplete(true) : setComplete(false);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement)
    }) 

    if(!error) {
      const { id } = paymentMethod;
      dispatch(makePayment(Math.round(total.total), id, checkoutInfo));
      elements.getElement(CardElement).clear();
    }else {
      console.log(error)
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
      <div className={styles.error}>
        {paymentStatus.message === "Loading" ? <Loader dotSize="small" background="white" height="100px" /> : !paymentStatus.success ? <div>{paymentStatus.message}</div>: null}
      </div>
      <form className={styles.formContainer} onSubmit={handleSubmit}>
        <CardElement 
          onChange={handleChange}
          options={{
            style: {
              base: {
                fontSize: '18px',
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
        <div className={styles.buttonContainer}>
          <button onClick={handleClick} className={styles.backButton}>Back to shipping</button>
          <button className={styles.payButton} type="submit" disabled={total.total && complete ? false: true}>Pay {centsToPrice(Math.round(total.total))}</button>
        </div>
      </form>
    </div>
  )
}

export default PaymentForm;