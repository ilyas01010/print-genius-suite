import React, { useState, useEffect, useRef } from 'react';
import { Input } from '@/components/ui/input';
import { sanitizeInput, ValidationType, validateInput } from '@/lib/security/inputValidation';
import { AlertCircle } from 'lucide-react';

interface InputSanitizedProps extends React.InputHTMLAttributes<HTMLInputElement> {
  sanitize?: boolean;
  validate?: ValidationType;
  minLength?: number;
  maxLength?: number;
  customRegex?: RegExp;
  onValidChange?: (isValid: boolean) => void;
  errorMessage?: string;
  sensitiveData?: boolean;
  delayValidation?: boolean;
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
    sensitiveData = false,
    delayValidation = true,
    className,
    ...props 
  }, ref) => {
    const [error, setError] = useState<string | null>(null);
    const [value, setValue] = useState<string>(props.defaultValue?.toString() || props.value?.toString() || '');
    const [isDirty, setIsDirty] = useState(false);
    const validationTimeoutRef = useRef<NodeJS.Timeout>();
    
    useEffect(() => {
      return () => {
        if (validationTimeoutRef.current) {
          clearTimeout(validationTimeoutRef.current);
        }
      };
    }, []);

    useEffect(() => {
      if (props.value !== undefined && props.value !== value) {
        setValue(props.value.toString());
        validateValue(props.value.toString());
      }
    }, [props.value]);
    
    const validateValue = (inputValue: string) => {
      if (!isDirty && !inputValue.trim()) {
        setError(null);
        onValidChange?.(true);
        return;
      }
      
      if (validate) {
        const isValid = validateInput(inputValue, validate, {
          minLength,
          maxLength,
          custom: customRegex,
        });
        
        if (!isValid && (isDirty || inputValue.trim() !== '')) {
          setError(errorMessage || `Invalid ${validate} format`);
          onValidChange?.(false);
        } else {
          setError(null);
          onValidChange?.(true);
        }
      }
    };
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      let inputValue = e.target.value;
      
      if (sanitize && !sensitiveData) {
        inputValue = sanitizeInput(inputValue);
        e.target.value = inputValue;
      }
      
      setValue(inputValue);
      setIsDirty(true);
      
      if (!sensitiveData) {
        setValue(inputValue);
      }
      
      if (delayValidation && validate) {
        if (validationTimeoutRef.current) {
          clearTimeout(validationTimeoutRef.current);
        }
        
        validationTimeoutRef.current = setTimeout(() => {
          validateValue(inputValue);
        }, 300);
      } else if (validate) {
        validateValue(inputValue);
      }
      
      onChange?.(e);
    };
    
    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      if (validationTimeoutRef.current) {
        clearTimeout(validationTimeoutRef.current);
      }
      
      setIsDirty(true);
      validateValue(e.target.value);
      props.onBlur?.(e);
    };
    
    const inputClasses = `${className || ''} ${error ? 'border-destructive' : ''}`;
    
    return (
      <div className="space-y-1">
        <Input 
          ref={ref} 
          onChange={handleChange}
          onBlur={handleBlur}
          value={props.value !== undefined ? props.value : value}
          className={inputClasses} 
          {...props} 
        />
        
        {error && (
          <div className="flex items-center gap-1 text-destructive text-xs">
            <AlertCircle className="h-3 w-3" />
            <p>{error}</p>
          </div>
        )}
      </div>
    );
  }
);

InputSanitized.displayName = 'InputSanitized';

export default InputSanitized;
