import { createContext, useEffect, useState } from "react";
import axios from 'axios';
import { food_list } from "../assets/assets";

export const StoreContext = createContext(null);

const StoreContextProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    return JSON.parse(localStorage.getItem("cartItems")) || {};
  });

  
  const url = "http://localhost:4000";  // base URL for the backend
  const [token,setToken] = useState("");

  const addToCart = (itemId, size) => {
    const key = `${itemId}-${size}`;
    setCartItems((prev) => ({
      ...prev,
      [key]: (prev[key] || 0) + 1,
    }));
  };
  

  const removeFromCart = (itemId, size) => {
    const key = `${itemId}-${size}`;
    setCartItems((prev) => {
      if (!prev[key]) return prev;
      const updatedCart = { ...prev, [key]: prev[key] - 1 };

      if (updatedCart[key] <= 0) {
        delete updatedCart[key];
      }
      return updatedCart;
    });
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    Object.keys(cartItems).forEach((key) => {
      const [itemId, size] = key.split("-");
      const item = food_list.find((item) => item.id === itemId);
      if (item) {
        totalAmount += item.price * cartItems[key];
      }
    });
    return totalAmount;
  };

  

  const contextValue = {
    food_list,
    cartItems,
    getTotalCartAmount,
    setCartItems,
    addToCart,
    removeFromCart,
    url,
    token,
    setToken,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;