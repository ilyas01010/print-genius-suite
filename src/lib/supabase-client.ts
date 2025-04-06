
import { createClient } from '@supabase/supabase-js';
import { toast } from '@/hooks/use-toast';
import type { Database } from '@/integrations/supabase/types';

// Use the values from the Supabase integration
const SUPABASE_URL = "https://kdpsyldycxyxmmxkjnai.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtkcHN5bGR5Y3h5eG1teGtqbmFpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM5MDE0NzMsImV4cCI6MjA1OTQ3NzQ3M30._PFaKbXh3tIpD2ot7owbElGmi1xj1XOYM6oYvOZsbdw";

// Create storage bucket if it doesn't exist - moved before the supabase instance creation
const createStorageBucketIfNotExists = async (bucketName: string, supabaseClient: any): Promise<void> => {
  try {
    const { data: buckets, error } = await supabaseClient.storage.listBuckets();
    
    if (error) throw error;
    
    const bucketExists = buckets.some(bucket => bucket.name === bucketName);
    
    if (!bucketExists) {
      const { error: createError } = await supabaseClient.storage.createBucket(bucketName, {
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

// Initialize supabase function - moved before the supabase instance creation
export const initializeSupabase = async (supabaseClient: any): Promise<void> => {
  try {
    // Verify connection and create storage bucket if it doesn't exist
    await createStorageBucketIfNotExists('designs', supabaseClient);
    console.info('Supabase is properly configured and ready to use.');
  } catch (error) {
    console.error('Error initializing Supabase:', error);
  }
};

// Create a single Supabase client instance with optimized settings for production
let supabaseInstance: ReturnType<typeof createClient<Database>> | null = null;

// Create the Supabase client with proper type definition and production optimizations
export const supabase = (() => {
  if (!supabaseInstance) {
    supabaseInstance = createClient<Database>(SUPABASE_URL, SUPABASE_ANON_KEY, {
      auth: {
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: false, // Disable for security in production
        storage: window.localStorage // Use localStorage for session persistence
      },
      realtime: {
        params: {
          eventsPerSecond: 5 // Limit realtime events for better performance
        }
      },
      global: {
        // Production-optimized fetch options
        fetch: (url, options) => {
          const fetchOptions = {
            ...options,
            headers: {
              ...options?.headers,
              'Cache-Control': 'no-cache',
            },
          };
          return fetch(url, fetchOptions);
        },
      },
    });
    
    // Initialize storage and perform startup checks after instance creation
    // We now pass the instance to the function to avoid circular reference
    initializeSupabase(supabaseInstance).catch(error => {
      console.error('Error during Supabase initialization:', error);
    });
  }
  return supabaseInstance;
})();

export const getSupabaseReadyStatus = (): boolean => {
  return supabaseInstance !== null;
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
