import React from 'react';

function ShippingForm(props) {
  return (
    <div>
      <button onClick={() => props.setStep(1)}>Back to Contact</button>
      <button onClick={() => props.setStep(3)}>Next</button>
    </div>
  )
}

export default ShippingForm;