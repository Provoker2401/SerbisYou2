import React, { createContext, useState } from 'react';

// Create a context with a default value of null
export const MarkerContext = createContext(null);

export const MarkerProvider = ({ children }) => {
    const [markerUid, setMarkerUid] = useState(null);

    return (
        <MarkerContext.Provider value={{ markerUid, setMarkerUid }}>
            {children}
        </MarkerContext.Provider>
    );
};
