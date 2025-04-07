
import React, { createContext, useContext } from 'react';

type SecurityContextType = {
  isAdmin: boolean;
  isCreator: boolean;
  isCustomer: boolean;
  checkPermission: (requiredPermission: string) => Promise<boolean>;
  loading: boolean;
};

// Create a context with default values
const SecurityContext = createContext<SecurityContextType>({
  isAdmin: true, // Default to true to avoid restrictions
  isCreator: true,
  isCustomer: true, 
  checkPermission: async () => true, // Always permit access
  loading: false
});

export const useSecurityContext = () => useContext(SecurityContext);

export const SecurityProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Simplified security provider with no restrictions
  const checkPermission = async (): Promise<boolean> => {
    return true; // Always allow access
  };

  const value = {
    isAdmin: true,
    isCreator: true,
    isCustomer: true,
    checkPermission,
    loading: false
  };

  return (
    <SecurityContext.Provider value={value}>
      {children}
    </SecurityContext.Provider>
  );
};

export default SecurityProvider;
