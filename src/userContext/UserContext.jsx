import { createContext, useContext, useEffect, useState } from "react";

// Create a Auth
const Auth = createContext();

// Create a useCookie hook
const useCookie = () => {
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

      if (cookie.startsWith("accessToken")) {
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
