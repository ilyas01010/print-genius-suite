
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase-client";
import { useUser } from "@/context/UserContext";
import { useDesigns } from "@/hooks/use-designs";
import PromptInput from "./text-to-image/PromptInput";
import GeneratedImagePreview from "./text-to-image/GeneratedImagePreview";

const TextToImage = () => {
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [generatedPrompt, setGeneratedPrompt] = useState<string>("");
  const { toast } = useToast();
  const { isAuthenticated } = useUser();
  const { uploadDesign } = useDesigns();
  const [loadingImage, setLoadingImage] = useState(false);

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

      const { data, error } = await supabase.functions.invoke('generate-image', {
        body: { prompt: prompt.trim() },
      });

      if (error) throw error;

      if (data?.imageUrl) {
        setLoadingImage(true);
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

  return (
    <Card className="mb-6">
      <CardContent className="pt-6">
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
