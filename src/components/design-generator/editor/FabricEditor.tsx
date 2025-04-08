
import React, { useState } from "react";
import { fabric } from "fabric";
import { Card, CardContent } from "@/components/ui/card";
import EditorToolbar from "./EditorToolbar";
import Canvas from "./components/Canvas";
import SaveButton from "./components/SaveButton";
import { addShape, addText, clearCanvas } from "./utils/canvasUtils";

const FabricEditor = () => {
  const [canvas, setCanvas] = useState<fabric.Canvas | null>(null);
  const [activeMode, setActiveMode] = useState<'select' | 'draw' | 'rect' | 'circle' | 'text'>('select');
  const [color, setColor] = useState("#000000");

  const handleToolChange = (mode: 'select' | 'draw' | 'rect' | 'circle' | 'text') => {
    setActiveMode(mode);
    
    if (mode === 'rect') {
      addShape(canvas as fabric.Canvas, 'rect', color);
      setActiveMode('select');
    } else if (mode === 'circle') {
      addShape(canvas as fabric.Canvas, 'circle', color);
      setActiveMode('select');
    } else if (mode === 'text') {
      addText(canvas as fabric.Canvas, color);
      setActiveMode('select');
    }
  };

  const handleClearCanvas = () => {
    clearCanvas(canvas as fabric.Canvas);
  };

  return (
    <Card className="w-full">
      <CardContent className="p-4 space-y-4">
        <EditorToolbar 
          activeMode={activeMode}
          onModeChange={handleToolChange}
          onColorChange={setColor}
          color={color}
          onClear={handleClearCanvas}
        />
        
        <div className="border border-border rounded-lg overflow-hidden bg-background shadow-sm">
          <Canvas 
            activeMode={activeMode} 
            color={color} 
            onCanvasReady={(canvasInstance) => setCanvas(canvasInstance)}
          />
        </div>
        
        <div className="flex justify-end">
          <SaveButton canvas={canvas} />
        </div>
      </CardContent>
    </Card>
  );
};

export default FabricEditor;
