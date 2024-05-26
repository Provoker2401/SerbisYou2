import React, { createContext, useState } from 'react';

// Create a context with default value
export const UserLocationContext = createContext({
  userLocation: null,
  setUserLocation: () => {}
});

export const UserLocationProvider = ({ children }) => {
  const [userLocation, setUserLocation] = useState(null);

  return (
    <UserLocationContext.Provider value={{ userLocation, setUserLocation }}>
      {children}
    </UserLocationContext.Provider>
  );
};
