import React, { createContext, useContext, useState } from 'react';

const SearchingContext = createContext();

export const useSearchingContext = () => useContext(SearchingContext);

export const SearchingContextProvider = ({ children }) => {
  const [firstProviderIds, setFirstProviderIds] = useState(null);

  const setFirstProviderIdsValue = (data) => {
    setFirstProviderIds(data);
  };

  return (
    <SearchingContext.Provider value={{ firstProviderIds, setFirstProviderIdsValue }}>
      {children}
    </SearchingContext.Provider>
  );
};