"use client";
import { createContext, useContext, useState } from "react";


const CartContext = createContext();

export function CartProvider({ children }) { 
    const [cartItems, setCartItems] = useState([]);

    const addToCart = (product) => {
        setCartItems((prevItems) => [...prevItems, product]);
    };

    const removeFromCart = (productId) => {
        setCartItems((prevItems) =>
            prevItems.filter((item) => item.id !== productId)
        );
    };

    const clearCart = () => {
        setCartItems([]);
    };

    const getCartItemsCount = () => {
    return cartItems.length;
};

    return ( 
        <CartContext.Provider
            value={{ cartItems, addToCart, removeFromCart, clearCart, getCartItemsCount }}
        >
            {children}
        </CartContext.Provider>
    );
}
export function useCart() {
    return useContext(CartContext);
}

export default CartContext;

