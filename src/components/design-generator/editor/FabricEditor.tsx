
import React, { useEffect, useRef, useState } from "react";
import { fabric } from "fabric";
import { Card, CardContent } from "@/components/ui/card";
import EditorToolbar from "./EditorToolbar";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { SaveIcon } from "lucide-react";

const FabricEditor = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [canvas, setCanvas] = useState<fabric.Canvas | null>(null);
  const [activeMode, setActiveMode] = useState<'select' | 'draw' | 'rect' | 'circle' | 'text'>('select');
  const { toast } = useToast();
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState("#000000");

  useEffect(() => {
    if (!canvasRef.current) return;
    
    // Initialize Fabric.js canvas
    const canvasInstance = new fabric.Canvas(canvasRef.current, {
      width: 800,
      height: 500,
      backgroundColor: "#ffffff",
      isDrawingMode: false,
    });

    // Initialize with basic background
    const background = new fabric.Rect({
      left: 0,
      top: 0,
      width: 800,
      height: 500,
      fill: "#ffffff",
      selectable: false,
    });
    
    canvasInstance.add(background);
    canvasInstance.renderAll();
    setCanvas(canvasInstance);
    
    toast({
      title: "Design Editor Loaded",
      description: "Start creating your design!",
    });

    // Cleanup on unmount
    return () => {
      canvasInstance.dispose();
    };
  }, [toast]);

  useEffect(() => {
    if (!canvas) return;
    
    // Set drawing mode
    canvas.isDrawingMode = activeMode === 'draw';
    
    // Configure brush
    if (canvas.freeDrawingBrush) {
      canvas.freeDrawingBrush.color = color;
      canvas.freeDrawingBrush.width = 3;
    }
    
    // Handle select mode
    if (activeMode === 'select') {
      canvas.selection = true;
    } else {
      canvas.selection = false;
    }
  }, [activeMode, canvas, color]);

  const addShape = (type: 'rect' | 'circle') => {
    if (!canvas) return;
    
    let shape;
    
    switch (type) {
      case 'rect':
        shape = new fabric.Rect({
          left: 100,
          top: 100,
          width: 100,
          height: 100,
          fill: color,
          stroke: '#000000',
          strokeWidth: 1,
        });
        break;
      case 'circle':
        shape = new fabric.Circle({
          left: 100,
          top: 100,
          radius: 50,
          fill: color,
          stroke: '#000000',
          strokeWidth: 1,
        });
        break;
    }
    
    canvas.add(shape);
    canvas.setActiveObject(shape);
    canvas.renderAll();
    setActiveMode('select');
  };

  const addText = () => {
    if (!canvas) return;
    
    const text = new fabric.IText('Edit this text', {
      left: 100,
      top: 100,
      fontSize: 20,
      fill: color,
    });
    
    canvas.add(text);
    canvas.setActiveObject(text);
    canvas.renderAll();
    setActiveMode('select');
  };

  const clearCanvas = () => {
    if (!canvas) return;
    
    canvas.getObjects()
      .filter(obj => obj !== canvas.backgroundImage)
      .forEach(obj => canvas.remove(obj));
      
    // Re-add white background
    const background = new fabric.Rect({
      left: 0,
      top: 0,
      width: 800,
      height: 500,
      fill: "#ffffff",
      selectable: false,
    });
    
    canvas.add(background);
    canvas.renderAll();
    
    toast({
      title: "Canvas Cleared",
      description: "All objects have been removed.",
    });
  };

  const handleToolChange = (mode: 'select' | 'draw' | 'rect' | 'circle' | 'text') => {
    setActiveMode(mode);
    
    if (mode === 'rect') {
      addShape('rect');
    } else if (mode === 'circle') {
      addShape('circle');
    } else if (mode === 'text') {
      addText();
    }
  };

  const saveDesign = () => {
    if (!canvas) return;
    
    try {
      const dataURL = canvas.toDataURL({
        format: 'png',
        quality: 1,
      });
      
      const link = document.createElement('a');
      link.download = 'pod-design.png';
      link.href = dataURL;
      link.click();
      
      toast({
        title: "Design Saved",
        description: "Your design has been downloaded as PNG.",
      });
    } catch (error) {
      console.error("Error saving design:", error);
      toast({
        title: "Save Failed",
        description: "There was an error saving your design.",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="w-full">
      <CardContent className="p-4 space-y-4">
        <EditorToolbar 
          activeMode={activeMode}
          onModeChange={handleToolChange}
          onColorChange={setColor}
          color={color}
          onClear={clearCanvas}
        />
        
        <div className="border border-border rounded-lg overflow-hidden bg-background shadow-sm">
          <canvas ref={canvasRef} className="w-full max-w-full" />
        </div>
        
        <div className="flex justify-end">
          <Button 
            onClick={saveDesign} 
            className="flex items-center gap-2"
          >
            <SaveIcon className="h-4 w-4" />
            Save Design
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default FabricEditor;
