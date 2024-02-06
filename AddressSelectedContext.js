import React, { createContext, useContext, useState } from 'react';

// Create AddressSelectedContext
const AddressSelectedContext = createContext();

// Create a Context Provider component
const AddressSelectedProvider = ({ children }) => {
  const [chosenOptionAddress, setChosenOptionAddress] = useState('');
  const [chosenOptionLatitude, setChosenOptionLatitude] = useState('');
  const [chosenOptionLongitude, setChosenOptionLongitude] = useState('');
  const [isStreetInputClicked, setIsStreetInputClicked] = useState(false);
  const [isHNumberInputClicked, setIsHNumberInputClicked] = useState(false);
  const [isFloorInputClicked, setIsFloorInputClicked] = useState(false);
  const [isNoteInputClicked, setIsNoteInputClicked] = useState(false);
  const [isLabelInputClicked, setIsLabelInputClicked] = useState(false);

  const contextValue = {
    chosenOptionAddress,
    setChosenOptionAddress,
    chosenOptionLatitude,
    setChosenOptionLatitude,
    chosenOptionLongitude,
    setChosenOptionLongitude,
    isStreetInputClicked,
    setIsStreetInputClicked,
    isHNumberInputClicked,
    setIsHNumberInputClicked,
    isFloorInputClicked,
    setIsFloorInputClicked,
    isNoteInputClicked,
    setIsNoteInputClicked,
    isLabelInputClicked,
    setIsLabelInputClicked,
  }

  return (
    <AddressSelectedContext.Provider value={contextValue}>
      {children}
    </AddressSelectedContext.Provider>
  );
};

export { AddressSelectedProvider, AddressSelectedContext };
