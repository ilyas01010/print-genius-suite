
import React, { createContext, useState, useContext } from 'react';

type User = {
  id: string;
  email?: string;
  user_metadata?: {
    avatar_url?: string;
    display_name?: string;
    bio?: string;
    [key: string]: any;
  };
};

type UserContextType = {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  logout: () => Promise<void>;
  deleteAccount: () => Promise<{error?: any}>;
};

const UserContext = createContext<UserContextType>({
  user: { id: 'demo-user' }, // Default demo user
  isLoading: false,
  isAuthenticated: true, // Default to authenticated
  setUser: () => {},
  logout: async () => {},
  deleteAccount: async () => ({ error: null }),
});

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>({ 
    id: 'demo-user',
    user_metadata: {
      display_name: 'Demo User',
      avatar_url: ''
    }
  });
  
  const logout = async () => {
    // Simplified logout
    console.log('Logout clicked');
  };

  const deleteAccount = async () => {
    // Simplified delete account
    console.log('Delete account clicked');
    return { error: null };
  };

  const contextValue = {
    user,
    setUser,
    isLoading: false,
    isAuthenticated: true, // Always authenticated
    logout,
    deleteAccount,
  };

  return (
    <UserContext.Provider value={contextValue}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export default UserProvider;
