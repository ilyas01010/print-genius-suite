
import { FileValidationResult } from './types';

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
  
  return { valid: true };
};
