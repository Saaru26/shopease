import { useEffect, useState } from "react";
import products, { categories } from "../data/products.js";
import ProductCard from "../components/ProductCard.jsx";

export default function Products({ params }) {
  const [search, setSearch] = useState(params.q || "");
  const [category, setCategory] = useState(params.cat || "All");
  const [sort, setSort] = useState("default");
  const [maxPrice, setMaxPrice] = useState(4000);

  // keep filters in sync when the URL changes (navbar search / category tiles)
  useEffect(() => {
    setSearch(params.q || "");
    setCategory(params.cat || "All");
  }, [params.q, params.cat]);

  let list = products.filter(
    (p) =>
      (category === "All" || p.category === category) &&
      p.price <= maxPrice &&
      p.name.toLowerCase().includes(search.toLowerCase())
  );

  if (sort === "low") list = [...list].sort((a, b) => a.price - b.price);
  if (sort === "high") list = [...list].sort((a, b) => b.price - a.price);
  if (sort === "rating") list = [...list].sort((a, b) => b.rating - a.rating);

  const reset = () => {
    setSearch("");
    setCategory("All");
    setSort("default");
    setMaxPrice(4000);
  };

  return (
    <div className="container my-4">
      <h2 className="fw-bold mb-3">All Products</h2>
      <div className="row g-4">
        {/* Filters */}
        <aside className="col-lg-3">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <h6 className="fw-bold">Search</h6>
              <input
                className="form-control mb-3"
                placeholder="Product name..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />

              <h6 className="fw-bold">Category</h6>
              <div className="list-group mb-3">
                {["All", ...categories].map((c) => (
                  <button
                    key={c}
                    type="button"
                    className={"list-group-item list-group-item-action" + (category === c ? " active" : "")}
                    onClick={() => setCategory(c)}
                  >
                    {c}
                  </button>
                ))}
              </div>

              <h6 className="fw-bold">Max Price: ₹{maxPrice}</h6>
              <input
                type="range"
                className="form-range mb-3"
                min="250"
                max="4000"
                step="50"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
              />

              <h6 className="fw-bold">Sort By</h6>
              <select className="form-select mb-3" value={sort} onChange={(e) => setSort(e.target.value)}>
                <option value="default">Featured</option>
                <option value="low">Price: Low to High</option>
                <option value="high">Price: High to Low</option>
                <option value="rating">Rating</option>
              </select>

              <button className="btn btn-outline-secondary w-100" onClick={reset}>Reset Filters</button>
            </div>
          </div>
        </aside>

        {/* Product grid */}
        <section className="col-lg-9">
          <p className="text-muted">Showing {list.length} product(s)</p>
          {list.length === 0 ? (
            <div className="alert alert-warning">No products match your filters. Try resetting them.</div>
          ) : (
            <div className="row g-4">
              {list.map((p) => (
                <div className="col-6 col-xl-4" key={p.id}>
                  <ProductCard product={p} />
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
