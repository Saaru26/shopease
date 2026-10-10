import { createContext, useContext, useEffect, useReducer, useState } from "react";

const CartContext = createContext(null);

function cartReducer(state, action) {
  switch (action.type) {
    case "ADD": {
      const qty = action.qty || 1;
      const existing = state.find((i) => i.id === action.product.id);
      if (existing) {
        return state.map((i) =>
          i.id === action.product.id ? { ...i, qty: i.qty + qty } : i
        );
      }
      return [...state, { ...action.product, qty }];
    }
    case "INCREASE":
      return state.map((i) => (i.id === action.id ? { ...i, qty: i.qty + 1 } : i));
    case "DECREASE":
      return state
        .map((i) => (i.id === action.id ? { ...i, qty: i.qty - 1 } : i))
        .filter((i) => i.qty > 0);
    case "REMOVE":
      return state.filter((i) => i.id !== action.id);
    case "CLEAR":
      return [];
    default:
      return state;
  }
}

function loadCart() {
  try {
    return JSON.parse(localStorage.getItem("shopease-cart")) || [];
  } catch {
    return [];
  }
}

export function CartProvider({ children }) {
  const [cart, dispatch] = useReducer(cartReducer, [], loadCart);
  const [toast, setToast] = useState(null);

  // auto-hide the "added to cart" toast
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 2200);
    return () => clearTimeout(t);
  }, [toast]);

  useEffect(() => {
    try {
      localStorage.setItem("shopease-cart", JSON.stringify(cart));
    } catch {
      /* ignore storage errors */
    }
  }, [cart]);

  const totalItems = cart.reduce((sum, i) => sum + i.qty, 0);
  const subtotal = cart.reduce((sum, i) => sum + i.qty * i.price, 0);

  const value = {
    cart,
    totalItems,
    subtotal,
    toast,
    addToCart: (product, qty = 1) => {
      dispatch({ type: "ADD", product, qty });
      setToast(product.name + " added to cart");
    },
    increase: (id) => dispatch({ type: "INCREASE", id }),
    decrease: (id) => dispatch({ type: "DECREASE", id }),
    removeItem: (id) => dispatch({ type: "REMOVE", id }),
    clearCart: () => dispatch({ type: "CLEAR" }),
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  return useContext(CartContext);
}
