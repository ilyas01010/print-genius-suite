
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY');
const PLACEHOLDER_API = "https://loremflickr.com/1024/1024/";

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { prompt } = await req.json();
    
    if (!prompt) {
      return new Response(
        JSON.stringify({ error: 'Prompt is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    
    console.log(`Generating image for prompt: ${prompt}`);
    
    // If OpenAI API key is not available, use placeholder image service
    if (!OPENAI_API_KEY) {
      console.log("No OPENAI_API_KEY found, using placeholder image service");
      
      // Create a URL-friendly version of the prompt for the placeholder
      const sanitizedPrompt = encodeURIComponent(prompt.slice(0, 30).replace(/\s+/g, '+'));
      const placeholderUrl = `${PLACEHOLDER_API}${sanitizedPrompt}?random=${Date.now()}`;
      
      return new Response(
        JSON.stringify({ 
          success: true,
          imageUrl: placeholderUrl,
          prompt,
          note: "Using placeholder image as OPENAI_API_KEY is not configured"
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Attempt to call OpenAI's API
    try {
      const openaiResponse = await fetch('https://api.openai.com/v1/images/generations', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: "dall-e-3",
          prompt: prompt,
          n: 1,
          size: "1024x1024",
        }),
      });
      
      if (!openaiResponse.ok) {
        const error = await openaiResponse.json();
        console.error("OpenAI API error:", error);
        
        // Fallback to placeholder if OpenAI call fails
        const sanitizedPrompt = encodeURIComponent(prompt.slice(0, 30).replace(/\s+/g, '+'));
        const placeholderUrl = `${PLACEHOLDER_API}${sanitizedPrompt}?random=${Date.now()}`;
        
        return new Response(
          JSON.stringify({ 
            success: true,
            imageUrl: placeholderUrl,
            prompt,
            note: "Using placeholder image due to OpenAI API error"
          }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      const data = await openaiResponse.json();
      const imageUrl = data.data[0].url;
      
      console.log(`Successfully generated image for prompt: ${prompt}`);
      
      return new Response(
        JSON.stringify({ 
          success: true,
          imageUrl,
          prompt,
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    } catch (openaiError) {
      console.error("Error with OpenAI API:", openaiError);
      
      // Fallback to placeholder if OpenAI call fails
      const sanitizedPrompt = encodeURIComponent(prompt.slice(0, 30).replace(/\s+/g, '+'));
      const placeholderUrl = `${PLACEHOLDER_API}${sanitizedPrompt}?random=${Date.now()}`;
      
      return new Response(
        JSON.stringify({ 
          success: true,
          imageUrl: placeholderUrl,
          prompt,
          note: "Using placeholder image due to OpenAI API error"
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
  } catch (error) {
    console.error("Error in edge function:", error);
    return new Response(
      JSON.stringify({ error: error.message || 'Failed to generate image', details: String(error) }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
