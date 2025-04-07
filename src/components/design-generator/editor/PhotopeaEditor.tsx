
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import PhotopeaToolbar from "./photopea/PhotopeaToolbar";
import PhotopeaEditorContent from "./PhotopeaEditorContent";
import PhotopeaEditorDialogs from "./PhotopeaEditorDialogs";
import { usePhotopeaEditor } from "./hooks/usePhotopeaEditor";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PanelTop, Upload, Image, Brush } from "lucide-react";
import DesignUploadTab from "../upload/DesignUploadTab";
import BasicDesignEditor from "./BasicDesignEditor";

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
  
  const [imageToEdit, setImageToEdit] = useState<string | undefined>(undefined);
  
  // Handle editing uploaded image in Photopea
  const handleEditInPhotopea = (imageUrl: string) => {
    setImageToEdit(imageUrl);
    setActiveTab("photopea");
  };

  return (
    <Card className={`${isFullscreen ? 'fixed inset-0 z-50 rounded-none' : ''}`}>
      <CardContent className={`p-4 space-y-4 ${isFullscreen ? 'h-screen flex flex-col' : ''}`}>
        {/* Editor Toolbar - Only show when in editor tab */}
        {activeTab === "photopea" && (
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
        )}

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="photopea" className="flex items-center gap-1.5">
              <PanelTop className="h-3.5 w-3.5" />
              Photopea Editor
            </TabsTrigger>
            <TabsTrigger value="basic-editor" className="flex items-center gap-1.5">
              <Brush className="h-3.5 w-3.5" />
              Simple Editor
            </TabsTrigger>
            <TabsTrigger value="upload" className="flex items-center gap-1.5">
              <Upload className="h-3.5 w-3.5" />
              Upload Image
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="photopea" className="mt-0">
            {/* Photopea Editor Content */}
            <PhotopeaEditorContent 
              isFullscreen={isFullscreen}
              isAuthenticated={isAuthenticated}
              onEditorReady={handleEditorReady}
              imageToEdit={imageToEdit}
            />
          </TabsContent>
          
          <TabsContent value="basic-editor" className="mt-0">
            <BasicDesignEditor />
          </TabsContent>
          
          <TabsContent value="upload" className="mt-0">
            <DesignUploadTab onEditInEditor={handleEditInPhotopea} />
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
