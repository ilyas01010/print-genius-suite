
-- This file should be executed through the SQL editor in the Supabase dashboard
-- Create a function to set up storage policies for a bucket
CREATE OR REPLACE FUNCTION public.setup_storage_policies(bucket_name TEXT)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  policy_exists BOOLEAN;
BEGIN
  -- Check if 'authenticated_upload' policy exists
  SELECT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'storage' 
    AND tablename = 'objects' 
    AND policyname = 'authenticated_upload_' || bucket_name
  ) INTO policy_exists;
  
  -- Create 'authenticated_upload' policy if it doesn't exist
  IF NOT policy_exists THEN
    EXECUTE format('
      CREATE POLICY "authenticated_upload_%I" ON storage.objects
      FOR INSERT TO authenticated
      WITH CHECK (bucket_id = %L AND auth.uid() = owner);
    ', bucket_name, bucket_name);
  END IF;

  -- Check if 'authenticated_delete' policy exists
  SELECT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'storage' 
    AND tablename = 'objects' 
    AND policyname = 'authenticated_delete_' || bucket_name
  ) INTO policy_exists;
  
  -- Create 'authenticated_delete' policy if it doesn't exist
  IF NOT policy_exists THEN
    EXECUTE format('
      CREATE POLICY "authenticated_delete_%I" ON storage.objects
      FOR DELETE TO authenticated
      USING (bucket_id = %L AND auth.uid() = owner);
    ', bucket_name, bucket_name);
  END IF;

  -- Check if 'public_read' policy exists
  SELECT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'storage' 
    AND tablename = 'objects' 
    AND policyname = 'public_read_' || bucket_name
  ) INTO policy_exists;
  
  -- Create 'public_read' policy if it doesn't exist
  IF NOT policy_exists THEN
    EXECUTE format('
      CREATE POLICY "public_read_%I" ON storage.objects
      FOR SELECT TO public
      USING (bucket_id = %L);
    ', bucket_name, bucket_name);
  END IF;

  RETURN TRUE;
END;
$$;
