// auth.js

import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const getCookieValue = (cookieName) => {
    const cookies = document.cookie.split("; ");
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].split("=");
      if (cookie[0] === cookieName) {
        return cookie[1];
      }
    }
    return null;
  };

  const login = (userData) => {
    // Perform login logic here
    setUser(userData);
  };

  const logout = () => {
    // Perform logout logic here
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, getCookieValue }}>
      {children}
    </AuthContext.Provider>
  );
};
