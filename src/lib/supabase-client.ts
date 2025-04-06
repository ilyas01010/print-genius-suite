
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
  return supabaseInstance !== null;
};

export const initializeSupabase = async (): Promise<void> => {
  try {
    // Verify connection and create storage bucket if it doesn't exist
    await createStorageBucketIfNotExists('designs');
    console.info('Supabase is properly configured and ready to use.');
  } catch (error) {
    console.error('Error initializing Supabase:', error);
  }
};

// Create storage bucket if it doesn't exist
const createStorageBucketIfNotExists = async (bucketName: string): Promise<void> => {
  try {
    const { data: buckets, error } = await supabase.storage.listBuckets();
    
    if (error) throw error;
    
    const bucketExists = buckets.some(bucket => bucket.name === bucketName);
    
    if (!bucketExists) {
      const { error: createError } = await supabase.storage.createBucket(bucketName, {
        public: true, // Make designs publicly accessible
      });
      
      if (createError) throw createError;
      console.info(`Created storage bucket: ${bucketName}`);
    }
  } catch (error) {
    console.error('Error creating storage bucket:', error);
    throw error;
  }
};

// Define a Design type based on the database schema
export interface Design {
  id: string;
  user_id: string;
  created_at: string;
  updated_at: string;
  category: string | null;
  storage_path: string;
  name: string;
  description: string | null;
}

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

export const deleteUser = async (userId: string) => {
  try {
    // Use admin functions when available, or a server-side function as fallback
    if (supabase.auth.admin) {
      return await supabase.auth.admin.deleteUser(userId);
    } else {
      // Fallback to calling an edge function if needed
      throw new Error("Admin functions not available - please use an edge function for account deletion");
    }
  } catch (error: any) {
    console.error('Error deleting user:', error);
    return { error };
  }
};
