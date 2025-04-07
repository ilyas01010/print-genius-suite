
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import PhotopeaToolbar from "./photopea/PhotopeaToolbar";
import PhotopeaEditorContent from "./PhotopeaEditorContent";
import PhotopeaEditorDialogs from "./PhotopeaEditorDialogs";
import { usePhotopeaEditor } from "./hooks/usePhotopeaEditor";

const PhotopeaEditor = () => {
  const {
    isLoading,
    isFullscreen,
    editorReady,
    isAuthenticated,
    showHelp,
    showTemplates,
    showShortcuts,
    handleEditorReady,
    toggleFullscreen,
    handleCreateDocument,
    handleOpenImageFromURL,
    handleDownload,
    handleSaveDesign,
    setShowHelp,
    setShowTemplates,
    setShowShortcuts
  } = usePhotopeaEditor();

  return (
    <Card className={`${isFullscreen ? 'fixed inset-0 z-50 rounded-none' : ''}`}>
      <CardContent className={`p-4 space-y-4 ${isFullscreen ? 'h-screen flex flex-col' : ''}`}>
        {/* Editor Toolbar */}
        <PhotopeaToolbar
          isFullscreen={isFullscreen}
          isLoading={isLoading}
          isAuthenticated={isAuthenticated}
          onToggleFullscreen={toggleFullscreen}
          onDownload={handleDownload}
          onSave={handleSaveDesign}
          onOpenHelp={() => setShowHelp(true)}
          onOpenTemplates={() => setShowTemplates(true)}
          onOpenImageFromURL={handleOpenImageFromURL}
          onShowKeyboardShortcuts={() => setShowShortcuts(true)}
        />

        {/* Photopea Editor Content */}
        <PhotopeaEditorContent 
          isFullscreen={isFullscreen}
          isAuthenticated={isAuthenticated}
          onEditorReady={handleEditorReady}
        />
        
        {/* Dialog Components */}
        <PhotopeaEditorDialogs
          showHelp={showHelp}
          setShowHelp={setShowHelp}
          showTemplates={showTemplates}
          setShowTemplates={setShowTemplates}
          showShortcuts={showShortcuts}
          setShowShortcuts={setShowShortcuts}
          onSelectTemplate={handleCreateDocument}
        />
      </CardContent>
    </Card>
  );
};

export default PhotopeaEditor;
