
import React from "react";
import { Button } from "@/components/ui/button";
import { 
  Square, 
  Circle as CircleIcon, 
  Type, 
  Image as ImageIcon,
  MousePointer,
  Trash2
} from "lucide-react";

interface EditorToolbarProps {
  activeTool: string;
  onToolSelect: (tool: string) => void;
  onDelete: () => void;
  canDelete: boolean;
}

const EditorToolbar = ({ 
  activeTool, 
  onToolSelect, 
  onDelete, 
  canDelete 
}: EditorToolbarProps) => {
  return (
    <div className="flex flex-wrap gap-2 mb-4">
      <Button 
        variant={activeTool === 'select' ? 'default' : 'outline'} 
        size="sm"
        onClick={() => onToolSelect('select')}
      >
        <MousePointer className="h-4 w-4 mr-1" />
        Select
      </Button>
      <Button 
        variant={activeTool === 'text' ? 'default' : 'outline'} 
        size="sm"
        onClick={() => onToolSelect('text')}
      >
        <Type className="h-4 w-4 mr-1" />
        Text
      </Button>
      <Button 
        variant={activeTool === 'rectangle' ? 'default' : 'outline'} 
        size="sm"
        onClick={() => onToolSelect('rectangle')}
      >
        <Square className="h-4 w-4 mr-1" />
        Rectangle
      </Button>
      <Button 
        variant={activeTool === 'circle' ? 'default' : 'outline'} 
        size="sm"
        onClick={() => onToolSelect('circle')}
      >
        <CircleIcon className="h-4 w-4 mr-1" />
        Circle
      </Button>
      <Button 
        variant={activeTool === 'image' ? 'default' : 'outline'} 
        size="sm"
        onClick={() => onToolSelect('image')}
      >
        <ImageIcon className="h-4 w-4 mr-1" />
        Image
      </Button>
      <div className="flex-grow"></div>
      <Button 
        variant="destructive" 
        size="sm"
        onClick={onDelete}
        disabled={!canDelete}
      >
        <Trash2 className="h-4 w-4 mr-1" />
        Delete
      </Button>
    </div>
  );
};

export default EditorToolbar;
