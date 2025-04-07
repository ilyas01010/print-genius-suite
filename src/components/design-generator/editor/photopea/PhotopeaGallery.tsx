
import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useDesigns } from "@/hooks/use-designs";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Image, Trash, Edit } from "lucide-react";
import { openImageFromURL } from "./photopea-utils";

interface PhotopeaGalleryProps {
  onOpenDesign?: () => void;
}

const PhotopeaGallery: React.FC<PhotopeaGalleryProps> = ({ onOpenDesign }) => {
  const { useUserDesigns, useDeleteDesign } = useDesigns();
  const { data: designs = [], isLoading } = useUserDesigns();
  const deleteDesignMutation = useDeleteDesign();
  const { toast } = useToast();

  // Filter designs to show only those created with Photopea
  const photopeaDesigns = designs.filter(design => 
    design.description?.includes("Created with Photopea editor") || 
    design.category === "photopea"
  );

  const handleOpenInEditor = (imageUrl: string) => {
    if (!imageUrl) return;
    
    const iframe = document.getElementById('photopea-iframe') as HTMLIFrameElement | null;
    if (!iframe) {
      toast({
        title: "Editor not ready",
        description: "Please wait for the editor to load",
        variant: "destructive",
      });
      return;
    }
    
    openImageFromURL(iframe, imageUrl);
    
    if (onOpenDesign) {
      onOpenDesign();
    }
    
    toast({
      title: "Design opened",
      description: "Your design has been loaded in the editor"
    });
  };

  const handleDeleteDesign = (designId: string, storagePath: string) => {
    if (confirm("Are you sure you want to delete this design?")) {
      deleteDesignMutation.mutate({ designId, storagePath });
      toast({
        title: "Design deleted",
        description: "Your design has been removed"
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-4 h-24">
        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (photopeaDesigns.length === 0) {
    return (
      <div className="flex items-center justify-center flex-col p-4 h-32 text-center">
        <Image className="h-8 w-8 mb-2 text-muted-foreground opacity-50" />
        <p className="text-sm text-muted-foreground">No recent Photopea designs</p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium">Recent Designs</h3>
        <span className="text-xs text-muted-foreground">{photopeaDesigns.length} items</span>
      </div>
      
      <ScrollArea className="h-40">
        <div className="grid grid-cols-3 gap-2">
          {photopeaDesigns.map((design) => (
            <div 
              key={design.id} 
              className="relative group cursor-pointer rounded-md overflow-hidden border"
            >
              <img
                src={design.publicUrl}
                alt={design.name}
                className="h-full w-full object-cover aspect-square"
                loading="lazy"
                onClick={() => design.publicUrl && handleOpenInEditor(design.publicUrl)}
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1.5">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-7 w-7 text-white"
                  onClick={() => design.publicUrl && handleOpenInEditor(design.publicUrl)}
                >
                  <Edit className="h-3.5 w-3.5" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-7 w-7 text-white"
                  onClick={() => handleDeleteDesign(design.id, design.storage_path)}
                >
                  <Trash className="h-3.5 w-3.5" />
                </Button>
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-black/70 py-0.5 px-1.5 text-[10px] text-white truncate">
                {design.name}
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default PhotopeaGallery;
