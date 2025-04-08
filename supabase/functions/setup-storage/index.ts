
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.4"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }
  
  try {
    // Create a Supabase client with the service role key
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false,
        },
      }
    )
    
    // Check if the designs bucket exists
    const { data: buckets, error: listError } = await supabaseAdmin.storage.listBuckets()
    
    if (listError) {
      throw listError
    }
    
    const designsBucketExists = buckets?.some(bucket => bucket.name === 'designs')
    
    if (!designsBucketExists) {
      // Create the designs bucket
      const { error: createError } = await supabaseAdmin.storage.createBucket('designs', {
        public: true,  // Make it public for ease of use
        fileSizeLimit: 10485760, // 10MB
      })
      
      if (createError) {
        throw createError
      }
      
      console.log('Designs bucket created successfully')
      
      // Set policies using SQL since the Storage API doesn't expose policy methods
      const { error: policiesError } = await supabaseAdmin.rpc('setup_storage_policies', {
        bucket_name: 'designs'
      })
      
      if (policiesError) {
        console.error('Error setting bucket policies:', policiesError)
      }
    } else {
      console.log('Designs bucket already exists')
    }
    
    return new Response(
      JSON.stringify({ success: true, message: 'Storage initialized successfully' }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    )
  } catch (error) {
    console.error('Error initializing storage:', error)
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    )
  }
})
