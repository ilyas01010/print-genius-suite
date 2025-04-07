
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
  Keyboard,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { SHORTCUTS, getShortcutDisplayText } from "./keyboard-shortcuts";

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
  onShowKeyboardShortcuts: () => void;
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
  onShowKeyboardShortcuts,
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
                <kbd className="ml-1 text-[10px] text-muted-foreground">
                  {getShortcutDisplayText(SHORTCUTS.showHelp)}
                </kbd>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Learn how to use the editor</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" size="sm" onClick={onOpenTemplates}>
                <Settings className="h-4 w-4 mr-1" />
                Templates
                <kbd className="ml-1 text-[10px] text-muted-foreground">
                  {getShortcutDisplayText(SHORTCUTS.showTemplates)}
                </kbd>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Choose from predefined templates</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={onOpenImageFromURL}
              >
                <FileImage className="h-4 w-4 mr-1" />
                Open Image URL
                <kbd className="ml-1 text-[10px] text-muted-foreground">
                  {getShortcutDisplayText(SHORTCUTS.openImage)}
                </kbd>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Open image from URL</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon-sm" 
                onClick={onShowKeyboardShortcuts}
              >
                <Keyboard className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Show keyboard shortcuts</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      
      <div className="flex gap-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" size="sm" onClick={onToggleFullscreen}>
                {isFullscreen ? (
                  <><Minimize2 className="h-4 w-4 mr-1" /> Exit Fullscreen</>
                ) : (
                  <><Maximize2 className="h-4 w-4 mr-1" /> Fullscreen</>
                )}
                <kbd className="ml-1 text-[10px] text-muted-foreground">
                  {getShortcutDisplayText(SHORTCUTS.fullscreen)}
                </kbd>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Toggle fullscreen mode</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="outline"
                size="sm"
                onClick={onDownload}
              >
                <Download className="h-4 w-4 mr-1" />
                Download
                <kbd className="ml-1 text-[10px] text-muted-foreground">
                  {getShortcutDisplayText(SHORTCUTS.download)}
                </kbd>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Download your design</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
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
                    <kbd className="ml-1 text-[10px] text-muted-foreground">
                      {getShortcutDisplayText(SHORTCUTS.save)}
                    </kbd>
                  </>
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Save your design</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
};

export default PhotopeaToolbar;
