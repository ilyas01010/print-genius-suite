
import React from 'react';
import { Button } from "@/components/ui/button";
import { MousePointer, Pencil, Square, Circle, Type, Trash2 } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';

interface EditorToolbarProps {
  activeMode: 'select' | 'draw' | 'rect' | 'circle' | 'text';
  onModeChange: (mode: 'select' | 'draw' | 'rect' | 'circle' | 'text') => void;
  onColorChange: (color: string) => void;
  onClear: () => void;
  color: string;
}

const EditorToolbar = ({ 
  activeMode, 
  onModeChange, 
  onColorChange, 
  onClear,
  color 
}: EditorToolbarProps) => {
  return (
    <div className="flex items-center gap-2 p-1 bg-muted/50 rounded-md">
      <div className="flex space-x-1">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button 
              variant={activeMode === 'select' ? 'default' : 'outline'} 
              size="icon" 
              onClick={() => onModeChange('select')}
            >
              <MousePointer className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Select</TooltipContent>
        </Tooltip>
        
        <Tooltip>
          <TooltipTrigger asChild>
            <Button 
              variant={activeMode === 'draw' ? 'default' : 'outline'} 
              size="icon" 
              onClick={() => onModeChange('draw')}
            >
              <Pencil className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Draw</TooltipContent>
        </Tooltip>
      </div>
      
      <Separator orientation="vertical" className="h-8" />
      
      <div className="flex space-x-1">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button 
              variant={activeMode === 'rect' ? 'default' : 'outline'} 
              size="icon" 
              onClick={() => onModeChange('rect')}
            >
              <Square className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Rectangle</TooltipContent>
        </Tooltip>
        
        <Tooltip>
          <TooltipTrigger asChild>
            <Button 
              variant={activeMode === 'circle' ? 'default' : 'outline'} 
              size="icon" 
              onClick={() => onModeChange('circle')}
            >
              <Circle className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Circle</TooltipContent>
        </Tooltip>
        
        <Tooltip>
          <TooltipTrigger asChild>
            <Button 
              variant={activeMode === 'text' ? 'default' : 'outline'} 
              size="icon" 
              onClick={() => onModeChange('text')}
            >
              <Type className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Text</TooltipContent>
        </Tooltip>
      </div>
      
      <Separator orientation="vertical" className="h-8" />
      
      <div className="flex items-center gap-2">
        <div className="flex items-center">
          <label htmlFor="colorpicker" className="sr-only">Color</label>
          <Input
            id="colorpicker"
            type="color"
            value={color}
            onChange={(e) => onColorChange(e.target.value)}
            className="w-8 h-8 p-0 border cursor-pointer"
          />
        </div>
        
        <Tooltip>
          <TooltipTrigger asChild>
            <Button 
              variant="destructive" 
              size="icon" 
              onClick={onClear}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Clear Canvas</TooltipContent>
        </Tooltip>
      </div>
    </div>
  );
};

export default EditorToolbar;
