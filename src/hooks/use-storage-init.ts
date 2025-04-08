
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase-client';

export const useStorageInit = () => {
  const [isInitialized, setIsInitialized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const initializeStorage = async () => {
      try {
        setIsLoading(true);
        
        if (!supabase) {
          throw new Error('Supabase client not initialized');
        }
        
        // Check if designs bucket exists
        const { data: buckets, error: bucketsError } = await supabase.storage.listBuckets();
        
        if (bucketsError) {
          throw bucketsError;
        }
        
        const designsBucketExists = buckets?.some(bucket => bucket.name === 'designs');
        
        if (!designsBucketExists) {
          // Create the bucket
          const { error: createError } = await supabase.storage.createBucket('designs', {
            public: false, // Default to private
          });
          
          if (createError) {
            throw createError;
          }
          
          console.log('Designs bucket created successfully');
          
          // Call the edge function to set up policies
          const { error: functionError } = await supabase.functions.invoke('setup-storage', {
            body: { bucketName: 'designs' },
          });
          
          if (functionError) {
            console.warn('Error setting up storage policies:', functionError);
            // Continue anyway as this might be a permissions issue
          }
        }
        
        setIsInitialized(true);
      } catch (err: any) {
        console.error('Error initializing storage:', err);
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };
    
    initializeStorage();
  }, []);
  
  return { isInitialized, isLoading, error };
};
