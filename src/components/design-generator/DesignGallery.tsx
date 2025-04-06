
import React from "react";
import { useDesigns } from "@/hooks/use-designs";
import { useUser } from "@/context/UserContext";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreVertical, Trash, Download, Edit } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

const DesignGallery = () => {
  const { useUserDesigns, useDeleteDesign } = useDesigns();
  const { data: designs = [], isLoading, error } = useUserDesigns();
  const deleteDesignMutation = useDeleteDesign();
  const { isAuthenticated } = useUser();

  const handleDeleteDesign = async (designId: string, storagePath: string) => {
    deleteDesignMutation.mutate({ designId, storagePath });
  };

  const handleDownloadDesign = (publicUrl: string, designName: string) => {
    const link = document.createElement("a");
    link.href = publicUrl;
    link.download = `${designName}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>My Designs</CardTitle>
        <CardDescription>Your saved designs and templates</CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="space-y-2">
                <Skeleton className="h-[120px] w-full rounded-md" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-8">
            <p className="text-destructive">Failed to load designs</p>
            <p className="text-sm text-muted-foreground mt-1">
              Please try refreshing the page
            </p>
          </div>
        ) : designs.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {designs.map((design) => (
              <div key={design.id} className="border rounded-md overflow-hidden">
                <div className="relative h-[120px] group">
                  <img
                    src={design.publicUrl}
                    alt={design.name}
                    className="h-full w-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "/placeholder.svg";
                    }}
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <Button
                      variant="secondary"
                      size="icon"
                      onClick={() => design.publicUrl && handleDownloadDesign(design.publicUrl, design.name)}
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button variant="secondary" size="icon">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="absolute top-2 right-2">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() => handleDeleteDesign(design.id, design.storage_path)}
                          className="text-destructive"
                          disabled={deleteDesignMutation.isPending}
                        >
                          <Trash className="h-4 w-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
                <div className="p-3">
                  <h4 className="text-sm font-medium truncate">{design.name}</h4>
                  <p className="text-xs text-muted-foreground truncate">
                    {design.category || "Uncategorized"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-muted-foreground">You don't have any saved designs yet.</p>
            <p className="text-sm text-muted-foreground mt-1">
              Upload or create a design to get started.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DesignGallery;
