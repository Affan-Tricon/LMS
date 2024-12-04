import React, { createContext, useContext, useState } from 'react';

// Create a context
const EmailContext = createContext();

// Create a provider component
export const EmailProvider = ({ children }) => {
  const [email, setEmail] = useState('');

  return (
    <EmailContext.Provider value={{ email, setEmail }}>
      {children}
    </EmailContext.Provider>
  );
};

// Create a custom hook to use the Email context
export const useEmail = () => {
  return useContext(EmailContext);
};
