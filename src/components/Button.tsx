import React from 'react';

interface ButtonProps {
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  loading?: boolean;
  variant?: 'primary' | 'secondary' | 'success';
  size?: 'small' | 'medium' | 'large';
  children: React.ReactNode;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  onClick,
  type = 'button',
  disabled = false,
  loading = false,
  variant = 'primary',
  size = 'medium',
  children,
  className = ''
}) => {
  const getButtonClasses = () => {
    let classes = 'inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-300 border-none cursor-pointer ';
    
    if (variant === 'primary') {
      classes += 'btn-primary ';
    } else if (variant === 'success') {
      classes += 'btn-success ';
    } else {
      classes += 'bg-gray-200 text-gray-800 ';
    }
    
    if (size === 'small') {
      classes += 'px-3 py-2 text-sm ';
    } else if (size === 'large') {
      classes += 'px-8 py-4 text-lg ';
    } else {
      classes += 'px-6 py-3 text-base ';
    }
    
    if (disabled || loading) {
      classes += 'opacity-60 cursor-not-allowed ';
    }
    
    return classes + className;
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={getButtonClasses()}
    >
      {loading ? (
        <>
          <svg 
            className="spinner" 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24"
            style={{ 
              width: '1.25rem', 
              height: '1.25rem', 
              marginRight: '0.75rem',
              animation: 'spin 1s linear infinite'
            }}
          >
            <circle 
              style={{ opacity: 0.25 }} 
              cx="12" 
              cy="12" 
              r="10" 
              stroke="currentColor" 
              strokeWidth="4"
            ></circle>
            <path 
              style={{ opacity: 0.75 }} 
              fill="currentColor" 
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          Chargement...
        </>
      ) : (
        children
      )}
    </button>
  );
};
