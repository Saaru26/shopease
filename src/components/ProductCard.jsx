import { useCart } from "../context/CartContext.jsx";
import { formatPrice } from "../utils.js";

export function Stars({ rating }) {
  const full = Math.round(rating);
  return (
    <span className="text-warning" title={rating + " / 5"}>
      {"★".repeat(full)}
      <span className="text-muted">{"★".repeat(5 - full)}</span>
      <small className="text-muted ms-1">{rating}</small>
    </span>
  );
}

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  return (
    <div className="card h-100 border-0 shadow-sm product-card">
      <a href={"#/product/" + product.id} className="text-decoration-none">
        <div className="product-thumb" style={{ background: product.bg }}>
          {product.emoji}
        </div>
      </a>
      <div className="card-body d-flex flex-column">
        <span className="badge text-bg-light border align-self-start mb-2">{product.category}</span>
        <h6 className="card-title">
          <a href={"#/product/" + product.id} className="text-dark text-decoration-none">
            {product.name}
          </a>
        </h6>
        <Stars rating={product.rating} />
        <div className="d-flex justify-content-between align-items-center mt-auto pt-3">
          <span className="fs-5 fw-bold">{formatPrice(product.price)}</span>
          <button className="btn btn-sm btn-primary" onClick={() => addToCart(product)}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
