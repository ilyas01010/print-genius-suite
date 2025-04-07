
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { HfInference } from 'https://esm.sh/@huggingface/inference@2.3.2'

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
    const { prompt } = await req.json()

    if (!prompt || typeof prompt !== 'string') {
      return new Response(
        JSON.stringify({ error: 'Invalid prompt provided' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      )
    }

    // Check if Hugging Face token is configured
    const hfToken = Deno.env.get('HUGGING_FACE_API_TOKEN')
    
    if (!hfToken) {
      console.warn('HUGGING_FACE_API_TOKEN not configured, using placeholder image')
      
      // Return a placeholder response with a note about the missing token
      return new Response(
        JSON.stringify({
          imageUrl: 'https://placehold.co/600x400/lightblue/white?text=AI+Generated+Design+(Placeholder)',
          note: 'Hugging Face API token not configured. Please add your token in the Supabase project settings.'
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }
    
    // Initialize Hugging Face
    const hf = new HfInference(hfToken)
    
    // Generate image with our prompt using the FLUX.1-schnell model (fast & high quality)
    const imageBlob = await hf.textToImage({
      inputs: prompt,
      model: 'black-forest-labs/FLUX.1-schnell',
      parameters: {
        negative_prompt: 'low quality, blurry, distorted',
      }
    })

    // Convert blob to base64 for response
    const arrayBuffer = await imageBlob.arrayBuffer()
    const base64 = btoa(String.fromCharCode(...new Uint8Array(arrayBuffer)))
    const imageUrl = `data:image/jpeg;base64,${base64}`
    
    return new Response(
      JSON.stringify({ imageUrl }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    console.error('Error generating image:', error)
    
    // Determine if it's an API key error
    const isApiKeyError = error.message?.includes('Authorization') || 
                          error.message?.includes('token') || 
                          error.message?.includes('API key')
    
    if (isApiKeyError) {
      return new Response(
        JSON.stringify({ 
          error: 'Invalid or missing Hugging Face API token', 
          imageUrl: 'https://placehold.co/600x400/orange/white?text=API+Key+Error'
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 401 }
      )
    }
    
    return new Response(
      JSON.stringify({ 
        error: 'Failed to generate image', 
        details: error.message,
        imageUrl: 'https://placehold.co/600x400/red/white?text=Generation+Error'
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    )
  }
})
