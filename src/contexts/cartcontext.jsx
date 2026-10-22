"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { makeSlug } from "@/lib/api";

const CartContext = createContext();

// Turns a price like "$899" (how older carts saved it) into the number 899
function toNumber(price) {
  if (typeof price === "number") {
    return price;
  }
  return Number(String(price).replace(/[^0-9.]/g, "")) || 0;
}

// We only keep what the cart page needs, not the whole product
function cartItemFrom(product, quantity) {
  return {
    id: product.id,
    slug: product.slug || makeSlug(product.title, product.id),
    title: product.title,
    description: product.description,
    src: product.src,
    alt: product.alt,
    price: toNumber(product.price),
    quantity: quantity,
  };
}

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const savedCart = localStorage.getItem("shopnow-cart");
      if (savedCart) {
        const items = JSON.parse(savedCart);
        setCartItems(items.map((item) => cartItemFrom(item, item.quantity || 1)));
      }
    } catch (error) {
      localStorage.removeItem("shopnow-cart");
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    // Wait until the saved cart has been read, otherwise we would save an
    // empty cart over it
    if (loaded) {
      localStorage.setItem("shopnow-cart", JSON.stringify(cartItems));
    }
  }, [cartItems, loaded]);

  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);

      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevItems, cartItemFrom(product, 1)];
    });
  };

  const changeQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(productId);
      return;
    }
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeFromCart = (productId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== productId));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getCartItemsCount = () => {
    let count = 0;
    for (const item of cartItems) {
      count += item.quantity;
    }
    return count;
  };

  const getCartTotal = () => {
    let total = 0;
    for (const item of cartItems) {
      total += item.price * item.quantity;
    }
    return total;
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        changeQuantity,
        removeFromCart,
        clearCart,
        getCartItemsCount,
        getCartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
