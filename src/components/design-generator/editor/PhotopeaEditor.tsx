
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import PhotopeaToolbar from "./photopea/PhotopeaToolbar";
import PhotopeaEditorContent from "./PhotopeaEditorContent";
import PhotopeaEditorDialogs from "./PhotopeaEditorDialogs";
import { usePhotopeaEditor } from "./hooks/usePhotopeaEditor";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Upload, PanelTop } from "lucide-react";
import DesignUploadTab from "../upload/DesignUploadTab";

const PhotopeaEditor = () => {
  const {
    isLoading,
    isFullscreen,
    editorReady,
    isAuthenticated,
    showHelp,
    showTemplates,
    showShortcuts,
    activeTab,
    setActiveTab,
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

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-2 mb-4">
            <TabsTrigger value="editor" className="flex items-center gap-1.5">
              <PanelTop className="h-3.5 w-3.5" />
              Design Editor
            </TabsTrigger>
            <TabsTrigger value="upload" className="flex items-center gap-1.5">
              <Upload className="h-3.5 w-3.5" />
              Upload Image
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="editor" className="mt-0">
            {/* Photopea Editor Content */}
            <PhotopeaEditorContent 
              isFullscreen={isFullscreen}
              isAuthenticated={isAuthenticated}
              onEditorReady={handleEditorReady}
            />
          </TabsContent>
          
          <TabsContent value="upload" className="mt-0">
            <DesignUploadTab />
          </TabsContent>
        </Tabs>
        
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
