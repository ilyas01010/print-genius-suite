import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase-client";
import { useUser } from "@/context/UserContext";
import { useDesigns } from "@/hooks/use-designs";
import PromptInput from "./text-to-image/PromptInput";
import GeneratedImagePreview from "./text-to-image/GeneratedImagePreview";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { InfoIcon, AlertTriangleIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

const TextToImage = () => {
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [generatedPrompt, setGeneratedPrompt] = useState<string>("");
  const { toast } = useToast();
  const { isAuthenticated } = useUser();
  const { uploadDesign } = useDesigns();
  const [loadingImage, setLoadingImage] = useState(false);
  const [apiNote, setApiNote] = useState<string | null>(null);
  const [apiError, setApiError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast({
        title: "Empty prompt",
        description: "Please enter a description for your design",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsGenerating(true);
      setGeneratedImage(null);
      setApiNote(null);
      setApiError(null);

      const { data, error } = await supabase.functions.invoke('generate-image', {
        body: { prompt: prompt.trim() },
      });

      if (error) {
        console.error("Supabase function error:", error);
        throw new Error(error.message || "Failed to connect to image generation service");
      }

      if (data?.error) {
        console.error("API error:", data.error);
        throw new Error(data.error);
      }

      if (data?.imageUrl) {
        setLoadingImage(true);
        
        // If there's a note from the API (e.g., using placeholder), store it
        if (data.note) {
          setApiNote(data.note);
        }
        
        // Preload the image to ensure it's fully loaded before displaying
        const img = new Image();
        img.onload = () => {
          setGeneratedImage(data.imageUrl);
          setGeneratedPrompt(prompt);
          setLoadingImage(false);
          toast({
            title: "Design generated",
            description: "Your design has been generated successfully",
          });
        };
        img.onerror = () => {
          setLoadingImage(false);
          throw new Error("Failed to load generated image");
        };
        img.src = data.imageUrl;
      } else {
        throw new Error("No image was generated");
      }
    } catch (error: any) {
      console.error("Error generating image:", error);
      toast({
        title: "Generation failed",
        description: error.message || "Failed to generate image. Please try again.",
        variant: "destructive",
      });
      setLoadingImage(false);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSaveDesign = async () => {
    if (!generatedImage || !isAuthenticated) return;

    try {
      toast({
        title: "Saving design",
        description: "Please wait while we save your design...",
      });
      
      // Convert data URL to blob
      const response = await fetch(generatedImage);
      const blob = await response.blob();
      const file = new File([blob], `ai-design-${Date.now()}.png`, { type: 'image/png' });

      await uploadDesign(
        file, 
        `AI Design: ${generatedPrompt.slice(0, 30)}${generatedPrompt.length > 30 ? '...' : ''}`,
        "ai-generated",
        generatedPrompt
      );
    } catch (error: any) {
      console.error("Error saving design:", error);
      toast({
        title: "Save failed",
        description: error.message || "Could not save the design. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleDownload = () => {
    if (!generatedImage) return;
    
    // Create a temporary link to download the image
    const link = document.createElement("a");
    link.href = generatedImage;
    link.download = `ai-design-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast({
      title: "Download started",
      description: "Your design is being downloaded",
    });
  };

  const openSupabaseSettings = () => {
    window.open(`https://supabase.com/dashboard/project/kdpsyldycxyxmmxkjnai/settings/functions`, "_blank");
  };

  return (
    <Card className="mb-6">
      <CardContent className="pt-6">
        {apiError && (
          <Alert className="mb-4 bg-red-50">
            <AlertTriangleIcon className="h-4 w-4 text-red-500" />
            <AlertTitle className="text-red-500">API Key Error</AlertTitle>
            <AlertDescription className="flex flex-col gap-3">
              <div>{apiError}</div>
              <Button 
                variant="outline" 
                size="sm" 
                className="w-fit"
                onClick={openSupabaseSettings}
              >
                Configure Hugging Face API Token
              </Button>
            </AlertDescription>
          </Alert>
        )}
        
        {apiNote && (
          <Alert className="mb-4 bg-yellow-50">
            <InfoIcon className="h-4 w-4" />
            <AlertDescription>
              {apiNote} - The images shown are placeholders.
            </AlertDescription>
          </Alert>
        )}
        
        <PromptInput 
          prompt={prompt}
          setPrompt={setPrompt}
          handleGenerate={handleGenerate}
          isGenerating={isGenerating}
          loadingImage={loadingImage}
        />

        <GeneratedImagePreview 
          generatedImage={generatedImage}
          loadingImage={loadingImage}
          handleDownload={handleDownload}
          handleSaveDesign={handleSaveDesign}
          isAuthenticated={isAuthenticated}
        />
      </CardContent>
    </Card>
  );
};

export default TextToImage;
