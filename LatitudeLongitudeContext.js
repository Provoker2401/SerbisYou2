import React, { createContext, useState, useContext } from 'react';

// Create a Context
const LatitudeLongitudeContext = createContext();

// Create a Provider component
export const LatitudeLongitudeProvider = ({ children }) => {
  const [location, setLocation] = useState({ latitude: null, longitude: null });

  return (
    <LatitudeLongitudeContext.Provider value={{ location, setLocation }}>
      {children}
    </LatitudeLongitudeContext.Provider>
  );
};

// Custom hook to use the LatitudeLongitudeContext
export const useLatitudeLongitude = () => useContext(LatitudeLongitudeContext);
