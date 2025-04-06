
import React from "react";
import { Users } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Tooltip, 
  TooltipContent, 
  TooltipProvider, 
  TooltipTrigger 
} from "@/components/ui/tooltip";

interface Collaborator {
  id: string;
  name: string;
  avatar?: string;
}

interface CollaboratorsBadgeProps {
  collaborators: Collaborator[];
  max?: number;
}

const CollaboratorsBadge: React.FC<CollaboratorsBadgeProps> = ({ 
  collaborators, 
  max = 3 
}) => {
  if (!collaborators.length) {
    return null;
  }

  const displayedCollaborators = collaborators.slice(0, max);
  const remainingCount = Math.max(0, collaborators.length - max);

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger className="flex -space-x-2 overflow-hidden">
          {displayedCollaborators.map((collaborator) => (
            <Avatar key={collaborator.id} className="h-6 w-6 border-2 border-background">
              <AvatarImage src={collaborator.avatar} alt={collaborator.name} />
              <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                {collaborator.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
          ))}
          
          {remainingCount > 0 && (
            <div className="h-6 w-6 rounded-full bg-muted flex items-center justify-center border-2 border-background text-xs font-medium">
              +{remainingCount}
            </div>
          )}
        </TooltipTrigger>
        <TooltipContent>
          <div className="space-y-1">
            <p className="text-sm font-medium flex items-center gap-1">
              <Users className="h-3 w-3" />
              <span>{collaborators.length} collaborators</span>
            </p>
            <ul className="text-xs space-y-1">
              {collaborators.map((collaborator) => (
                <li key={collaborator.id}>{collaborator.name}</li>
              ))}
            </ul>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default CollaboratorsBadge;
