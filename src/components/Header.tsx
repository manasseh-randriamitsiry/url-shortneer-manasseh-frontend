import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="text-black text-center py-12 px-6">
      <h1 className="text-4xl md:text-5xl font-bold mb-4">
        🔗 Raccourcisseur d'URL
      </h1>
      <p className="text-xl opacity-90 font-light max-w-2xl mx-auto">
        Transformez vos liens longs en liens courts et faciles à partager
      </p>
    </header>
  );
};
