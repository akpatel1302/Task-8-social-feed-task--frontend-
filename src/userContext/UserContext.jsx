// import React from "react";

// const UserContext = React.createContext();

// export default UserContext;

import React, { createContext, useContext } from "react";

const UserContext = createContext();

export const useUserContext = () => {
  const context = useContext(UserContext);
  return context;
};

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = React.useState(null);

  const updateUser = (userData) => {
    setUser(userData);
  };

  return (
    <UserContext.Provider value={{ user, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
