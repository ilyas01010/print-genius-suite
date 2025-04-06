
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link, Users, UserRound, MessageSquare } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface CollaborationPanelProps {
  designId?: string;
  designName?: string;
}

interface Collaborator {
  id: string;
  name: string;
  avatar?: string;
  status: "active" | "idle" | "offline";
  lastActive?: string;
}

const CollaborationPanel: React.FC<CollaborationPanelProps> = ({
  designId,
  designName = "Current Design"
}) => {
  const { toast } = useToast();
  const [inviteEmail, setInviteEmail] = useState("");
  
  // Mock collaborators data - in a real app, this would come from a real-time API
  const [collaborators] = useState<Collaborator[]>([
    { 
      id: "1", 
      name: "Alex Johnson", 
      avatar: "https://i.pravatar.cc/100?img=1", 
      status: "active" 
    },
    { 
      id: "2", 
      name: "Sam Smith", 
      avatar: "https://i.pravatar.cc/100?img=2", 
      status: "idle",
      lastActive: "5m ago" 
    },
    { 
      id: "3", 
      name: "Casey Kim", 
      status: "offline",
      lastActive: "1h ago" 
    },
  ]);

  const handleInvite = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inviteEmail) return;
    
    toast({
      title: "Invitation sent",
      description: `Collaboration invitation sent to ${inviteEmail}`,
    });
    setInviteEmail("");
  };

  const handleCopyLink = () => {
    // Generate a shareable link
    const shareableLink = `https://printgenius.app/collab/${designId || "current"}`;
    navigator.clipboard.writeText(shareableLink);
    
    toast({
      title: "Link copied",
      description: "Collaboration link copied to clipboard",
    });
  };

  const getStatusColor = (status: Collaborator["status"]) => {
    switch (status) {
      case "active": return "bg-green-500";
      case "idle": return "bg-yellow-500";
      case "offline": return "bg-gray-500";
      default: return "bg-gray-500";
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5" />
          <span>Collaboration</span>
          <Badge variant="outline" className="ml-2">
            {collaborators.filter(c => c.status !== "offline").length} online
          </Badge>
        </CardTitle>
        <CardDescription>
          Work together on "{designName}"
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="flex flex-wrap gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex items-center gap-1"
            onClick={handleCopyLink}
          >
            <Link className="h-4 w-4" />
            Copy Shareable Link
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            className="flex items-center gap-1"
          >
            <MessageSquare className="h-4 w-4" />
            Open Chat
          </Button>
        </div>
        
        <div className="space-y-2">
          <h3 className="text-sm font-medium">Current Collaborators</h3>
          <div className="space-y-2">
            {collaborators.map((collaborator) => (
              <div key={collaborator.id} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Avatar className="h-7 w-7">
                    <AvatarImage 
                      src={collaborator.avatar} 
                      alt={collaborator.name} 
                    />
                    <AvatarFallback>
                      {collaborator.name.split(" ").map(n => n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">{collaborator.name}</p>
                    <div className="flex items-center gap-1">
                      <span 
                        className={`h-2 w-2 rounded-full ${getStatusColor(collaborator.status)}`} 
                      />
                      <p className="text-xs text-muted-foreground">
                        {collaborator.status === "active" 
                          ? "Active now" 
                          : collaborator.lastActive}
                      </p>
                    </div>
                  </div>
                </div>
                <Button variant="ghost" size="icon" className="h-7 w-7">
                  <MessageSquare className="h-3 w-3" />
                </Button>
              </div>
            ))}
          </div>
        </div>
        
        <form onSubmit={handleInvite} className="flex gap-2 pt-2">
          <Input
            type="email"
            placeholder="colleague@example.com"
            value={inviteEmail}
            onChange={(e) => setInviteEmail(e.target.value)}
            className="flex-1"
          />
          <Button type="submit">Invite</Button>
        </form>
      </CardContent>
      
      <CardFooter className="text-sm text-muted-foreground border-t pt-4">
        <div className="flex items-center gap-1">
          <UserRound className="h-3 w-3" />
          <span>Changes are saved automatically and visible to all collaborators</span>
        </div>
      </CardFooter>
    </Card>
  );
};

export default CollaborationPanel;
