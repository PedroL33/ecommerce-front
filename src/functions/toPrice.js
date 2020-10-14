export default function toPrice(cents) {
  if(cents%100 === 0) {
    return `$${cents/100}.00`
  }else {
    return `$${Math.round(cents/100)}.${cents%100}`
  }
}