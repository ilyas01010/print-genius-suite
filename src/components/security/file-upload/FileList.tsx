
import React from 'react';
import FileItem from './FileItem';
import { FileListProps } from './types';

const FileList: React.FC<FileListProps> = ({ files, onRemoveFile }) => {
  if (files.length === 0) return null;
  
  return (
    <div className="mt-4 space-y-2">
      {files.map(file => (
        <FileItem 
          key={file.id} 
          file={file} 
          onRemove={onRemoveFile} 
        />
      ))}
    </div>
  );
};

export default FileList;
