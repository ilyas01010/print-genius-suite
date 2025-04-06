
import { createClient } from '@supabase/supabase-js';
import { toast } from '@/hooks/use-toast';
import type { Database } from '@/integrations/supabase/types';

// Use the values from the Supabase integration
const SUPABASE_URL = "https://kdpsyldycxyxmmxkjnai.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtkcHN5bGR5Y3h5eG1teGtqbmFpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM5MDE0NzMsImV4cCI6MjA1OTQ3NzQ3M30._PFaKbXh3tIpD2ot7owbElGmi1xj1XOYM6oYvOZsbdw";

// Create a single Supabase client instance
let supabaseInstance: ReturnType<typeof createClient<Database>> | null = null;

// Create the Supabase client with proper type definition
export const supabase = (() => {
  if (!supabaseInstance) {
    supabaseInstance = createClient<Database>(SUPABASE_URL, SUPABASE_ANON_KEY, {
      auth: {
        autoRefreshToken: true,
        persistSession: true,
      }
    });
  }
  return supabaseInstance;
})();

export const getSupabaseReadyStatus = (): boolean => {
  return true; // We are using the integration values, so Supabase is always ready
};

export const initializeSupabase = async (): Promise<void> => {
  try {
    // Verify connection
    const { error } = await supabase.from('designs').select('count', { count: 'exact', head: true });
    if (error) throw error;
    console.info('Supabase is properly configured and ready to use.');
  } catch (error) {
    console.error('Error initializing Supabase:', error);
  }
};

// Authentication helper functions with error handling
export const signUpWithEmail = async (email: string, password: string) => {
  try {
    return await supabase.auth.signUp({
      email,
      password,
    });
  } catch (error: any) {
    console.error('Error signing up:', error);
    toast({
      title: 'Error signing up',
      description: error.message || 'Please try again later.',
      variant: 'destructive',
    });
    return { data: null, error };
  }
};

export const signInWithEmail = async (email: string, password: string) => {
  try {
    return await supabase.auth.signInWithPassword({
      email,
      password,
    });
  } catch (error: any) {
    console.error('Error signing in:', error);
    toast({
      title: 'Error signing in',
      description: error.message || 'Please try again later.',
      variant: 'destructive',
    });
    return { data: null, error };
  }
};

export const signOut = async () => {
  try {
    return await supabase.auth.signOut();
  } catch (error: any) {
    console.error('Error signing out:', error);
    toast({
      title: 'Error signing out',
      description: error.message || 'Please try again later.',
      variant: 'destructive',
    });
    return { error };
  }
};

export const getCurrentUser = async () => {
  try {
    return await supabase.auth.getUser();
  } catch (error: any) {
    console.error('Error getting current user:', error);
    return { data: { user: null }, error };
  }
};

export const getSession = async () => {
  try {
    return await supabase.auth.getSession();
  } catch (error: any) {
    console.error('Error getting session:', error);
    return { data: { session: null }, error };
  }
};
