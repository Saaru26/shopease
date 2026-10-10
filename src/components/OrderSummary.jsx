import { formatPrice, calcTotals, FREE_SHIPPING_ABOVE } from "../utils.js";

export default function OrderSummary({ subtotal, children }) {
  const { gst, shipping, total } = calcTotals(subtotal);
  return (
    <div className="card border-0 shadow-sm">
      <div className="card-body">
        <h5 className="fw-bold mb-3">Order Summary</h5>
        <div className="d-flex justify-content-between mb-2">
          <span>Subtotal</span><span>{formatPrice(subtotal)}</span>
        </div>
        <div className="d-flex justify-content-between mb-2">
          <span>GST (18%)</span><span>{formatPrice(gst)}</span>
        </div>
        <div className="d-flex justify-content-between mb-2">
          <span>Shipping</span>
          <span>{shipping === 0 ? <span className="text-success">FREE</span> : formatPrice(shipping)}</span>
        </div>
        {shipping > 0 && (
          <small className="text-muted">
            Add {formatPrice(FREE_SHIPPING_ABOVE - subtotal)} more for free shipping
          </small>
        )}
        <hr />
        <div className="d-flex justify-content-between fs-5 fw-bold mb-3">
          <span>Total</span><span>{formatPrice(total)}</span>
        </div>
        {children}
      </div>
    </div>
  );
}
