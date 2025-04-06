
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { HfInference } from "https://esm.sh/@huggingface/inference@2.3.2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const PLACEHOLDER_API = "https://loremflickr.com/1024/1024/";
const HUGGING_FACE_ACCESS_TOKEN = Deno.env.get('HUGGING_FACE_ACCESS_TOKEN');

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
    
    // Check if HuggingFace API token is available
    if (!HUGGING_FACE_ACCESS_TOKEN) {
      console.log("No HUGGING_FACE_ACCESS_TOKEN found, using placeholder image service");
      
      // Create a URL-friendly version of the prompt for the placeholder
      const sanitizedPrompt = encodeURIComponent(prompt.slice(0, 30).replace(/\s+/g, '+'));
      const placeholderUrl = `${PLACEHOLDER_API}${sanitizedPrompt}?random=${Date.now()}`;
      
      return new Response(
        JSON.stringify({ 
          success: true,
          imageUrl: placeholderUrl,
          prompt,
          note: "Using placeholder image as HUGGING_FACE_ACCESS_TOKEN is not configured"
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    try {
      console.log("Initializing Hugging Face inference with token");
      const hf = new HfInference(HUGGING_FACE_ACCESS_TOKEN);
      
      console.log("Generating image with Hugging Face model...");
      // Using the FLUX.1-schnell model which is fast and high quality
      const imageBlob = await hf.textToImage({
        inputs: prompt,
        model: "black-forest-labs/FLUX.1-schnell",
        parameters: {
          negative_prompt: "blurry, bad quality, distorted, watermark",
          guidance_scale: 7.5
        }
      });
      
      // Convert blob to base64 for direct embedding
      const arrayBuffer = await imageBlob.arrayBuffer();
      const base64 = btoa(String.fromCharCode(...new Uint8Array(arrayBuffer)));
      const imageDataUrl = `data:image/jpeg;base64,${base64}`;
      
      console.log("Image successfully generated");
      
      return new Response(
        JSON.stringify({ 
          success: true,
          imageUrl: imageDataUrl,
          prompt
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    } catch (huggingFaceError) {
      console.error("Error with HuggingFace API:", huggingFaceError);
      
      // Fallback to placeholder if Hugging Face call fails
      const sanitizedPrompt = encodeURIComponent(prompt.slice(0, 30).replace(/\s+/g, '+'));
      const placeholderUrl = `${PLACEHOLDER_API}${sanitizedPrompt}?random=${Date.now()}`;
      
      return new Response(
        JSON.stringify({ 
          success: true,
          imageUrl: placeholderUrl,
          prompt,
          note: "Using placeholder image due to Hugging Face API error"
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
