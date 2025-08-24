// src/context/TokenContext.js
import React, { createContext, useContext, useState, useEffect } from "react";

const TokenContext = createContext(null);

export const TokenProvider = ({ children }) => {
  const [token, setToken] = useState(null);

  // Load token from localStorage on app start
  useEffect(() => {
    const saved = localStorage.getItem("token");
    if (saved) setToken(saved);
  }, []);

  const saveToken = (newToken) => {
    setToken(newToken);
    if (newToken) {
      localStorage.setItem("token", newToken);
    } else {
      localStorage.removeItem("token");
    }
  };

  return (
    <TokenContext.Provider value={{ token, setToken: saveToken }}>
      {children}
    </TokenContext.Provider>
  );
};

// helper hook
export const useToken = () => useContext(TokenContext);
