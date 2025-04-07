
import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { AlertCircle, Upload, Check, File, AlertTriangle, X } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { sanitizeFileName } from '@/lib/security/inputValidation';

interface SecureFileUploadProps {
  allowedFileTypes: string[];
  maxSizeMB: number;
  onFileSelected: (file: File, secureFileName: string) => Promise<void>;
  multiple?: boolean;
  label?: string;
  className?: string;
}

interface UploadingFile {
  id: string;
  originalFile: File;
  secureFileName: string;
  progress: number;
  status: 'pending' | 'uploading' | 'success' | 'error';
  error?: string;
}

const SecureFileUpload: React.FC<SecureFileUploadProps> = ({
  allowedFileTypes,
  maxSizeMB,
  onFileSelected,
  multiple = false,
  label = 'Upload File',
  className = '',
}) => {
  const [files, setFiles] = useState<UploadingFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const maxSizeBytes = maxSizeMB * 1024 * 1024;
  
  const validateFile = (file: File): { valid: boolean; reason?: string } => {
    // Check if file type is allowed
    const fileType = file.type.toLowerCase();
    const fileExtension = file.name.split('.').pop()?.toLowerCase();
    const isValidType = allowedFileTypes.some(type => {
      const typeLower = type.toLowerCase();
      return fileType === typeLower || 
        (fileExtension && typeLower === `.${fileExtension}`) ||
        (typeLower.startsWith('.') && fileExtension === typeLower.substring(1));
    });
    
    if (!isValidType) {
      return { valid: false, reason: `File type not allowed. Accepted types: ${allowedFileTypes.join(', ')}` };
    }
    
    // Check file size
    if (file.size > maxSizeBytes) {
      return { valid: false, reason: `File size exceeds maximum allowed size (${maxSizeMB} MB)` };
    }
    
    return { valid: true };
  };
  
  const handleFileSelect = (selectedFiles: FileList | null) => {
    if (!selectedFiles || selectedFiles.length === 0) return;
    
    const newFiles: UploadingFile[] = [];
    
    for (let i = 0; i < selectedFiles.length; i++) {
      const file = selectedFiles[i];
      const validation = validateFile(file);
      
      if (!validation.valid) {
        toast({
          title: 'Invalid file',
          description: validation.reason,
          variant: 'destructive'
        });
        continue;
      }
      
      // Create a secure filename
      const secureFileName = sanitizeFileName(file.name);
      
      newFiles.push({
        id: `file-${Date.now()}-${i}`,
        originalFile: file,
        secureFileName,
        progress: 0,
        status: 'pending',
      });
    }
    
    if (newFiles.length > 0) {
      if (!multiple) {
        // Replace existing files if not multiple
        setFiles(newFiles);
      } else {
        // Add to existing files if multiple
        setFiles(prevFiles => [...prevFiles, ...newFiles]);
      }
      
      // Start uploading the files
      newFiles.forEach(fileObj => handleUpload(fileObj));
    }
  };
  
  const handleUpload = async (fileObj: UploadingFile) => {
    try {
      // Mark file as uploading
      setFiles(prevFiles => prevFiles.map(f => 
        f.id === fileObj.id ? { ...f, status: 'uploading' } : f
      ));
      
      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setFiles(prevFiles => {
          const updatedFiles = prevFiles.map(f => {
            if (f.id === fileObj.id && f.status === 'uploading' && f.progress < 90) {
              return { ...f, progress: f.progress + 10 };
            }
            return f;
          });
          return updatedFiles;
        });
      }, 200);
      
      // Call the provided upload function
      await onFileSelected(fileObj.originalFile, fileObj.secureFileName);
      
      // Clear interval and mark upload as successful
      clearInterval(progressInterval);
      
      setFiles(prevFiles => prevFiles.map(f => 
        f.id === fileObj.id ? { ...f, status: 'success', progress: 100 } : f
      ));
      
      toast({
        title: 'File uploaded',
        description: 'Your file has been uploaded successfully.',
      });
      
    } catch (error) {
      console.error('Upload error:', error);
      
      setFiles(prevFiles => prevFiles.map(f => 
        f.id === fileObj.id ? { 
          ...f, 
          status: 'error',
          error: error instanceof Error ? error.message : 'Upload failed'
        } : f
      ));
      
      toast({
        title: 'Upload failed',
        description: error instanceof Error ? error.message : 'An error occurred while uploading the file.',
        variant: 'destructive',
      });
    }
  };
  
  const removeFile = (id: string) => {
    setFiles(prevFiles => prevFiles.filter(f => f.id !== id));
  };
  
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
    handleFileSelect(e.dataTransfer.files);
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
        onChange={(e) => handleFileSelect(e.target.files)}
        className="hidden"
        multiple={multiple}
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
      
      {/* File list */}
      {files.length > 0 && (
        <div className="mt-4 space-y-3">
          {files.map((file) => (
            <div key={file.id} className="bg-card border rounded-md p-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="bg-primary/10 p-2 rounded-md">
                    <File className="h-4 w-4 text-primary" />
                  </div>
                  <div className="overflow-hidden">
                    <p className="text-sm font-medium truncate">{file.originalFile.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {(file.originalFile.size / (1024 * 1024)).toFixed(2)} MB
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
                    onClick={() => removeFile(file.id)}
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
          ))}
        </div>
      )}
    </div>
  );
};

export default SecureFileUpload;
