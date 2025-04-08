
import React, { useEffect, useRef, useState } from "react";
import { fabric } from "fabric";
import { useToast } from "@/hooks/use-toast";

interface CanvasProps {
  activeMode: 'select' | 'draw' | 'rect' | 'circle' | 'text';
  color: string;
  onCanvasReady: (canvas: fabric.Canvas) => void;
}

const Canvas: React.FC<CanvasProps> = ({ activeMode, color, onCanvasReady }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [canvas, setCanvas] = useState<fabric.Canvas | null>(null);
  const { toast } = useToast();
  const [isDrawing, setIsDrawing] = useState(false);

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
    onCanvasReady(canvasInstance);
    
    toast({
      title: "Design Editor Loaded",
      description: "Start creating your design!",
    });

    // Cleanup on unmount
    return () => {
      canvasInstance.dispose();
    };
  }, [toast, onCanvasReady]);

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

  return <canvas ref={canvasRef} className="w-full max-w-full" />;
};

export default Canvas;
