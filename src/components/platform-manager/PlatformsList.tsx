
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Platform, NewPlatform } from "./types";
import PlatformCard from "./PlatformCard";
import AddPlatformCard from "./AddPlatformCard";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

interface PlatformsListProps {
  platforms: Platform[];
  availablePlatforms: NewPlatform[];
  onAddPlatform: (platform: NewPlatform) => void;
  onConnectPlatform: (platformId: string) => void;
  onDisconnectPlatform: (platformId: string) => void;
  onViewAnalytics: () => void;
  showAddPlatformDialog: boolean;
  setShowAddPlatformDialog: (show: boolean) => void;
}

const PlatformsList = ({
  platforms,
  availablePlatforms,
  onAddPlatform,
  onConnectPlatform,
  onDisconnectPlatform,
  onViewAnalytics,
  showAddPlatformDialog,
  setShowAddPlatformDialog
}: PlatformsListProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
      {platforms.map((platform) => (
        <PlatformCard
          key={platform.id}
          platform={platform}
          onReconnect={onConnectPlatform}
          onViewDetails={() => onViewAnalytics()}
        />
      ))}
      
      <AddPlatformCard onClick={() => setShowAddPlatformDialog(true)} />
      
      <Dialog open={showAddPlatformDialog} onOpenChange={setShowAddPlatformDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add New Platform</DialogTitle>
            <DialogDescription>Select a platform to add to your dashboard.</DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 py-4">
            {availablePlatforms.map((platform) => (
              <Button
                key={platform.id}
                variant="outline"
                className="h-auto flex flex-col items-center justify-center p-3 hover:bg-muted"
                onClick={() => onAddPlatform(platform)}
              >
                <div className="h-8 w-8 overflow-hidden mb-2">
                  <img 
                    src={platform.logo} 
                    alt={`${platform.name} logo`} 
                    className="h-full w-full object-contain" 
                  />
                </div>
                <span className="text-xs text-center">{platform.name}</span>
              </Button>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PlatformsList;
