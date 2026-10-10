import { useState } from "react";
import products from "../data/products.js";
import { useCart } from "../context/CartContext.jsx";
import { Stars } from "../components/ProductCard.jsx";
import ProductCard from "../components/ProductCard.jsx";
import { formatPrice } from "../utils.js";
import { navigate } from "../router.js";

export default function ProductDetails({ id }) {
  const product = products.find((p) => p.id === Number(id));
  const { addToCart } = useCart();
  const [qty, setQty] = useState(1);

  if (!product) {
    return (
      <div className="container my-5 text-center">
        <h3>Product not found</h3>
        <a href="#/products" className="btn btn-primary mt-3">Back to products</a>
      </div>
    );
  }

  const related = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="container my-4">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><a href="#/">Home</a></li>
          <li className="breadcrumb-item"><a href={"#/products?cat=" + product.category}>{product.category}</a></li>
          <li className="breadcrumb-item active">{product.name}</li>
        </ol>
      </nav>

      <div className="row g-4">
        <div className="col-md-6">
          <div className="product-thumb product-thumb-lg shadow-sm" style={{ background: product.bg }}>
            {product.emoji}
          </div>
        </div>
        <div className="col-md-6">
          <span className="badge text-bg-primary mb-2">{product.category}</span>
          <h2 className="fw-bold">{product.name}</h2>
          <Stars rating={product.rating} />
          <h3 className="my-3">{formatPrice(product.price)}</h3>
          <p className="text-muted">{product.description}</p>
          <ul className="small text-muted">
            <li>In stock · Ships in 2 days</li>
            <li>7-day easy returns</li>
            <li>Free delivery on orders above ₹999</li>
          </ul>

          <div className="d-flex align-items-center mb-4">
            <label className="me-3 fw-semibold">Quantity</label>
            <div className="input-group" style={{ width: 140 }}>
              <button className="btn btn-outline-secondary" onClick={() => setQty(Math.max(1, qty - 1))}>−</button>
              <input className="form-control text-center" value={qty} readOnly />
              <button className="btn btn-outline-secondary" onClick={() => setQty(qty + 1)}>+</button>
            </div>
          </div>

          <button className="btn btn-primary btn-lg me-2" onClick={() => addToCart(product, qty)}>
            🛒 Add to Cart
          </button>
          <button
            className="btn btn-warning btn-lg"
            onClick={() => {
              addToCart(product, qty);
              navigate("/checkout");
            }}
          >
            Buy Now
          </button>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-5">
          <h4 className="fw-bold mb-3">You may also like</h4>
          <div className="row g-4">
            {related.map((p) => (
              <div className="col-6 col-lg-3" key={p.id}>
                <ProductCard product={p} />
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
