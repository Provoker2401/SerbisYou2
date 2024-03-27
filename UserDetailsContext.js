import React, { createContext, useContext, useState } from "react";

// Create the context
const UserDetailsContext = createContext();

export const useUserDetailsContext = () => useContext(UserDetailsContext);

export const UserDetailsProvider = ({ children }) => {
  const [addUserDetails, setAddUserDetails] = useState(null);

  const setAddUserDetailsValue = (data) => {
    setAddUserDetails(data);
  };

  return (
    <UserDetailsContext.Provider
      value={{ addUserDetails, setAddUserDetails: setAddUserDetailsValue }}
    >
      {children}
    </UserDetailsContext.Provider>
  );
};

