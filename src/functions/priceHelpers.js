export function centsToPrice(cents) {
  if(cents%100 === 0) {
    return `$${cents/100}.00`
  }else {
    return `$${(Math.floor(cents/100) + (Math.round((Math.round((cents%100) * 100) / 100)) /100)).toFixed(2)}`
  }
}

export function getSubtotal(items) {
  if(items.length) {
    return items.map(item => item.price * item.quantity).reduce((a,b) => a+b)
  }else {
    return 0;
  }
} 

export function getTax(zip) {
  return fetch(`https://sandbox-rest.avatax.com/api/v2/taxrates/bypostalcode?country=us&postalCode=${zip.trim()}`, {
    method: "GET",
    headers: {
      'Authorization': `Basic ${process.env.REACT_APP_TAX_KEY}`
    }
  })
  .then(res => res.json())
  .then(data => {
    return data.totalRate;
  })
}

const getShipping = (orderDetails) => {
  return orderDetails.shipping === 'USPS Priority Mail' ? 500: 2500;
} 

export async function getTotal(items, details) {
  let total = {};
  if(items.length) {
    total.subtotal = getSubtotal(items)
    if(details.shipping_address) {
      const zip = details.shipping_address.split(",")[4]
      const rate = await getTax(zip.trim())
      total.tax = rate*total.subtotal;
      if(details.shipping) {
        total.shipping = getShipping(details) + (getShipping(details) * rate)
      }
    }
  }
  if(Object.keys(total).length!==0) total.total = Object.values(total).reduce((x,y) => x+y)
  return total;
}