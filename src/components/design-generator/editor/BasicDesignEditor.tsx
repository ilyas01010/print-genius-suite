
import React, { useRef, useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useUser } from "@/context/UserContext";
import { useDesigns } from "@/hooks/use-designs";
import EditorToolbar from "./EditorToolbar";
import { compressImage } from "@/lib/image-utils";
import { 
  Square, 
  Circle as CircleIcon, 
  Type, 
  Image as ImageIcon,
  Save,
  Download,
  Undo,
  Redo
} from "lucide-react";

type EditorObject = {
  id: string;
  type: 'text' | 'rectangle' | 'circle' | 'image';
  x: number;
  y: number;
  width: number;
  height: number;
  content?: string;
  color?: string;
  fontSize?: number;
  imageData?: string;
};

const BasicDesignEditor = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [canvasSize, setCanvasSize] = useState({ width: 800, height: 600 });
  const [objects, setObjects] = useState<EditorObject[]>([]);
  const [selectedObject, setSelectedObject] = useState<EditorObject | null>(null);
  const [activeTool, setActiveTool] = useState<'select' | 'text' | 'rectangle' | 'circle' | 'image'>('select');
  const [textInput, setTextInput] = useState("");
  const [color, setColor] = useState("#000000");
  const [fontSize, setFontSize] = useState(24);
  const [history, setHistory] = useState<EditorObject[][]>([]);
  const [future, setFuture] = useState<EditorObject[][]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  
  const { toast } = useToast();
  const { isAuthenticated } = useUser();
  const { uploadDesign } = useDesigns();

  // Initialize canvas
  useEffect(() => {
    const resizeCanvas = () => {
      if (canvasRef.current) {
        const containerWidth = canvasRef.current.parentElement?.clientWidth || 800;
        setCanvasSize({
          width: Math.min(800, containerWidth - 32),
          height: Math.min(600, Math.floor((containerWidth - 32) * 0.75))
        });
      }
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    return () => window.removeEventListener('resize', resizeCanvas);
  }, []);

  // Draw objects whenever they change
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw all objects
    objects.forEach(obj => {
      drawObject(ctx, obj, obj.id === selectedObject?.id);
    });

  }, [objects, selectedObject, canvasSize]);

  // Draw a single object
  const drawObject = (ctx: CanvasRenderingContext2D, obj: EditorObject, isSelected: boolean) => {
    switch (obj.type) {
      case 'text':
        ctx.font = `${obj.fontSize}px Arial`;
        ctx.fillStyle = obj.color || '#000000';
        ctx.fillText(obj.content || '', obj.x, obj.y + obj.fontSize);
        break;
      case 'rectangle':
        ctx.fillStyle = obj.color || '#000000';
        ctx.fillRect(obj.x, obj.y, obj.width, obj.height);
        break;
      case 'circle':
        ctx.fillStyle = obj.color || '#000000';
        ctx.beginPath();
        ctx.arc(obj.x + obj.width/2, obj.y + obj.width/2, obj.width/2, 0, 2 * Math.PI);
        ctx.fill();
        break;
      case 'image':
        if (obj.imageData) {
          const img = new Image();
          img.onload = () => {
            ctx.drawImage(img, obj.x, obj.y, obj.width, obj.height);
            if (isSelected) {
              drawSelectionBorder(ctx, obj);
            }
          };
          img.src = obj.imageData;
        }
        break;
    }

    // Draw selection border if selected
    if (isSelected && obj.type !== 'image') {
      drawSelectionBorder(ctx, obj);
    }
  };

  const drawSelectionBorder = (ctx: CanvasRenderingContext2D, obj: EditorObject) => {
    ctx.strokeStyle = '#0ea5e9';
    ctx.lineWidth = 2;
    ctx.setLineDash([5, 5]);
    ctx.strokeRect(obj.x - 2, obj.y - 2, obj.width + 4, obj.height + 4);
    ctx.setLineDash([]);
  };

  // Add a new object to the canvas
  const addObject = (type: EditorObject['type']) => {
    // Save current state to history
    setHistory(prev => [...prev, [...objects]]);
    setFuture([]);

    const id = Date.now().toString();
    const centerX = canvasSize.width / 2 - 50;
    const centerY = canvasSize.height / 2 - 50;
    
    let newObject: EditorObject;

    switch (type) {
      case 'text':
        newObject = {
          id,
          type: 'text',
          x: centerX,
          y: centerY,
          width: 200,
          height: fontSize,
          content: textInput || 'Enter text here',
          color,
          fontSize
        };
        break;
      case 'rectangle':
        newObject = {
          id,
          type: 'rectangle',
          x: centerX,
          y: centerY,
          width: 100,
          height: 100,
          color
        };
        break;
      case 'circle':
        newObject = {
          id,
          type: 'circle',
          x: centerX,
          y: centerY,
          width: 100,
          height: 100,
          color
        };
        break;
      case 'image':
        // Image object is created when a file is selected
        return;
      default:
        return;
    }

    setObjects(prev => [...prev, newObject]);
    setSelectedObject(newObject);
  };

  // Handle canvas click for object selection
  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (activeTool !== 'select') {
      if (activeTool === 'text' || activeTool === 'rectangle' || activeTool === 'circle') {
        addObject(activeTool);
      }
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Check if click hits any object (in reverse order for top-most objects first)
    for (let i = objects.length - 1; i >= 0; i--) {
      const obj = objects[i];
      if (x >= obj.x && x <= obj.x + obj.width && y >= obj.y && y <= obj.y + obj.height) {
        setSelectedObject(obj);
        return;
      }
    }
    
    // If no object was clicked, deselect
    setSelectedObject(null);
  };

  // Handle tool selection
  const handleToolSelect = (tool: typeof activeTool) => {
    setActiveTool(tool);
    
    if (tool === 'image' && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // Handle image upload
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      try {
        // Save current state to history
        setHistory(prev => [...prev, [...objects]]);
        setFuture([]);
        
        // Convert to data URL
        const reader = new FileReader();
        reader.onload = (event) => {
          const imageData = event.target?.result as string;
          
          // Create image element to get dimensions
          const img = new Image();
          img.onload = () => {
            // Calculate dimensions to fit within canvas while maintaining aspect ratio
            let width = Math.min(img.width, canvasSize.width * 0.8);
            let height = (width / img.width) * img.height;
            
            if (height > canvasSize.height * 0.8) {
              height = canvasSize.height * 0.8;
              width = (height / img.height) * img.width;
            }
            
            const newImageObject: EditorObject = {
              id: Date.now().toString(),
              type: 'image',
              x: (canvasSize.width - width) / 2,
              y: (canvasSize.height - height) / 2,
              width,
              height,
              imageData
            };
            
            setObjects(prev => [...prev, newImageObject]);
            setSelectedObject(newImageObject);
          };
          img.src = imageData;
        };
        
        reader.readAsDataURL(file);
        
        // Reset file input
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
        
        // Switch to select tool
        setActiveTool('select');
        
      } catch (error) {
        console.error('Error uploading image:', error);
        toast({
          title: 'Error',
          description: 'Failed to upload image',
          variant: 'destructive'
        });
      }
    }
  };

  // Handle undo/redo actions
  const handleUndo = () => {
    if (history.length === 0) return;
    
    const previous = history[history.length - 1];
    const current = [...objects];
    
    setObjects(previous);
    setHistory(prev => prev.slice(0, -1));
    setFuture(prev => [current, ...prev]);
  };
  
  const handleRedo = () => {
    if (future.length === 0) return;
    
    const next = future[0];
    const current = [...objects];
    
    setObjects(next);
    setFuture(prev => prev.slice(1));
    setHistory(prev => [...prev, current]);
  };

  // Handle text edit for text objects
  const handleTextEdit = (value: string) => {
    if (!selectedObject || selectedObject.type !== 'text') return;
    
    // Save current state to history
    setHistory(prev => [...prev, [...objects]]);
    setFuture([]);
    
    setObjects(objects.map(obj => 
      obj.id === selectedObject.id
        ? { ...obj, content: value }
        : obj
    ));
    
    setSelectedObject({ ...selectedObject, content: value });
  };

  // Handle color change for selected object
  const handleColorChange = (newColor: string) => {
    if (!selectedObject) return;
    
    // Save current state to history
    setHistory(prev => [...prev, [...objects]]);
    setFuture([]);
    
    setObjects(objects.map(obj => 
      obj.id === selectedObject.id
        ? { ...obj, color: newColor }
        : obj
    ));
    
    setSelectedObject({ ...selectedObject, color: newColor });
    setColor(newColor);
  };

  // Handle font size change for text objects
  const handleFontSizeChange = (size: number) => {
    if (!selectedObject || selectedObject.type !== 'text') return;
    
    // Save current state to history
    setHistory(prev => [...prev, [...objects]]);
    setFuture([]);
    
    setObjects(objects.map(obj => 
      obj.id === selectedObject.id
        ? { ...obj, fontSize: size }
        : obj
    ));
    
    setSelectedObject({ ...selectedObject, fontSize: size });
    setFontSize(size);
  };

  // Delete selected object
  const handleDeleteObject = () => {
    if (!selectedObject) return;
    
    // Save current state to history
    setHistory(prev => [...prev, [...objects]]);
    setFuture([]);
    
    setObjects(objects.filter(obj => obj.id !== selectedObject.id));
    setSelectedObject(null);
  };

  // Save design to user account
  const handleSaveDesign = async () => {
    if (!isAuthenticated) {
      toast({
        title: "Authentication required",
        description: "Please sign in to save designs",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsLoading(true);
      
      const canvas = canvasRef.current;
      if (!canvas) return;
      
      // Convert canvas to blob
      const blob = await new Promise<Blob | null>((resolve) => {
        canvas.toBlob((blob) => resolve(blob), 'image/png');
      });
      
      if (!blob) {
        throw new Error('Failed to generate image from canvas');
      }
      
      // Compress the image before saving
      const compressedBlob = await compressImage(
        new File([blob], `design-${Date.now()}.png`, { type: 'image/png' }),
        1200, 
        0.85
      );
      
      const file = new File([compressedBlob], `design-${Date.now()}.png`, { 
        type: 'image/jpeg' 
      });
      
      await uploadDesign(
        file, 
        "Custom design",
        "custom",
        "Created with the design editor"
      );
      
      toast({
        title: "Design saved",
        description: "Your design has been saved to your account"
      });
      
    } catch (error: any) {
      console.error("Error saving design:", error);
      toast({
        title: "Save failed",
        description: error.message || "Could not save the design. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Download design as PNG
  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    // Create a temporary link to download the canvas as PNG
    const link = document.createElement("a");
    link.href = canvas.toDataURL("image/png");
    link.download = `design-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast({
      title: "Download started",
      description: "Your design is being downloaded",
    });
  };

  return (
    <Card>
      <CardContent className="p-4 space-y-4">
        {/* Editor Toolbar */}
        <div className="flex flex-wrap gap-2 justify-between items-center">
          <div className="flex flex-wrap gap-2">
            <Button 
              variant={activeTool === 'select' ? 'default' : 'outline'} 
              size="sm"
              onClick={() => handleToolSelect('select')}
            >
              Select
            </Button>
            <Button 
              variant={activeTool === 'text' ? 'default' : 'outline'} 
              size="sm"
              onClick={() => handleToolSelect('text')}
            >
              <Type className="h-4 w-4 mr-1" />
              Text
            </Button>
            <Button 
              variant={activeTool === 'rectangle' ? 'default' : 'outline'} 
              size="sm"
              onClick={() => handleToolSelect('rectangle')}
            >
              <Square className="h-4 w-4 mr-1" />
              Rectangle
            </Button>
            <Button 
              variant={activeTool === 'circle' ? 'default' : 'outline'} 
              size="sm"
              onClick={() => handleToolSelect('circle')}
            >
              <CircleIcon className="h-4 w-4 mr-1" />
              Circle
            </Button>
            <Button 
              variant={activeTool === 'image' ? 'default' : 'outline'} 
              size="sm"
              onClick={() => handleToolSelect('image')}
            >
              <ImageIcon className="h-4 w-4 mr-1" />
              Image
            </Button>
            <input 
              ref={fileInputRef}
              type="file" 
              accept="image/*" 
              className="hidden"
              onChange={handleImageUpload}
            />
          </div>
          
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleUndo}
              disabled={history.length === 0}
            >
              <Undo className="h-4 w-4" />
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleRedo}
              disabled={future.length === 0}
            >
              <Redo className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Property controls when object is selected */}
        {selectedObject && (
          <div className="flex flex-wrap gap-2 border rounded-md p-2">
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium">Color:</label>
              <input 
                type="color" 
                value={selectedObject.color || '#000000'} 
                onChange={(e) => handleColorChange(e.target.value)}
                className="h-8 w-8 cursor-pointer rounded border"
              />
            </div>
            
            {selectedObject.type === 'text' && (
              <>
                <div className="flex-1 min-w-[200px]">
                  <label className="text-sm font-medium">Text:</label>
                  <Input 
                    value={selectedObject.content || ''} 
                    onChange={(e) => handleTextEdit(e.target.value)}
                    className="mt-1"
                  />
                </div>
                
                <div className="flex items-center gap-2">
                  <label className="text-sm font-medium">Font Size:</label>
                  <Input 
                    type="number" 
                    value={selectedObject.fontSize || 24}
                    onChange={(e) => handleFontSizeChange(Number(e.target.value))}
                    className="w-20"
                    min={8}
                    max={72}
                  />
                </div>
              </>
            )}
            
            <Button 
              variant="destructive" 
              size="sm"
              onClick={handleDeleteObject}
            >
              Delete
            </Button>
          </div>
        )}

        {/* Canvas Container */}
        <div className="border rounded-md p-4 bg-muted/20 flex justify-center">
          <canvas 
            ref={canvasRef} 
            width={canvasSize.width} 
            height={canvasSize.height}
            onClick={handleCanvasClick}
            className="border bg-white shadow-sm"
          />
        </div>

        {/* Action buttons */}
        <div className="flex justify-end gap-2">
          <Button 
            variant="outline"
            onClick={handleDownload}
          >
            <Download className="h-4 w-4 mr-2" />
            Download
          </Button>
          <Button 
            onClick={handleSaveDesign}
            disabled={isLoading || !isAuthenticated}
          >
            {isLoading ? (
              <span className="animate-pulse">Saving...</span>
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                Save Design
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default BasicDesignEditor;
