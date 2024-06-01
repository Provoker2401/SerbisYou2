import React, { createContext, useState } from 'react';

// Create the context
export const SliderContext = createContext();

// Create the provider component
export const SliderProvider = ({ children }) => {
  const [kmFilter, setKmFilter] = useState(3); // Initial value set to 3

  return (
    <SliderContext.Provider value={{ kmFilter, setKmFilter }}>
      {children}
    </SliderContext.Provider>
  );
};
