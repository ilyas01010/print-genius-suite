
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Save, RefreshCw, Download, ImageIcon } from "lucide-react";
import { supabase } from "@/lib/supabase-client";
import { useUser } from "@/context/UserContext";
import { useDesigns } from "@/hooks/use-designs";

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
        <div className="space-y-4">
          <div>
            <Textarea
              placeholder="Describe the design you want to create... (e.g., 'A minimalist t-shirt design with mountains silhouette and sunset')"
              className="resize-none h-24"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              disabled={isGenerating || loadingImage}
            />
          </div>

          <div className="flex justify-end">
            <Button 
              onClick={handleGenerate} 
              disabled={isGenerating || loadingImage || !prompt.trim()}
              className="gap-2"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <RefreshCw className="h-4 w-4" />
                  Generate Design
                </>
              )}
            </Button>
          </div>

          {(loadingImage || generatedImage) && (
            <div className="mt-6 space-y-4">
              <div className="border rounded-md overflow-hidden bg-muted/30 relative">
                {loadingImage && (
                  <div className="absolute inset-0 flex items-center justify-center bg-background/80">
                    <div className="flex flex-col items-center gap-2">
                      <Loader2 className="h-8 w-8 animate-spin text-primary" />
                      <p className="text-sm text-muted-foreground">Loading your design...</p>
                    </div>
                  </div>
                )}
                
                {generatedImage ? (
                  <img
                    src={generatedImage}
                    alt="Generated design"
                    className="w-full h-auto object-contain"
                  />
                ) : (
                  <div className="aspect-square flex items-center justify-center text-muted-foreground">
                    <ImageIcon className="h-16 w-16 opacity-20" />
                  </div>
                )}
              </div>
              
              {generatedImage && (
                <div className="flex gap-2 justify-end">
                  <Button variant="outline" onClick={handleDownload}>
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </Button>
                  {isAuthenticated && (
                    <Button onClick={handleSaveDesign}>
                      <Save className="mr-2 h-4 w-4" />
                      Save to My Designs
                    </Button>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default TextToImage;
