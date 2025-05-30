
import DOMPurify from 'dompurify';

// Type of validation to perform
export enum ValidationType {
  TEXT = 'text',
  EMAIL = 'email',
  URL = 'url',
  NUMBER = 'number',
  PASSWORD = 'password',
  USERNAME = 'username',
  PHONE = 'phone',
  DATE = 'date',
  POSTAL_CODE = 'postal_code',
  CREDITCARD = 'creditcard',
}

// Define validation patterns
const validationPatterns = {
  [ValidationType.EMAIL]: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  [ValidationType.URL]: /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/,
  [ValidationType.NUMBER]: /^-?\d*\.?\d+$/,
  [ValidationType.PHONE]: /^\+?[0-9]{10,15}$/,
  [ValidationType.USERNAME]: /^[a-zA-Z0-9_-]{3,20}$/,
  [ValidationType.DATE]: /^\d{4}-\d{2}-\d{2}$/, // YYYY-MM-DD format
  [ValidationType.POSTAL_CODE]: /^[0-9]{5}(-[0-9]{4})?$/, // US format, adjust as needed
  [ValidationType.CREDITCARD]: /^[0-9]{13,19}$/, // Basic check, not for actual validation
};

// Configure DOMPurify with strict settings
const purifyConfig = {
  ALLOWED_TAGS: ['b', 'i', 'em', 'strong'], // Minimal allowed tags
  ALLOWED_ATTR: [], // No attributes allowed
  FORBID_TAGS: ['script', 'style', 'iframe', 'form', 'object', 'embed'],
  FORBID_ATTR: ['srcset', 'src', 'href', 'xlink:href', 'style'],
  USE_PROFILES: { html: true },
};

// Sanitize input to protect against XSS attacks
export const sanitizeInput = (input: string): string => {
  if (typeof input !== 'string') {
    return '';
  }
  
  // Use DOMPurify with strict configuration to sanitize HTML content
  return DOMPurify.sanitize(input, purifyConfig).trim();
};

// Validate input against a specific validation type
export const validateInput = (
  input: string, 
  type: ValidationType,
  options?: { 
    minLength?: number; 
    maxLength?: number; 
    custom?: RegExp;
  }
): boolean => {
  // Check if input is empty or undefined
  if (input === undefined || input === null || input.trim() === '') {
    return false;
  }

  // Check length constraints if provided
  if (options?.minLength !== undefined && input.length < options.minLength) {
    return false;
  }
  
  if (options?.maxLength !== undefined && input.length > options.maxLength) {
    return false;
  }
  
  // Use custom regex if provided
  if (options?.custom) {
    return options.custom.test(input);
  }
  
  // Special handling for password strength
  if (type === ValidationType.PASSWORD) {
    // Check for at least one uppercase, lowercase, number, and special character
    const hasUppercase = /[A-Z]/.test(input);
    const hasLowercase = /[a-z]/.test(input);
    const hasNumber = /[0-9]/.test(input);
    const hasSpecial = /[^A-Za-z0-9]/.test(input);
    
    return (
      input.length >= 12 && 
      hasUppercase && 
      hasLowercase && 
      hasNumber && 
      hasSpecial
    );
  }
  
  // Use predefined patterns
  if (validationPatterns[type]) {
    return validationPatterns[type].test(input);
  }
  
  // For text or other types without patterns, just return true
  return true;
};

// Helper function to escape special characters in SQL queries
// Note: Better to use parameterized queries whenever possible
export const escapeSQL = (str: string): string => {
  if (typeof str !== 'string') {
    return '';
  }
  return str
    .replace(/[\0\x08\x09\x1a\n\r"'\\\%]/g, (char) => {
      switch (char) {
        case "\0":
          return "\\0";
        case "\x08":
          return "\\b";
        case "\x09":
          return "\\t";
        case "\x1a":
          return "\\z";
        case "\n":
          return "\\n";
        case "\r":
          return "\\r";
        case "\"":
        case "'":
        case "\\":
        case "%":
          return "\\" + char;
        default:
          return char;
      }
    });
};

// Generate a random secure token
export const generateSecureToken = (length: number = 32): string => {
  const array = new Uint8Array(length);
  crypto.getRandomValues(array);
  
  return Array.from(array)
    .map(byte => byte.toString(16).padStart(2, '0'))
    .join('');
};

// General purpose form input validator
export const validateForm = <T extends Record<string, any>>(
  formData: T, 
  validationRules: {
    [K in keyof T]?: {
      type: ValidationType;
      required?: boolean;
      minLength?: number;
      maxLength?: number;
      custom?: RegExp;
      errorMessage?: string;
    }
  }
): { valid: boolean; errors: Record<string, string> } => {
  const errors: Record<string, string> = {};
  let valid = true;
  
  Object.keys(validationRules).forEach((field) => {
    const value = formData[field] as string;
    const rules = validationRules[field as keyof T];
    
    if (!rules) return;
    
    // Check if field is required but empty
    if (rules.required && (!value || value.trim() === '')) {
      errors[field] = rules.errorMessage || `${field} is required`;
      valid = false;
      return;
    }
    
    // Skip validation if field is empty and not required
    if ((!value || value.trim() === '') && !rules.required) {
      return;
    }
    
    // Validate the input
    const isValid = validateInput(value, rules.type, {
      minLength: rules.minLength,
      maxLength: rules.maxLength,
      custom: rules.custom,
    });
    
    if (!isValid) {
      errors[field] = rules.errorMessage || `${field} is invalid`;
      valid = false;
    }
  });
  
  return { valid, errors };
};

// Sanitize file names to prevent path traversal and unsafe characters
export const sanitizeFileName = (fileName: string): string => {
  if (typeof fileName !== 'string') {
    return '';
  }
  
  // Remove any directory components
  let cleanName = fileName.replace(/^.*[\\\/]/, '');
  
  // Remove any unsafe characters
  cleanName = cleanName.replace(/[^\w\-_.]/g, '');
  
  // Add a random suffix for additional security
  const extension = cleanName.includes('.') 
    ? cleanName.substring(cleanName.lastIndexOf('.')) 
    : '';
    
  const nameWithoutExtension = cleanName.includes('.')
    ? cleanName.substring(0, cleanName.lastIndexOf('.'))
    : cleanName;
    
  const randomSuffix = Math.random().toString(36).substring(2, 8);
  
  return `${nameWithoutExtension}_${randomSuffix}${extension}`;
};
