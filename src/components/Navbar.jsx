import { useState } from "react";
import { useCart } from "../context/CartContext.jsx";
import { navigate } from "../router.js";

export default function Navbar({ path }) {
  const { totalItems } = useCart();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  const linkClass = (p) => "nav-link" + (path === p ? " active fw-semibold" : "");

  const handleSearch = (e) => {
    e.preventDefault();
    navigate("/products?q=" + encodeURIComponent(query.trim()));
    setOpen(false);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top shadow-sm">
      <div className="container">
        <a className="navbar-brand fw-bold" href="#/">
          🛍️ Shop<span className="text-warning">Ease</span>
        </a>
        <button
          className="navbar-toggler"
          type="button"
          aria-label="Toggle navigation"
          onClick={() => setOpen(!open)}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className={"collapse navbar-collapse" + (open ? " show" : "")}>
          <ul className="navbar-nav me-auto mb-2 mb-lg-0" onClick={() => setOpen(false)}>
            <li className="nav-item">
              <a className={linkClass("/")} href="#/">Home</a>
            </li>
            <li className="nav-item">
              <a className={linkClass("/products")} href="#/products">Products</a>
            </li>
            <li className="nav-item">
              <a className={linkClass("/cart")} href="#/cart">Cart</a>
            </li>
          </ul>

          <form className="d-flex me-lg-3 mb-2 mb-lg-0" onSubmit={handleSearch}>
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search products..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button className="btn btn-outline-warning" type="submit">Search</button>
          </form>

          <a className="btn btn-warning position-relative" href="#/cart" onClick={() => setOpen(false)}>
            🛒 Cart
            {totalItems > 0 && (
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                {totalItems}
              </span>
            )}
          </a>
        </div>
      </div>
    </nav>
  );
}
