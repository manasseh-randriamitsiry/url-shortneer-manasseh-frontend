import React from 'react';

interface InputProps {
  type?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  className?: string;
  error?: boolean;
}

export const Input: React.FC<InputProps> = ({
  type = 'text',
  value,
  onChange,
  placeholder,
  disabled = false,
  required = false,
  className = '',
  error = false
}) => {
  const getInputClasses = () => {
    let classes = '';
    
    if (error) {
      classes += 'error ';
    }
    
    if (disabled) {
      classes += 'cursor-not-allowed ';
    }
    
    return classes + className;
  };

  return (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      disabled={disabled}
      required={required}
      className={getInputClasses()}
    />
  );
};
