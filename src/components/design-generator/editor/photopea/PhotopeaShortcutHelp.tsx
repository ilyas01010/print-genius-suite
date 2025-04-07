
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Keyboard } from "lucide-react";
import { SHORTCUTS, getShortcutDisplayText } from "./keyboard-shortcuts";

interface PhotopeaShortcutHelpProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const PhotopeaShortcutHelp: React.FC<PhotopeaShortcutHelpProps> = ({
  open,
  onOpenChange,
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Keyboard className="h-5 w-5" />
            Keyboard Shortcuts
          </DialogTitle>
          <DialogDescription>
            Use these keyboard shortcuts for faster access to common actions
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-2">
          <div className="grid grid-cols-2 gap-4">
            {Object.entries(SHORTCUTS).map(([action, shortcut]) => (
              <div key={action} className="flex items-center justify-between border rounded-md p-2">
                <span className="text-sm">{shortcut.description}</span>
                <div className="flex items-center">
                  <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 text-[10px] font-medium text-muted-foreground">
                    {getShortcutDisplayText(shortcut)}
                  </kbd>
                </div>
              </div>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PhotopeaShortcutHelp;
