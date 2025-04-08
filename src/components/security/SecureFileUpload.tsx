
import React, { useState, useRef } from 'react';
import { toast } from '@/hooks/use-toast';
import { sanitizeFileName } from '@/lib/security/inputValidation';
import DropZone from './file-upload/DropZone';
import FileList from './file-upload/FileList';
import { validateFile } from './file-upload/FileValidator';
import { FileUploadProps, UploadingFile } from './file-upload/types';

const SecureFileUpload: React.FC<FileUploadProps> = ({
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
  
  const handleFileSelect = (selectedFiles: FileList | null) => {
    if (!selectedFiles || selectedFiles.length === 0) return;
    
    const newFiles: UploadingFile[] = [];
    
    for (let i = 0; i < selectedFiles.length; i++) {
      const file = selectedFiles[i];
      const validation = validateFile(file, allowedFileTypes, maxSizeMB);
      
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

  return (
    <div className={className}>
      <DropZone 
        onFileSelect={handleFileSelect}
        isDragging={isDragging}
        setIsDragging={setIsDragging}
        label={label}
        allowedFileTypes={allowedFileTypes}
        maxSizeMB={maxSizeMB}
        fileInputRef={fileInputRef}
      />
      
      <FileList files={files} onRemoveFile={removeFile} />
    </div>
  );
};

export default SecureFileUpload;
