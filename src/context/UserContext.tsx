
import React, { createContext, useState, useContext, useEffect } from 'react';
import { supabase, getSession } from '@/lib/supabase-client';
import { User } from '@supabase/supabase-js';
import { useToast } from '@/hooks/use-toast';

type UserContextType = {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  logout: () => Promise<void>;
};

const UserContext = createContext<UserContextType>({
  user: null,
  isLoading: true,
  isAuthenticated: false,
  setUser: () => {},
  logout: async () => {},
});

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data } = await getSession();
        
        if (data.session?.user) {
          setUser(data.session.user);
        }

        // Set up auth state listener
        const { data: authListener } = supabase.auth.onAuthStateChange(
          async (event, session) => {
            if (event === 'SIGNED_IN' && session?.user) {
              setUser(session.user);
              toast({
                title: 'Signed in successfully',
                description: `Welcome${session.user.email ? `, ${session.user.email}` : ''}!`,
              });
            }
            
            if (event === 'SIGNED_OUT') {
              setUser(null);
              toast({
                title: 'Signed out',
                description: 'You have been signed out.',
              });
            }
          }
        );

        setIsLoading(false);
        return () => {
          authListener.subscription.unsubscribe();
        };
      } catch (error) {
        console.error('Auth error:', error);
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [toast]);

  const logout = async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
      toast({
        title: 'Signed out',
        description: 'You have been signed out successfully.',
      });
    } catch (error) {
      console.error('Error signing out:', error);
      toast({
        title: 'Error signing out',
        description: 'Please try again later.',
        variant: 'destructive',
      });
    }
  };

  const contextValue = {
    user,
    setUser,
    isLoading,
    isAuthenticated: !!user,
    logout,
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
