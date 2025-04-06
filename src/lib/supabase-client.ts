
import { createClient } from '@supabase/supabase-js';

// Initialize the Supabase client with the environment variables provided by the Supabase integration
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Supabase environment variables are not set. Please check your configuration.');
}

export const supabase = createClient(
  supabaseUrl || '',
  supabaseAnonKey || ''
);

export const getSupabaseReadyStatus = (): boolean => {
  return !!supabaseUrl && !!supabaseAnonKey;
};

export const initializeSupabase = async (): Promise<void> => {
  const isReady = getSupabaseReadyStatus();
  if (isReady) {
    console.info('Supabase is properly configured and ready to use.');
  } else {
    console.error('Supabase is not properly configured.');
  }
};

// Authentication helper functions
export const signUpWithEmail = async (email: string, password: string) => {
  return await supabase.auth.signUp({
    email,
    password,
  });
};

export const signInWithEmail = async (email: string, password: string) => {
  return await supabase.auth.signInWithPassword({
    email,
    password,
  });
};

export const signOut = async () => {
  return await supabase.auth.signOut();
};

export const getCurrentUser = async () => {
  return await supabase.auth.getUser();
};

export const getSession = async () => {
  return await supabase.auth.getSession();
};
