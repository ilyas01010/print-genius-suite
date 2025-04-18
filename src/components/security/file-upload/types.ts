
export interface FileUploadProps {
  allowedFileTypes: string[];
  maxSizeMB: number;
  onFileSelected: (file: File, secureFileName: string) => Promise<void>;
  multiple?: boolean;
  label?: string;
  className?: string;
}

export interface UploadingFile {
  id: string;
  originalFile: File;
  secureFileName: string;
  progress: number;
  status: 'pending' | 'uploading' | 'success' | 'error';
  error?: string;
}

export interface FileValidationResult {
  valid: boolean;
  reason?: string;
  fileDetails?: {
    type: string;
    extension: string;
    isImage: boolean;
  };
}

export interface DropZoneProps {
  onFileSelect: (files: FileList | null) => void;
  isDragging: boolean;
  setIsDragging: (isDragging: boolean) => void;
  label: string;
  allowedFileTypes: string[];
  maxSizeMB: number;
  fileInputRef: React.RefObject<HTMLInputElement>;
  className?: string;
}

export interface FileItemProps {
  file: UploadingFile;
  onRemove: (id: string) => void;
}

export interface FileListProps {
  files: UploadingFile[];
  onRemoveFile: (id: string) => void;
}
