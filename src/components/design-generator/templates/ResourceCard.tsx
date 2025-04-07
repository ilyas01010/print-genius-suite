
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Download, ExternalLink, Info } from "lucide-react";
import { DesignResource } from './ResourceTypes';

interface ResourceCardProps {
  resource: DesignResource;
  onSelect: (resourceId: number) => void;
}

const ResourceCard: React.FC<ResourceCardProps> = ({ resource, onSelect }) => {
  return (
    <Card className="overflow-hidden group h-full flex flex-col">
      <div className="relative aspect-square overflow-hidden bg-muted">
        <img 
          src={resource.imageUrl} 
          alt={resource.name}
          className="w-full h-full object-cover transition-transform group-hover:scale-105"
          loading="lazy"
          onError={(e) => {
            (e.target as HTMLImageElement).src = "/placeholder.svg";
          }}
        />
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
          <Button
            variant="secondary"
            size="sm"
            className="rounded-full"
            onClick={() => window.open(resource.downloadUrl, '_blank')}
          >
            <Download className="h-4 w-4 mr-1" />
            Download
          </Button>
          <Button
            variant="secondary"
            size="sm"
            className="rounded-full"
            onClick={() => onSelect(resource.id)}
          >
            <ExternalLink className="h-4 w-4 mr-1" />
            Use
          </Button>
        </div>
        <div className="absolute top-2 right-2">
          <Badge variant="secondary" className="bg-black/70 text-white text-xs">
            {resource.source}
          </Badge>
        </div>
      </div>
      <CardContent className="p-3 flex-grow flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-start mb-1">
            <h3 className="font-medium text-sm line-clamp-1">{resource.name}</h3>
            {resource.description && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-6 w-6 ml-1 p-0">
                      <Info className="h-3.5 w-3.5" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="top">
                    <p className="max-w-xs text-xs">{resource.description}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </div>
          <div className="flex gap-1 flex-wrap mt-2">
            {resource.tags.slice(0, 3).map((tag, i) => (
              <Badge key={i} variant="outline" className="text-xs font-normal">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ResourceCard;
