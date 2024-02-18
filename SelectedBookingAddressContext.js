import React, { createContext, useContext, useState } from 'react';

// Create AddressSelectedContext
const SelectedBookingAddressContext = createContext();

// Create a Context Provider component
const SelectedBookingAddressProvider = ({ children }) => {
  const [selectedBookingAddress, setSelectedBookingAddress] = useState('');
  const [selectedBookingLatitude, setSelectedBookingLatitude] = useState('');
  const [selectedBookingLongitude, setSelectedBookingLongitude] = useState('');
  const [selectedBookingStreet, setSelectedBookingStreet] = useState('');
  const [selectedBookingHouseNumber, setSelectedBookingHouseNumber] = useState('');
  const [selectedBookingFloor, setSelectedBookingFloor] = useState('');
  const [selectedBookingNote, setSelectedBookingNote] = useState('');
  const [selectedBookingLabel, setSelectedBookingLabel] = useState('');
  const [selectedBookingOtherLabel, setSelectedBookingOtherLabel] = useState('');

  const contextValue = {
    selectedBookingAddress,
    setSelectedBookingAddress,
    selectedBookingLatitude,
    setSelectedBookingLatitude,
    selectedBookingLongitude,
    setSelectedBookingLongitude,
    selectedBookingStreet,
    setSelectedBookingStreet,
    selectedBookingHouseNumber,
    setSelectedBookingHouseNumber,
    selectedBookingFloor,
    setSelectedBookingFloor,
    selectedBookingNote,
    setSelectedBookingNote,
    selectedBookingLabel,
    setSelectedBookingLabel,
    selectedBookingOtherLabel,
    setSelectedBookingOtherLabel
  }

  return (
    <SelectedBookingAddressContext.Provider value={contextValue}>
      {children}
    </SelectedBookingAddressContext.Provider>
  );
};

export { SelectedBookingAddressProvider, SelectedBookingAddressContext };
