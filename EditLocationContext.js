// EditLocationContext.js
import React, { createContext, useContext, useState } from 'react';

const EditLocationContext = createContext();

export const EditLocationProvider = ({ children }) => {
  const [locationData, setLocationData] = useState({
    cityAddress: '',
    specificLocation: '',
    streetValue: '',
    houseValue: '',
    floorValue: '',
    noteValue: '',
    label: '',
    otherLabel: '',
  });

  const setLocation = (data) => {
    setLocationData((prevData) => ({ ...prevData, ...data }));
  };

  return (
    <EditLocationContext.Provider value={{ locationData, setLocation }}>
      {children}
    </EditLocationContext.Provider>
  );
};

export const useEditLocation = () => {
  const context = useContext(EditLocationContext);
  if (!context) {
    throw new Error('useEditLocation must be used within an EditLocationProvider');
  }
  return context;
};
