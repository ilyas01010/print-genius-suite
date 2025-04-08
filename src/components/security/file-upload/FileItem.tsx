
import React from 'react';
import { File, AlertTriangle, X, Check } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { FileItemProps } from './types';
import { AlertCircle } from 'lucide-react';

const FileItem: React.FC<FileItemProps> = ({ file, onRemove }) => {
  const fileSizeInMB = (file.originalFile.size / (1024 * 1024)).toFixed(2);

  return (
    <div className="bg-card border rounded-md p-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="bg-primary/10 p-2 rounded-md">
            <File className="h-4 w-4 text-primary" />
          </div>
          <div className="overflow-hidden">
            <p className="text-sm font-medium truncate">{file.originalFile.name}</p>
            <p className="text-xs text-muted-foreground">
              {fileSizeInMB} MB
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          {file.status === 'success' && (
            <Check className="h-4 w-4 text-green-500" />
          )}
          {file.status === 'error' && (
            <AlertTriangle className="h-4 w-4 text-destructive" />
          )}
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-6 w-6"
            onClick={() => onRemove(file.id)}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      {(file.status === 'uploading' || file.status === 'pending') && (
        <Progress value={file.progress} className="h-1 mt-2" />
      )}
      
      {file.status === 'error' && file.error && (
        <div className="flex items-center gap-1 mt-2 text-destructive text-xs">
          <AlertCircle className="h-3 w-3" />
          <span>{file.error}</span>
        </div>
      )}
    </div>
  );
};

export default FileItem;
