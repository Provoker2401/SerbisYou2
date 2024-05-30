import React, { createContext, useContext, useState } from 'react';

// Create the context
const SearchResultsContext = createContext();

// Custom hook to use the SearchResultsContext
export const useSearchResultsContext = () => useContext(SearchResultsContext);

// Provider component
export const SearchResultsProvider = ({ children }) => {
  const [searchResults, setSearchResults] = useState([]);

  const setSearchResultsValue = (data) => {
    setSearchResults(data);
  };

  return (
    <SearchResultsContext.Provider value={{ searchResults, setSearchResults: setSearchResultsValue }}>
      {children}
    </SearchResultsContext.Provider>
  );
};
