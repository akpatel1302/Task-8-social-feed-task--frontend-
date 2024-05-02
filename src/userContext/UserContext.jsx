import { createContext, useContext, useEffect, useState } from "react";

// Create a Auth
const Auth = createContext();

// Create a useCookie hook
export const useCookie = () => {
  const context = useContext(Auth);
  return context;
};

// Create a AuthProvider component
export const AuthProvider = ({ children }) => {
  const [cookie, setCookie] = useState("");

  // Function to get the cookie
  const getCookie = () => {
    const cookieString = document.cookie.split(";");
    for (let i = 0; i < cookieString.length; i++) {
      const cookie = cookieString[i].trim();
      // Check if the cookie is the one you're looking for
      if (cookie.startsWith("your_cookie_name=")) {
        return cookie.split("=")[1];
      }
    }
    return "";
  };

  // Use effect to get the cookie when the component mounts
  useEffect(() => {
    const cookieValue = getCookie();
    setCookie(cookieValue);
  }, []);

  return <Auth.Provider value={{ cookie }}>{children}</Auth.Provider>;
};

export default useCookie;
