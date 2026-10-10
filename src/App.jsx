import { useState } from "react";
import { useRoute } from "./router.js";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import ToastMessage from "./components/ToastMessage.jsx";
import Home from "./pages/Home.jsx";
import Products from "./pages/Products.jsx";
import ProductDetails from "./pages/ProductDetails.jsx";
import Cart from "./pages/Cart.jsx";
import Checkout from "./pages/Checkout.jsx";
import Success from "./pages/Success.jsx";

export default function App() {
  const { path, params } = useRoute();
  const [order, setOrder] = useState(null);

  let page;
  if (path === "/") page = <Home />;
  else if (path === "/products") page = <Products params={params} />;
  else if (path.startsWith("/product/")) page = <ProductDetails id={path.split("/")[2]} key={path} />;
  else if (path === "/cart") page = <Cart />;
  else if (path === "/checkout") page = <Checkout onOrderPlaced={setOrder} />;
  else if (path === "/success") page = <Success order={order} />;
  else
    page = (
      <div className="container my-5 text-center py-5">
        <h1 className="display-1 fw-bold">404</h1>
        <p>Page not found.</p>
        <a href="#/" className="btn btn-primary">Go Home</a>
      </div>
    );

  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar path={path} />
      <main className="flex-grow-1">{page}</main>
      <Footer />
      <ToastMessage />
    </div>
  );
}
