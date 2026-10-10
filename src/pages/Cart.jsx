import { useCart } from "../context/CartContext.jsx";
import OrderSummary from "../components/OrderSummary.jsx";
import { formatPrice } from "../utils.js";

export default function Cart() {
  const { cart, subtotal, increase, decrease, removeItem, clearCart } = useCart();

  if (cart.length === 0) {
    return (
      <div className="container my-5 text-center py-5">
        <div style={{ fontSize: "5rem" }}>🛒</div>
        <h3 className="fw-bold">Your cart is empty</h3>
        <p className="text-muted">Looks like you haven't added anything yet.</p>
        <a href="#/products" className="btn btn-primary btn-lg">Start Shopping</a>
      </div>
    );
  }

  return (
    <div className="container my-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="fw-bold mb-0">Shopping Cart</h2>
        <button className="btn btn-outline-danger btn-sm" onClick={clearCart}>Clear Cart</button>
      </div>

      <div className="row g-4">
        <div className="col-lg-8">
          <div className="card border-0 shadow-sm">
            <ul className="list-group list-group-flush">
              {cart.map((item) => (
                <li className="list-group-item py-3" key={item.id}>
                  <div className="row align-items-center g-2">
                    <div className="col-12 col-md-5 d-flex align-items-center">
                      <div className="cart-thumb me-3" style={{ background: item.bg }}>{item.emoji}</div>
                      <div>
                        <a href={"#/product/" + item.id} className="fw-semibold text-dark text-decoration-none">
                          {item.name}
                        </a>
                        <div className="small text-muted">{formatPrice(item.price)} each</div>
                      </div>
                    </div>
                    <div className="col-6 col-md-3">
                      <div className="input-group input-group-sm" style={{ width: 120 }}>
                        <button className="btn btn-outline-secondary" onClick={() => decrease(item.id)}>−</button>
                        <input className="form-control text-center" value={item.qty} readOnly />
                        <button className="btn btn-outline-secondary" onClick={() => increase(item.id)}>+</button>
                      </div>
                    </div>
                    <div className="col-4 col-md-2 fw-bold text-md-end">{formatPrice(item.price * item.qty)}</div>
                    <div className="col-2 text-end">
                      <button className="btn btn-sm btn-outline-danger" title="Remove" onClick={() => removeItem(item.id)}>
                        🗑️
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <a href="#/products" className="btn btn-link mt-2">← Continue shopping</a>
        </div>

        <div className="col-lg-4">
          <OrderSummary subtotal={subtotal}>
            <a href="#/checkout" className="btn btn-success w-100 btn-lg">Proceed to Checkout</a>
          </OrderSummary>
        </div>
      </div>
    </div>
  );
}
