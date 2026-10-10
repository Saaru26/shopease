export const formatPrice = (n) => "₹" + n.toLocaleString("en-IN");

export const GST_RATE = 0.18;
export const FREE_SHIPPING_ABOVE = 999;
export const SHIPPING_FEE = 49;

export function calcTotals(subtotal) {
  const gst = Math.round(subtotal * GST_RATE);
  const shipping = subtotal === 0 || subtotal >= FREE_SHIPPING_ABOVE ? 0 : SHIPPING_FEE;
  return { gst, shipping, total: subtotal + gst + shipping };
}
