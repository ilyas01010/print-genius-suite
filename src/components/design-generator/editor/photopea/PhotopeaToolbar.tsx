
import React from "react";
import { Button } from "@/components/ui/button";
import {
  Download,
  FileImage,
  HelpCircle,
  Maximize2,
  Minimize2,
  Save,
  Settings,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface PhotopeaToolbarProps {
  isFullscreen: boolean;
  isLoading: boolean;
  isAuthenticated: boolean;
  onToggleFullscreen: () => void;
  onDownload: () => void;
  onSave: () => void;
  onOpenHelp: () => void;
  onOpenTemplates: () => void;
  onOpenImageFromURL: () => void;
}

const PhotopeaToolbar: React.FC<PhotopeaToolbarProps> = ({
  isFullscreen,
  isLoading,
  isAuthenticated,
  onToggleFullscreen,
  onDownload,
  onSave,
  onOpenHelp,
  onOpenTemplates,
  onOpenImageFromURL,
}) => {
  return (
    <div className="flex flex-wrap gap-2 justify-between items-center">
      <div className="flex flex-wrap gap-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" size="sm" onClick={onOpenHelp}>
                <HelpCircle className="h-4 w-4 mr-1" />
                Help
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Learn how to use the editor</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <Button variant="outline" size="sm" onClick={onOpenTemplates}>
          <Settings className="h-4 w-4 mr-1" />
          Templates
        </Button>

        <Button 
          variant="outline" 
          size="sm" 
          onClick={onOpenImageFromURL}
        >
          <FileImage className="h-4 w-4 mr-1" />
          Open Image URL
        </Button>
      </div>
      
      <div className="flex gap-2">
        <Button variant="outline" size="sm" onClick={onToggleFullscreen}>
          {isFullscreen ? (
            <><Minimize2 className="h-4 w-4 mr-1" /> Exit Fullscreen</>
          ) : (
            <><Maximize2 className="h-4 w-4 mr-1" /> Fullscreen</>
          )}
        </Button>
        <Button 
          variant="outline"
          size="sm"
          onClick={onDownload}
        >
          <Download className="h-4 w-4 mr-1" />
          Download
        </Button>
        <Button 
          onClick={onSave}
          disabled={isLoading || !isAuthenticated}
          size="sm"
        >
          {isLoading ? (
            <span className="animate-pulse">Saving...</span>
          ) : (
            <>
              <Save className="h-4 w-4 mr-1" />
              Save Design
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default PhotopeaToolbar;
