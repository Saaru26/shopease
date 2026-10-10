import { useState } from "react";
import { useCart } from "../context/CartContext.jsx";
import OrderSummary from "../components/OrderSummary.jsx";
import { calcTotals, formatPrice } from "../utils.js";
import { navigate } from "../router.js";

const emptyForm = { name: "", email: "", phone: "", address: "", city: "", pincode: "", payment: "cod" };

function validate(f) {
  const e = {};
  if (f.name.trim().length < 3) e.name = "Enter your full name (min 3 characters).";
  if (!/^\S+@\S+\.\S+$/.test(f.email)) e.email = "Enter a valid email address.";
  if (!/^[6-9]\d{9}$/.test(f.phone)) e.phone = "Enter a valid 10-digit mobile number.";
  if (f.address.trim().length < 8) e.address = "Enter your full address.";
  if (f.city.trim().length < 2) e.city = "Enter your city.";
  if (!/^\d{6}$/.test(f.pincode)) e.pincode = "Enter a valid 6-digit pincode.";
  return e;
}

export default function Checkout({ onOrderPlaced }) {
  const { cart, subtotal, clearCart } = useCart();
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});

  if (cart.length === 0) {
    return (
      <div className="container my-5 text-center py-5">
        <h3>Nothing to checkout</h3>
        <a href="#/products" className="btn btn-primary mt-3">Browse products</a>
      </div>
    );
  }

  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    const errs = validate(form);
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    onOrderPlaced({
      id: "SE" + Date.now().toString().slice(-8),
      customer: form,
      items: cart,
      total: calcTotals(subtotal).total,
    });
    clearCart();
    navigate("/success");
  };

  const field = (name, label, props = {}) => (
    <div className={props.col || "col-12"}>
      <label className="form-label fw-semibold" htmlFor={name}>{label}</label>
      <input
        id={name}
        name={name}
        className={"form-control" + (errors[name] ? " is-invalid" : "")}
        value={form[name]}
        onChange={change}
        placeholder={props.placeholder}
        type={props.type || "text"}
      />
      <div className="invalid-feedback">{errors[name]}</div>
    </div>
  );

  return (
    <div className="container my-4">
      <h2 className="fw-bold mb-3">Checkout</h2>
      <form onSubmit={submit} noValidate>
        <div className="row g-4">
          <div className="col-lg-7">
            <div className="card border-0 shadow-sm mb-4">
              <div className="card-body">
                <h5 className="fw-bold mb-3">Shipping Details</h5>
                <div className="row g-3">
                  {field("name", "Full Name", { placeholder: "e.g. Rahul Sharma" })}
                  {field("email", "Email", { col: "col-md-6", type: "email", placeholder: "you@example.com" })}
                  {field("phone", "Mobile Number", { col: "col-md-6", placeholder: "10-digit number" })}
                  {field("address", "Address", { placeholder: "House no., street, area" })}
                  {field("city", "City", { col: "col-md-6", placeholder: "Mumbai" })}
                  {field("pincode", "Pincode", { col: "col-md-6", placeholder: "400001" })}
                </div>
              </div>
            </div>

            <div className="card border-0 shadow-sm">
              <div className="card-body">
                <h5 className="fw-bold mb-3">Payment Method</h5>
                {[
                  ["cod", "Cash on Delivery"],
                  ["upi", "UPI (GPay / PhonePe / Paytm)"],
                  ["card", "Credit / Debit Card"],
                ].map(([val, label]) => (
                  <div className="form-check mb-2" key={val}>
                    <input
                      className="form-check-input"
                      type="radio"
                      name="payment"
                      id={"pay-" + val}
                      value={val}
                      checked={form.payment === val}
                      onChange={change}
                    />
                    <label className="form-check-label" htmlFor={"pay-" + val}>{label}</label>
                  </div>
                ))}
                <small className="text-muted">This is a demo project — no real payment is taken.</small>
              </div>
            </div>
          </div>

          <div className="col-lg-5">
            <OrderSummary subtotal={subtotal}>
              <ul className="list-unstyled small text-muted mb-3">
                {cart.map((i) => (
                  <li key={i.id}>{i.emoji} {i.name} × {i.qty} — {formatPrice(i.price * i.qty)}</li>
                ))}
              </ul>
              <button type="submit" className="btn btn-success btn-lg w-100">Place Order</button>
            </OrderSummary>
          </div>
        </div>
      </form>
    </div>
  );
}
