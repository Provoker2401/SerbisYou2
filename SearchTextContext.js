// SearchTextContext.js
import React, { createContext, useState, useContext } from 'react';

const SearchTextContext = createContext();

export const useSearchText = () => useContext(SearchTextContext);

export const SearchTextProvider = ({ children }) => {
  const [searchTextLowercase, setSearchTextLowercase] = useState('');

  return (
    <SearchTextContext.Provider value={{ searchTextLowercase, setSearchTextLowercase }}>
      {children}
    </SearchTextContext.Provider>
  );
};
