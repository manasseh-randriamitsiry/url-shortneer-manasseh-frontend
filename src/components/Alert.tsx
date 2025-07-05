import React from 'react';

interface AlertProps {
  type?: 'error' | 'success' | 'warning' | 'info';
  message: string;
  onClose?: () => void;
  className?: string;
}

export const Alert: React.FC<AlertProps> = ({
  type = 'error',
  message,
  onClose,
  className = ''
}) => {
  const getAlertClasses = () => {
    let classes = 'alert ';
    
    if (type === 'error') {
      classes += 'alert-error ';
    } else if (type === 'success') {
      classes += 'alert-success ';
    } else if (type === 'warning') {
      classes += 'bg-yellow-50 border-yellow-500 text-yellow-700 ';
    } else {
      classes += 'bg-blue-50 border-blue-500 text-blue-700 ';
    }
    
    return classes + className;
  };

  const icons = {
    error: '❌',
    success: '✅',
    warning: '⚠️',
    info: 'ℹ️'
  };

  return (
    <div className={getAlertClasses()}>
      <div className="flex items-center">
        <span className="mr-3 text-lg">{icons[type]}</span>
        <span className="font-medium">{message}</span>
      </div>
      {onClose && (
        <button
          onClick={onClose}
          className="ml-4 text-lg hover:opacity-75 transition-opacity"
          aria-label="Fermer"
        >
          ✕
        </button>
      )}
    </div>
  );
};
