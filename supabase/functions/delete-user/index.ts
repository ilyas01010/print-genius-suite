
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // This endpoint needs authentication
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return new Response(JSON.stringify({ error: "Missing Authorization header" }), { 
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      });
    }

    // Get the JWT token from the Authorization header
    const jwt = authHeader.replace('Bearer ', '');
    
    // Create a Supabase client with the user's JWT
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      {
        global: {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        },
      }
    );

    // Verify the user is authenticated and get their ID
    const { data: { user }, error: authError } = await supabaseClient.auth.getUser();
    
    if (authError || !user) {
      return new Response(JSON.stringify({ error: "Invalid JWT token" }), { 
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      });
    }

    // First, check if it's a POST request to process user deletion
    if (req.method !== "POST") {
      return new Response(JSON.stringify({ error: "Method not allowed" }), { 
        status: 405,
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      });
    }

    // Get the request body
    const { userId } = await req.json();
    
    // Verify the user is trying to delete their own account
    if (userId !== user.id) {
      return new Response(JSON.stringify({ error: "You can only delete your own account" }), { 
        status: 403,
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      });
    }

    // Use the service role client to perform admin operations
    const adminClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      { auth: { persistSession: false } }
    );

    console.log(`Deleting data for user: ${userId}`);

    // Delete user data from any tables
    const { error: designsError } = await adminClient
      .from('designs')
      .delete()
      .eq('user_id', userId);

    if (designsError) {
      console.error("Error deleting user designs:", designsError);
      throw designsError;
    }

    // Delete the user's auth account
    const { error: deleteUserError } = await adminClient.auth.admin.deleteUser(userId);
    
    if (deleteUserError) {
      console.error("Error deleting user:", deleteUserError);
      throw deleteUserError;
    }

    console.log(`Successfully deleted user: ${userId}`);

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" }
    });
  } catch (error) {
    console.error("Error in delete-user function:", error);
    
    return new Response(JSON.stringify({ error: error.message || "Unknown server error" }), { 
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" }
    });
  }
});
