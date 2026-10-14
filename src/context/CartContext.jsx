import { createContext, useContext, useEffect, useState } from 'react';
import { useProducts } from './ProductsContext';


const CART_KEY = 'seoulfood_carrito';
const CartContext = createContext();

function loadCart() {
  try {
    return JSON.parse(localStorage.getItem(CART_KEY)) || {};
  } catch {
    return {};
  }
}

export function CartProvider({ children }) {
  const { products } = useProducts();
  const [cart, setCart] = useState(loadCart);
  const [showCart, setShowCart] = useState(false);

  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }, [cart]);

  // Stock vigente de un producto (el admin puede cambiarlo en cualquier momento)
  const maxFor = (id) => {
    const product = products.find((p) => p.id === id);
    return product ? Math.max(0, product.stock) : 0;
  };

  // Nunca supera el stock actual, aunque el carrito tenga guardado más
  const getQuantity = (id) => Math.min(cart[id] || 0, maxFor(id));

  const openCart = () => setShowCart(true);
  const closeCart = () => setShowCart(false);

  const addToCart = (id) => {
    const product = products.find((p) => p.id === id);
    if (!product) return;
    setCart((prev) => {
      const current = Math.min(prev[id] || 0, maxFor(id));
      if (current >= product.stock) return prev;
      return { ...prev, [id]: current + 1 };
    });
  };

  const decreaseItem = (id) => {
    setCart((prev) => {
      const next = { ...prev, [id]: Math.min(prev[id] || 0, maxFor(id)) - 1 };
      if (next[id] <= 0) delete next[id];
      return next;
    });
  };

  const removeItem = (id) => {
    setCart((prev) => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
  };

  const items = Object.entries(cart)
    .map(([id, quantity]) => ({
      product: products.find((p) => p.id === id),
      quantity: Math.min(quantity, maxFor(id)),
    }))
    .filter((item) => item.product && item.quantity > 0);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        totalItems,
        totalPrice,
        addToCart,
        decreaseItem,
        getQuantity,
        removeItem,
        showCart,
        openCart,
        closeCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}