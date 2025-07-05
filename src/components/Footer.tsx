import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-100 text-center py-6 px-6 border-t border-gray-200">
      <p className="text-gray-600">
        Développé avec ❤️ avec{' '}
        <span className="font-semibold text-blue-600">NestJS</span> +{' '}
        <span className="font-semibold text-blue-600">React</span> +{' '}
        <span className="font-semibold text-blue-600">TypeScript</span>
      </p>
    </footer>
  );
};
