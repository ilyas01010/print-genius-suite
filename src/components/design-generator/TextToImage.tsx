
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Save, RefreshCw, Download } from "lucide-react";
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
        setGeneratedImage(data.imageUrl);
        setGeneratedPrompt(prompt);
        toast({
          title: "Design generated",
          description: "Your design has been generated successfully",
        });
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
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSaveDesign = async () => {
    if (!generatedImage || !isAuthenticated) return;

    try {
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
    
    const link = document.createElement("a");
    link.href = generatedImage;
    link.download = `ai-design-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Card className="mb-6">
      <CardContent className="pt-6">
        <div className="space-y-4">
          <div>
            <Textarea
              placeholder="Describe the design you want to create..."
              className="resize-none h-24"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              disabled={isGenerating}
            />
          </div>

          <div className="flex justify-end">
            <Button onClick={handleGenerate} disabled={isGenerating || !prompt.trim()}>
              {isGenerating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Generate Design
                </>
              )}
            </Button>
          </div>

          {generatedImage && (
            <div className="mt-6 space-y-4">
              <div className="border rounded-md overflow-hidden">
                <img
                  src={generatedImage}
                  alt="Generated design"
                  className="w-full h-auto max-h-96 object-contain"
                />
              </div>
              <div className="flex gap-2 justify-end">
                <Button variant="outline" onClick={handleDownload} disabled={!generatedImage}>
                  <Download className="mr-2 h-4 w-4" />
                  Download
                </Button>
                {isAuthenticated && (
                  <Button onClick={handleSaveDesign} disabled={!generatedImage}>
                    <Save className="mr-2 h-4 w-4" />
                    Save to My Designs
                  </Button>
                )}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default TextToImage;
