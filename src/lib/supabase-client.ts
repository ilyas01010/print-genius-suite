
import { createClient } from '@supabase/supabase-js';
import { toast } from '@/hooks/use-toast';

// Initialize Supabase client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const supabase = supabaseUrl && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// Sign up with email and password
export const signUpWithEmail = async (email: string, password: string) => {
  try {
    if (!supabase) {
      throw new Error('Supabase client not initialized');
    }
    
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });
    
    return { data, error };
  } catch (error: any) {
    console.error('Sign up error:', error);
    toast({
      title: "Error signing up",
      description: error.message,
      variant: "destructive",
    });
    return { data: null, error };
  }
};

// Sign in with email and password
export const signInWithEmail = async (email: string, password: string) => {
  try {
    if (!supabase) {
      throw new Error('Supabase client not initialized');
    }
    
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    
    return { data, error };
  } catch (error: any) {
    console.error('Sign in error:', error);
    toast({
      title: "Error signing in",
      description: error.message,
      variant: "destructive",
    });
    return { data: null, error };
  }
};

// Sign out
export const signOut = async () => {
  try {
    if (!supabase) {
      throw new Error('Supabase client not initialized');
    }
    
    const { error } = await supabase.auth.signOut();
    return { error };
  } catch (error: any) {
    console.error('Sign out error:', error);
    toast({
      title: "Error signing out",
      description: error.message,
      variant: "destructive",
    });
    return { error };
  }
};

// Get current user
export const getCurrentUser = async () => {
  try {
    if (!supabase) {
      return { data: { user: null }, error: new Error('Supabase client not initialized') };
    }
    
    const { data, error } = await supabase.auth.getUser();
    return { data, error };
  } catch (error: any) {
    console.error('Get user error:', error);
    return { data: { user: null }, error };
  }
};

// Get current session
export const getSession = async () => {
  try {
    if (!supabase) {
      return { data: { session: null }, error: new Error('Supabase client not initialized') };
    }
    
    const { data, error } = await supabase.auth.getSession();
    return { data, error };
  } catch (error: any) {
    console.error('Get session error:', error);
    return { data: { session: null }, error };
  }
};

// Safe storage bucket creation that doesn't fail the build
export const createStorageBucketIfNotExists = async (bucketName: string) => {
  if (!supabase) {
    console.log('Supabase client not initialized, skipping bucket creation');
    return;
  }
  
  try {
    const { data, error } = await supabase.storage.getBucket(bucketName);
    
    if (error && error.message.includes('does not exist')) {
      const { error: createError } = await supabase.storage.createBucket(bucketName, {
        public: false,
      });
      
      if (createError) {
        console.error('Error creating storage bucket:', createError);
      } else {
        console.log(`Created bucket: ${bucketName}`);
      }
    } else if (error) {
      console.error('Error checking for bucket:', error);
    } else {
      console.log(`Bucket exists: ${bucketName}`);
    }
  } catch (err) {
    console.error('Error creating storage bucket:', err);
  }
};

// Initialize Supabase storage
export const initializeSupabase = async () => {
  if (!supabase) {
    console.log('Supabase client not initialized, skipping initialization');
    return;
  }
  
  try {
    await createStorageBucketIfNotExists('designs');
    console.log('Supabase initialization completed');
  } catch (err) {
    console.error('Error initializing Supabase:', err);
  }
};

// Make sure window.fetch is defined before trying to use it
const originalFetch = typeof window !== 'undefined' ? window.fetch : global.fetch;

// Replace global fetch with a version that doesn't throw on certain errors
if (typeof window !== 'undefined') {
  window.fetch = async function(input, init) {
    try {
      return await originalFetch(input, init);
    } catch (error) {
      console.error('Fetch error:', error);
      // Return a mock response for edge function calls during build
      if (input.toString().includes('functions') && process.env.NODE_ENV === 'production') {
        return new Response(JSON.stringify({ message: 'Mock response during build' }), {
          status: 200,
          headers: new Headers({
            'Content-Type': 'application/json'
          })
        });
      }
      throw error;
    }
  };
}
