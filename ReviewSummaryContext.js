import React, { createContext, useContext, useState } from 'react';

const ReviewSummaryContext = createContext();

export const useReviewSummaryContext = () => useContext(ReviewSummaryContext);

export const ReviewSummaryProvider = ({ children }) => {
  const [reviewData, setReviewData] = useState(null);

  const setReviewDataValue = (data) => {
    setReviewData(data);
  };

  return (
    <ReviewSummaryContext.Provider value={{ reviewData, setReviewData: setReviewDataValue }}>
      {children}
    </ReviewSummaryContext.Provider>
  );
};
