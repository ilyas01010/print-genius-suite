
import { fabric } from "fabric";

export const addShape = (canvas: fabric.Canvas, type: 'rect' | 'circle', color: string) => {
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
  
  canvas.add(shape as fabric.Object);
  canvas.setActiveObject(shape as fabric.Object);
  canvas.renderAll();
};

export const addText = (canvas: fabric.Canvas, color: string) => {
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
};

export const clearCanvas = (canvas: fabric.Canvas) => {
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
};

export const saveDesignAsImage = (canvas: fabric.Canvas): string | null => {
  if (!canvas) return null;
  
  try {
    return canvas.toDataURL({
      format: 'png',
      quality: 1,
    });
  } catch (error) {
    console.error("Error converting canvas to image:", error);
    return null;
  }
};
