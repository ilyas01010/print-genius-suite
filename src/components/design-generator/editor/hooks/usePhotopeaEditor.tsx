
import { useState, useCallback, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { useUser } from "@/context/UserContext";
import { useDesigns } from "@/hooks/use-designs";
import { 
  createNewDocument,
  downloadCurrentDocument, 
  openImageFromURL 
} from "../photopea/photopea-utils";
import { setupKeyboardShortcuts, ShortcutAction } from "../photopea/keyboard-shortcuts";

export const usePhotopeaEditor = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [editorReady, setEditorReady] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [showTemplates, setShowTemplates] = useState(false);
  const [showShortcuts, setShowShortcuts] = useState(false);
  
  const { toast } = useToast();
  const { isAuthenticated } = useUser();
  const { uploadDesign } = useDesigns();
  
  // Toggle fullscreen mode
  const toggleFullscreen = useCallback(() => {
    setIsFullscreen(!isFullscreen);
  }, [isFullscreen]);

  // Handle editor ready state
  const handleEditorReady = useCallback(() => {
    setEditorReady(true);
  }, []);
  
  // Create new document with specific dimensions
  const handleCreateDocument = useCallback((width: number, height: number, dpi: number) => {
    const iframe = document.getElementById('photopea-iframe') as HTMLIFrameElement | null;
    if (!iframe) return;
    
    createNewDocument(iframe, width, height, dpi);
    
    toast({
      title: "New document created",
      description: `Created a ${width}x${height}px canvas at ${dpi} DPI`
    });
  }, [toast]);

  // Handle opening image from URL
  const handleOpenImageFromURL = useCallback(() => {
    const imageUrl = prompt("Enter the URL of the image:");
    if (!imageUrl) return;
    
    const iframe = document.getElementById('photopea-iframe') as HTMLIFrameElement | null;
    if (!iframe) return;
    
    openImageFromURL(iframe, imageUrl);
  }, []);

  // Handle downloading the design
  const handleDownload = useCallback(() => {
    const iframe = document.getElementById('photopea-iframe') as HTMLIFrameElement | null;
    if (!iframe) {
      toast({
        title: "Editor Error",
        description: "Cannot access the design editor",
        variant: "destructive",
      });
      return;
    }
    
    downloadCurrentDocument(iframe);
    
    toast({
      title: "Download started",
      description: "Your design is being downloaded",
    });
  }, [toast]);

  // Handle keyboard shortcuts
  const handleKeyboardAction = useCallback((action: ShortcutAction) => {
    switch (action) {
      case "save":
        handleSaveDesign();
        break;
      case "download":
        handleDownload();
        break;
      case "fullscreen":
        toggleFullscreen();
        break;
      case "openImage":
        handleOpenImageFromURL();
        break;
      case "showHelp":
        setShowHelp(true);
        break;
      case "showTemplates":
        setShowTemplates(true);
        break;
      case "newDocument":
        setShowTemplates(true);
        break;
      default:
        break;
    }
  }, [handleDownload, toggleFullscreen, handleOpenImageFromURL]);

  // Import the save design functionality from the utility file
  const { handleSaveDesign } = usePhotopeaSave({ 
    isAuthenticated, 
    setIsLoading, 
    uploadDesign, 
    toast 
  });

  // Set up keyboard shortcuts
  useEffect(() => {
    if (!editorReady) return;
    
    const cleanupKeyboardShortcuts = setupKeyboardShortcuts(handleKeyboardAction);
    
    return () => {
      cleanupKeyboardShortcuts();
    };
  }, [editorReady, handleKeyboardAction]);

  return {
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
  };
};

import { usePhotopeaSave } from "./usePhotopeaSave";
