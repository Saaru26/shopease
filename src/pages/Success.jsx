import { formatPrice } from "../utils.js";

export default function Success({ order }) {
  if (!order) {
    return (
      <div className="container my-5 text-center py-5">
        <h3>No recent order found</h3>
        <a href="#/products" className="btn btn-primary mt-3">Continue shopping</a>
      </div>
    );
  }

  return (
    <div className="container my-5" style={{ maxWidth: 640 }}>
      <div className="card border-0 shadow-sm text-center p-4">
        <div style={{ fontSize: "4.5rem" }}>🎉</div>
        <h2 className="fw-bold text-success">Order Placed Successfully!</h2>
        <p className="text-muted">
          Thank you, <strong>{order.customer.name}</strong>. A confirmation has been sent to {order.customer.email}.
        </p>
        <div className="alert alert-light border text-start">
          <div><strong>Order ID:</strong> {order.id}</div>
          <div><strong>Items:</strong> {order.items.reduce((s, i) => s + i.qty, 0)}</div>
          <div><strong>Amount:</strong> {formatPrice(order.total)}</div>
          <div><strong>Payment:</strong> {order.customer.payment.toUpperCase()}</div>
          <div><strong>Deliver to:</strong> {order.customer.address}, {order.customer.city} - {order.customer.pincode}</div>
        </div>
        <a href="#/products" className="btn btn-primary btn-lg">Continue Shopping</a>
      </div>
    </div>
  );
}
