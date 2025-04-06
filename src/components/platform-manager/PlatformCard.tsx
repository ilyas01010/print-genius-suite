
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { ExternalLink, AlertCircle, CheckCircle, RefreshCw } from "lucide-react";
import { Platform } from "./types";
import { Link } from "react-router-dom";

interface PlatformCardProps {
  platform: Platform;
  onReconnect: (platformId: string) => void;
  onViewDetails: (platformId: string) => void;
}

const PlatformCard: React.FC<PlatformCardProps> = ({ platform, onReconnect, onViewDetails }) => {
  const getStatusBadge = () => {
    switch (platform.status) {
      case "connected":
        return (
          <Badge className="bg-green-500/20 text-green-600 hover:bg-green-500/30 dark:bg-green-800/30 dark:text-green-400 dark:hover:bg-green-800/40">
            <CheckCircle className="h-3 w-3 mr-1" />
            Connected
          </Badge>
        );
      case "error":
        return (
          <Badge variant="destructive">
            <AlertCircle className="h-3 w-3 mr-1" />
            Error
          </Badge>
        );
      case "disconnected":
        return (
          <Badge variant="outline" className="border-amber-500 text-amber-500">
            Disconnected
          </Badge>
        );
      case "connecting":
        return (
          <Badge className="bg-blue-500/20 text-blue-600 hover:bg-blue-500/30 dark:bg-blue-800/30 dark:text-blue-400 dark:hover:bg-blue-800/40">
            <RefreshCw className="h-3 w-3 mr-1 animate-spin" />
            Connecting
          </Badge>
        );
      default:
        return (
          <Badge variant="outline">
            Unknown
          </Badge>
        );
    }
  };

  const isDisconnectedOrError = platform.status === "disconnected" || platform.status === "error";
  const isConnected = platform.status === "connected";

  // Using type guard for safer comparison
  const isConnecting = platform.status === "connecting";

  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded overflow-hidden">
              <img 
                src={platform.icon || "/placeholder.svg"} 
                alt={platform.name} 
                className="h-full w-full object-contain"
              />
            </div>
            <div>
              <CardTitle className="text-lg">{platform.name}</CardTitle>
              {getStatusBadge()}
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pb-3">
        <CardDescription className="mb-2">{platform.description}</CardDescription>
        
        <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
          <div className="flex flex-col">
            <span className="text-muted-foreground">Products</span>
            <span className="font-medium">{platform.productsCount}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-muted-foreground">Active</span>
            <span className="font-medium">{platform.activeProductsCount}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-muted-foreground">Sales (30d)</span>
            <span className="font-medium">{platform.sales30d}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-muted-foreground">Revenue (30d)</span>
            <span className="font-medium">${platform.revenue30d}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between pt-2">
        {isConnected ? (
          <>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => onViewDetails(platform.id)}
              className="w-full"
            >
              View Details
            </Button>
            
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="px-2"
                    asChild
                  >
                    <Link to={platform.url} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4" />
                    </Link>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>View on {platform.name}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </>
        ) : (
          <Button 
            variant={isDisconnectedOrError ? "default" : "outline"}
            size="sm"
            onClick={() => onReconnect(platform.id)}
            disabled={isConnecting}
            className="w-full"
          >
            {isConnecting ? (
              <>
                <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                Connecting...
              </>
            ) : isDisconnectedOrError ? (
              "Connect"
            ) : (
              "Retry Connection"
            )}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default PlatformCard;
