
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { sanitizeInput, ValidationType, validateInput } from '@/lib/security/inputValidation';

interface InputSanitizedProps extends React.InputHTMLAttributes<HTMLInputElement> {
  sanitize?: boolean;
  validate?: ValidationType;
  minLength?: number;
  maxLength?: number;
  customRegex?: RegExp;
  onValidChange?: (isValid: boolean) => void;
  errorMessage?: string;
}

const InputSanitized = React.forwardRef<HTMLInputElement, InputSanitizedProps>(
  ({ 
    sanitize = true, 
    validate, 
    minLength, 
    maxLength, 
    customRegex, 
    onChange, 
    onValidChange,
    errorMessage,
    ...props 
  }, ref) => {
    const [error, setError] = useState<string | null>(null);
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      let value = e.target.value;
      
      // Sanitize input if enabled
      if (sanitize) {
        value = sanitizeInput(value);
        // Update the input value to the sanitized version
        e.target.value = value;
      }
      
      // Validate input if a validation type is provided
      if (validate) {
        const isValid = validateInput(value, validate, {
          minLength,
          maxLength,
          custom: customRegex,
        });
        
        if (!isValid && value.trim() !== '') {
          setError(errorMessage || `Invalid input for type ${validate}`);
          onValidChange?.(false);
        } else {
          setError(null);
          onValidChange?.(true);
        }
      }
      
      // Call the original onChange handler if provided
      onChange?.(e);
    };
    
    return (
      <div className="space-y-1">
        <Input ref={ref} onChange={handleChange} {...props} />
        {error && (
          <p className="text-xs text-destructive">{error}</p>
        )}
      </div>
    );
  }
);

InputSanitized.displayName = 'InputSanitized';

export default InputSanitized;
