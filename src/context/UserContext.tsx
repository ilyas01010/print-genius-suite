
import React, { createContext, useState, useContext, useEffect } from 'react';
import { supabase } from '@/lib/supabase-client';
import { toast } from '@/hooks/use-toast';

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
  user: null,
  isLoading: true,
  isAuthenticated: false,
  setUser: () => {},
  logout: async () => {},
  deleteAccount: async () => ({ error: null }),
});

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Initialize user session
  useEffect(() => {
    async function getInitialSession() {
      setIsLoading(true);
      try {
        // Check for existing session
        const { data, error } = await supabase?.auth.getSession() || { data: null, error: null };
        
        if (error) {
          console.error('Error getting session:', error);
        }
        
        if (data?.session?.user) {
          setUser(data.session.user);
        } else {
          // For demo purposes, provide a demo user
          setUser({ 
            id: 'demo-user',
            user_metadata: {
              display_name: 'Demo User',
              avatar_url: ''
            }
          });
        }
      } catch (error) {
        console.error('Error in session initialization:', error);
      } finally {
        setIsLoading(false);
      }
    }
    
    getInitialSession();
    
    // Listen for auth changes
    const { data: { subscription } = { subscription: null } } = supabase?.auth.onAuthStateChange(
      (_event, session) => {
        if (session?.user) {
          setUser(session.user);
        } else {
          // For demo purposes, provide a demo user when not authenticated
          setUser({ 
            id: 'demo-user',
            user_metadata: {
              display_name: 'Demo User',
              avatar_url: ''
            }
          });
        }
        setIsLoading(false);
      }
    ) || { data: { subscription: null } };
    
    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  const logout = async () => {
    setIsLoading(true);
    try {
      const { error } = await supabase?.auth.signOut() || { error: null };
      if (error) throw error;
      
      toast({
        title: "Logged out",
        description: "You have been successfully logged out.",
      });
      
      // Set demo user after logout
      setUser({ 
        id: 'demo-user',
        user_metadata: {
          display_name: 'Demo User',
          avatar_url: ''
        }
      });
    } catch (error: any) {
      console.error('Error during logout:', error);
      toast({
        title: "Error signing out",
        description: error.message || "An error occurred during sign out",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const deleteAccount = async () => {
    setIsLoading(true);
    try {
      // In a real app, this would call a secure backend endpoint
      console.log('Account deletion requested');
      
      toast({
        title: "Account deleted",
        description: "Your account has been successfully deleted.",
      });
      
      // Reset to demo user
      setUser({ 
        id: 'demo-user',
        user_metadata: {
          display_name: 'Demo User',
          avatar_url: ''
        }
      });
      return { error: null };
    } catch (error) {
      console.error('Error deleting account:', error);
      toast({
        title: "Error deleting account",
        description: "An error occurred while deleting your account",
        variant: "destructive",
      });
      return { error };
    } finally {
      setIsLoading(false);
    }
  };

  const contextValue = {
    user,
    setUser,
    isLoading,
    isAuthenticated: !!user,
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
