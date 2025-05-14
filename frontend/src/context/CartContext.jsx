import React, { createContext, useContext, useState, useEffect } from "react";



// 1. contexto
const CartContext = createContext();

// 2. Hook 
export const useCart = () => useContext(CartContext);

// 3. proveedor del contexto
export function CartProvider({ children }) {
    const [cart, setCart] = useState(() => {
        const saved = localStorage.getItem("cart");
        return saved ? JSON.parse(saved) : [];
      });

      
    useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

      
  //  añadir discos al carrito
  const addToCart = (product, quantity = 1) => {
    const exists = cart.find((item) => item.id === product.id);
    if (exists) {
      setCart(cart.map((item) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + quantity }
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity }]);
    }
  };
  

  // eliminar del carrito
  const removeFromCart = (productId) => {
    setCart(cart.filter((item) => item.id !== productId));
  };

  // Vaciar carrito
  const clearCart = () => setCart([]);

  const incrementItem = (id) => {
    setCart(cart =>
      cart.map(item =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };
  
  const decrementItem = (id) => {
    setCart(cart =>
      cart.map(item =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 } : item
      )
    );
  };
  

  // Total
  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
  value={{
    cart,
    addToCart,
    removeFromCart,
    clearCart,
    cartTotal,
    incrementItem, 
    decrementItem, 
  }}
>
  {children}
</CartContext.Provider>

  );
}
