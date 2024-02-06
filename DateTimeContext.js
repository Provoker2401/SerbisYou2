import React, { createContext, useContext, useState } from 'react';

// Create the context
const DateTimeContext = createContext();

export const DateTimeProvider = ({ children }) => {
  const [selectedDateContext, setSelectedDateContext] = useState('');
  const [selectedTimeContext, setSelectedTimeContext] = useState('');

  const contextValue = {
    selectedDateContext,
    setSelectedDateContext,
    selectedTimeContext,
    setSelectedTimeContext,
  };

  return (
    <DateTimeContext.Provider value={contextValue}>
      {children}
    </DateTimeContext.Provider>
  );
};

export const useDateTimeContext = () => {
  return useContext(DateTimeContext);
};
