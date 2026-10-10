import products, { categories, categoryIcons } from "../data/products.js";
import ProductCard from "../components/ProductCard.jsx";
import { navigate } from "../router.js";

export default function Home() {
  const featured = [...products].sort((a, b) => b.rating - a.rating).slice(0, 4);

  return (
    <>
      {/* Hero banner */}
      <section className="hero py-5">
        <div className="container py-4">
          <div className="row align-items-center">
            <div className="col-lg-7">
              <span className="badge text-bg-warning mb-3">Festive Sale · Up to 40% off</span>
              <h1 className="display-4 fw-bold">Shop smart. Shop easy.</h1>
              <p className="lead">
                Electronics, fashion, home essentials, books and sports gear — all in
                one place, delivered to your doorstep.
              </p>
              <a href="#/products" className="btn btn-warning btn-lg fw-semibold me-2">Shop Now</a>
              <a href="#/cart" className="btn btn-outline-light btn-lg">View Cart</a>
            </div>
            <div className="col-lg-5 text-center d-none d-lg-block" style={{ fontSize: "9rem" }}>
              🛍️
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container my-4">
        <div className="row g-3 text-center">
          {[
            ["🚚", "Free Delivery", "On orders above ₹999"],
            ["🔄", "Easy Returns", "7-day return policy"],
            ["🔒", "Secure Payment", "100% safe checkout"],
            ["🎧", "24/7 Support", "We are here to help"],
          ].map(([icon, title, text]) => (
            <div className="col-6 col-md-3" key={title}>
              <div className="bg-white rounded shadow-sm p-3 h-100">
                <div className="fs-2">{icon}</div>
                <div className="fw-semibold">{title}</div>
                <small className="text-muted">{text}</small>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="container my-5">
        <h3 className="fw-bold mb-3">Shop by Category</h3>
        <div className="row g-3">
          {categories.map((c) => (
            <div className="col-6 col-md-4 col-lg" key={c}>
              <div
                className="card category-tile text-center border-0 shadow-sm py-3"
                onClick={() => navigate("/products?cat=" + c)}
              >
                <div className="fs-1">{categoryIcons[c]}</div>
                <div className="fw-semibold">{c}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured products */}
      <section className="container my-5">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h3 className="fw-bold mb-0">Top Rated Products</h3>
          <a href="#/products" className="btn btn-outline-primary btn-sm">View all →</a>
        </div>
        <div className="row g-4">
          {featured.map((p) => (
            <div className="col-6 col-lg-3" key={p.id}>
              <ProductCard product={p} />
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
