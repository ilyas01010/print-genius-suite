
import React from "react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, ChevronRight } from "lucide-react";
import { Platform } from "./types";

interface PlatformCardProps {
  platform: Platform;
  onConnect: (platformId: string) => void;
  onDisconnect: (platformId: string) => void;
  onViewDetails: () => void;
}

const PlatformCard = ({ platform, onConnect, onDisconnect, onViewDetails }: PlatformCardProps) => {
  return (
    <Card className={platform.status === "connected" ? "border-primary/20" : ""}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="h-7 w-7 sm:h-8 sm:w-8 overflow-hidden">
              <img 
                src={platform.logo} 
                alt={`${platform.name} logo`} 
                className="h-full w-full object-contain"
              />
            </div>
            <CardTitle className="text-base sm:text-lg">{platform.name}</CardTitle>
          </div>
          <Badge variant={platform.status === "connected" ? "default" : "outline"}>
            {platform.status === "connected" ? (
              <span className="flex items-center">
                <Check className="mr-1 h-3 w-3" /> Connected
              </span>
            ) : platform.status === "connecting" ? (
              "Connecting..."
            ) : "Not Connected"}
          </Badge>
        </div>
      </CardHeader>
      
      {platform.status === "connected" && (
        <>
          <CardContent className="pb-2">
            <div className="flex justify-between text-sm mb-1">
              <span className="text-muted-foreground">Products:</span>
              <span className="font-medium">{platform.products}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Revenue:</span>
              <span className="font-medium">${platform.revenue.toFixed(2)}</span>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between pt-0">
            <Button 
              variant="secondary" 
              size="sm" 
              className="text-xs" 
              onClick={() => onDisconnect(platform.id)} 
              disabled={platform.status === "connecting"}
            >
              Disconnect
            </Button>
            
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-xs flex items-center" 
              onClick={onViewDetails}
            >
              View Details <ChevronRight className="h-3 w-3 ml-1" />
            </Button>
          </CardFooter>
        </>
      )}
      
      {platform.status !== "connected" && (
        <CardFooter className="pt-0">
          <Button 
            className="w-full"
            onClick={() => onConnect(platform.id)}
            disabled={platform.status === "connecting"}
          >
            {platform.status === "connecting" ? "Connecting..." : "Connect"}
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default PlatformCard;
