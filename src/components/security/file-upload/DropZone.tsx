
import React from 'react';
import { Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { DropZoneProps } from './types';

const DropZone: React.FC<DropZoneProps> = ({
  onFileSelect,
  isDragging,
  setIsDragging,
  label,
  allowedFileTypes,
  maxSizeMB,
  fileInputRef,
  className = '',
}) => {
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };
  
  const handleDragLeave = () => {
    setIsDragging(false);
  };
  
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    onFileSelect(e.dataTransfer.files);
  };
  
  const browseFiles = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className={className}>
      {/* Hidden file input */}
      <Input
        ref={fileInputRef}
        type="file"
        onChange={(e) => onFileSelect(e.target.files)}
        className="hidden"
        multiple={false}
        accept={allowedFileTypes.join(',')}
      />
      
      {/* Drop zone */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`
          border-2 border-dashed rounded-lg p-6 text-center transition-colors
          ${isDragging ? 'bg-primary/10 border-primary' : 'bg-card/50 border-border hover:bg-card/80'}
        `}
      >
        <div className="flex flex-col items-center justify-center space-y-2">
          <div className="p-3 bg-primary/10 rounded-full">
            <Upload className="h-6 w-6 text-primary" />
          </div>
          <h3 className="font-medium text-foreground">{label}</h3>
          <p className="text-sm text-muted-foreground">
            Drag and drop your files here, or click to browse
          </p>
          <div className="text-xs text-muted-foreground mt-1">
            Allowed types: {allowedFileTypes.join(', ')} • Max size: {maxSizeMB} MB
          </div>
          <Button variant="outline" onClick={browseFiles} className="mt-4">
            Browse Files
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DropZone;
