
import React from "react";
import PhotopeaHelp from "./photopea/PhotopeaHelp";
import PhotopeaTemplates from "./photopea/PhotopeaTemplates";
import PhotopeaShortcutHelp from "./photopea/PhotopeaShortcutHelp";

interface PhotopeaEditorDialogsProps {
  showHelp: boolean;
  setShowHelp: (show: boolean) => void;
  showTemplates: boolean;
  setShowTemplates: (show: boolean) => void;
  showShortcuts: boolean;
  setShowShortcuts: (show: boolean) => void;
  onSelectTemplate: (width: number, height: number, dpi: number) => void;
}

const PhotopeaEditorDialogs: React.FC<PhotopeaEditorDialogsProps> = ({
  showHelp,
  setShowHelp,
  showTemplates,
  setShowTemplates,
  showShortcuts,
  setShowShortcuts,
  onSelectTemplate
}) => {
  return (
    <>
      {/* Help Dialog */}
      <PhotopeaHelp
        open={showHelp}
        onOpenChange={setShowHelp}
      />
      
      {/* Templates Dialog */}
      <PhotopeaTemplates
        open={showTemplates}
        onOpenChange={setShowTemplates}
        onSelectTemplate={onSelectTemplate}
      />

      {/* Keyboard Shortcuts Help Dialog */}
      <PhotopeaShortcutHelp 
        open={showShortcuts}
        onOpenChange={setShowShortcuts}
      />
    </>
  );
};

export default PhotopeaEditorDialogs;
