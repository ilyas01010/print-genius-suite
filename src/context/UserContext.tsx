
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

            if (event === 'USER_DELETED') {
              setUser(null);
              toast({
                title: 'Account deleted',
                description: 'Your account has been permanently deleted.',
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

  const deleteAccount = async () => {
    try {
      if (!user) {
        throw new Error('You must be logged in to delete your account');
      }
      
      // Delete user data associated with this account
      // First step is to delete any designs
      const { error: dataError } = await supabase
        .from('designs')
        .delete()
        .eq('user_id', user.id);
        
      if (dataError) throw dataError;
      
      // Second, delete the user auth account
      const { error } = await supabase.auth.admin.deleteUser(user.id);
      if (error) throw error;
      
      setUser(null);
      return { error: null };
    } catch (error) {
      console.error('Error deleting account:', error);
      return { error };
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
