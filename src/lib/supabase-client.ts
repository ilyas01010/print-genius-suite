
import { createClient } from '@supabase/supabase-js';
import { toast } from '@/hooks/use-toast';

// Initialize the Supabase client with the environment variables provided by the Supabase integration
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Check if Supabase environment variables are set
const isSupabaseConfigured = !!supabaseUrl && !!supabaseAnonKey;

if (!isSupabaseConfigured) {
  console.warn('Supabase environment variables are missing. Some features may not work properly.');
}

// Create a mock client if Supabase is not configured
export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : createClient('https://placeholder.supabase.co', 'placeholder-key', {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    });

export const getSupabaseReadyStatus = (): boolean => {
  return isSupabaseConfigured;
};

export const initializeSupabase = async (): Promise<void> => {
  const isReady = getSupabaseReadyStatus();
  if (isReady) {
    console.info('Supabase is properly configured and ready to use.');
  } else {
    console.warn('Supabase is not properly configured. Please check your Supabase connection in the Lovable interface.');
    toast({
      title: 'Supabase Connection Issue',
      description: 'Please make sure Supabase is properly connected in the Lovable interface.',
      variant: 'destructive',
    });
  }
};

// Authentication helper functions with error handling
export const signUpWithEmail = async (email: string, password: string) => {
  if (!isSupabaseConfigured) {
    const error = new Error('Supabase is not properly configured');
    return { data: null, error };
  }
  
  return await supabase.auth.signUp({
    email,
    password,
  });
};

export const signInWithEmail = async (email: string, password: string) => {
  if (!isSupabaseConfigured) {
    const error = new Error('Supabase is not properly configured');
    return { data: null, error };
  }
  
  return await supabase.auth.signInWithPassword({
    email,
    password,
  });
};

export const signOut = async () => {
  if (!isSupabaseConfigured) {
    const error = new Error('Supabase is not properly configured');
    return { error };
  }
  
  return await supabase.auth.signOut();
};

export const getCurrentUser = async () => {
  if (!isSupabaseConfigured) {
    const error = new Error('Supabase is not properly configured');
    return { data: { user: null }, error };
  }
  
  return await supabase.auth.getUser();
};

export const getSession = async () => {
  if (!isSupabaseConfigured) {
    const error = new Error('Supabase is not properly configured');
    return { data: { session: null }, error };
  }
  
  return await supabase.auth.getSession();
};
