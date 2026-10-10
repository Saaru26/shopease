export default function Footer() {
  return (
    <footer className="bg-dark text-light mt-5 pt-4 pb-3">
      <div className="container">
        <div className="row g-4">
          <div className="col-md-4">
            <h5 className="fw-bold">🛍️ ShopEase</h5>
            <p className="small text-secondary mb-0">
              A simple online shopping website built with React and Bootstrap as a
              Front-End Web Development mini project.
            </p>
          </div>
          <div className="col-md-4">
            <h6 className="fw-bold">Quick Links</h6>
            <ul className="list-unstyled small mb-0">
              <li><a className="text-secondary text-decoration-none" href="#/">Home</a></li>
              <li><a className="text-secondary text-decoration-none" href="#/products">Products</a></li>
              <li><a className="text-secondary text-decoration-none" href="#/cart">Cart</a></li>
            </ul>
          </div>
          <div className="col-md-4">
            <h6 className="fw-bold">Contact</h6>
            <p className="small text-secondary mb-0">
              support@shopease.example<br />
              Mon - Sat, 9 AM to 6 PM
            </p>
          </div>
        </div>
        <hr className="border-secondary" />
        <p className="text-center small text-secondary mb-0">
          © {new Date().getFullYear()} ShopEase. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
