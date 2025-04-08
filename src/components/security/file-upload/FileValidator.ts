
import { FileValidationResult } from './types';

/**
 * Enhanced file validator with special handling for images and additional security checks
 */
export const validateFile = (file: File, allowedFileTypes: string[], maxSizeMB: number): FileValidationResult => {
  const maxSizeBytes = maxSizeMB * 1024 * 1024;
  
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

  // Additional checks for image files
  if (fileType.startsWith('image/')) {
    // Check if filename contains suspicious sequences (additional security)
    const suspiciousPatterns = [
      '..', '&&', '||', ';', '|', '<script', 'javascript:', 'data:', 'vbscript:'
    ];
    
    const hasSuspiciousPattern = suspiciousPatterns.some(pattern => 
      file.name.toLowerCase().includes(pattern)
    );
    
    if (hasSuspiciousPattern) {
      return { valid: false, reason: 'File name contains potentially unsafe characters' };
    }
  }
  
  // File looks good!
  return { 
    valid: true,
    fileDetails: {
      type: fileType,
      extension: fileExtension || '',
      isImage: fileType.startsWith('image/')
    }
  };
};

/**
 * Check if file is an image that can be previewed
 */
export const isPreviewableImage = (file: File): boolean => {
  const previewableTypes = [
    'image/jpeg', 
    'image/jpg', 
    'image/png', 
    'image/gif', 
    'image/svg+xml', 
    'image/webp'
  ];
  
  return previewableTypes.includes(file.type.toLowerCase());
};

/**
 * Generate a preview URL for an image file
 */
export const generatePreviewUrl = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    if (!isPreviewableImage(file)) {
      reject(new Error('File is not a previewable image'));
      return;
    }
    
    const reader = new FileReader();
    reader.onload = () => {
      resolve(reader.result as string);
    };
    reader.onerror = () => {
      reject(new Error('Failed to generate preview'));
    };
    reader.readAsDataURL(file);
  });
};
