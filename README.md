# ShopEase – Online Shopping Website (React + Bootstrap)

A Front-End Web Development mini project: a simple e-commerce website built with
**React (Vite)** and **Bootstrap 5**.

## Features
- Home page with hero banner, category tiles and top-rated products
- Products page with search, category filter, price slider and sorting
- Product details page with quantity selector, "Add to Cart" and "Buy Now"
- Shopping cart (increase / decrease / remove / clear) saved in `localStorage`
- Order summary with 18% GST and free shipping above ₹999
- Checkout form with validation (name, email, mobile, address, city, pincode)
- Order success page, 404 page, toast notification, fully responsive layout

## Tech Stack
React 18 · Vite · Bootstrap 5 · React Context + useReducer (cart state) · a small hash-based router

## How to run
Requires Node.js 18 or newer.

```bash
npm install
npm run dev
```

Open the URL shown in the terminal (usually http://localhost:5173).

To create a production build: `npm run build` (output in `dist/`).

## Folder structure
```
shopease/
├── index.html
├── package.json
├── vite.config.js
└── src/
    ├── main.jsx            # entry point (imports Bootstrap CSS)
    ├── App.jsx             # page layout + routes
    ├── router.js           # tiny hash router
    ├── utils.js            # price formatting, GST/shipping logic
    ├── index.css           # custom styles
    ├── data/products.js    # product list
    ├── context/CartContext.jsx
    ├── components/         # Navbar, Footer, ProductCard, OrderSummary, ToastMessage
    └── pages/              # Home, Products, ProductDetails, Cart, Checkout, Success
```
