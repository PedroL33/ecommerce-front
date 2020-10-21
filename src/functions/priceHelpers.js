export function centsToPrice(cents) {
  if(cents%100 === 0) {
    return `$${cents/100}.00`
  }else {
    return `$${Math.round(cents/100)}.${cents%100}`
  }
}

export function getSubtotal(cart) {
  if(cart.length) {
    return cart.map(item => item.price * item.count).reduce((a,b) => a+b)
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

export async function getTotal(checkoutInfo) {
  let total = {};
  if(checkoutInfo.order) {
    total.subtotal = getSubtotal(checkoutInfo.order)
    if(checkoutInfo.contact) {
      const zip = checkoutInfo.contact.address.split(",")[4]
      const rate = await getTax(zip.trim())
      total.tax = rate*total.subtotal;
      if(checkoutInfo.shipping) {
        total.shipping = checkoutInfo.shipping.price + (checkoutInfo.shipping.price * rate)
      }
    }
  }
  total.total = Object.values(total).reduce((x,y) => x+y)
  return total;
}