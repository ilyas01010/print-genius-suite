
import React from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { 
  Loader2, 
  RefreshCw,
  Wand2,
  Lightbulb
} from "lucide-react";
import { 
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";

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
  const promptExamples = [
    "A minimalist t-shirt design with mountain silhouette and sunset",
    "Abstract pattern with geometric shapes in blue and orange for a phone case",
    "Watercolor floral wreath with pink and purple flowers for a mug",
    "Vintage badge design with compass for adventure themed poster",
    "Space themed illustration with planets and stars for a hoodie"
  ];

  const usePromptExample = (example: string) => {
    setPrompt(example);
  };

  return (
    <div className="space-y-4">
      <div>
        <div className="flex items-center justify-between mb-2">
          <label htmlFor="design-prompt" className="text-sm font-medium">
            Describe your design
          </label>
          <Popover>
            <PopoverTrigger asChild>
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-8 gap-1 text-muted-foreground"
              >
                <Lightbulb className="h-3.5 w-3.5" />
                <span className="text-xs">Need ideas?</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-0" align="end">
              <div className="p-3">
                <h4 className="font-medium text-sm mb-2">Try these prompts</h4>
                <div className="space-y-2">
                  {promptExamples.map((example, i) => (
                    <Button 
                      key={i} 
                      variant="ghost" 
                      className="w-full justify-start h-auto py-2 px-3 text-xs text-left font-normal"
                      onClick={() => usePromptExample(example)}
                    >
                      {example}
                    </Button>
                  ))}
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
        <Textarea
          id="design-prompt"
          placeholder="Describe the design you want to create... (e.g., 'A minimalist t-shirt design with mountains silhouette and sunset')"
          className="resize-none h-24"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          disabled={isGenerating || loadingImage}
        />
        <p className="text-xs text-muted-foreground mt-1">
          Tip: For better results, include details like style, colors, and intended use (t-shirt, mug, poster, etc.)
        </p>
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
              <Wand2 className="h-4 w-4" />
              Generate Design
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default PromptInput;
