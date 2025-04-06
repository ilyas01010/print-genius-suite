
import React from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Loader2, RefreshCw } from "lucide-react";

interface PromptInputProps {
  prompt: string;
  setPrompt: (prompt: string) => void;
  handleGenerate: () => void;
  isGenerating: boolean;
  loadingImage: boolean;
}

const PromptInput = ({
  prompt,
  setPrompt,
  handleGenerate,
  isGenerating,
  loadingImage,
}: PromptInputProps) => {
  return (
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
    </div>
  );
};

export default PromptInput;
