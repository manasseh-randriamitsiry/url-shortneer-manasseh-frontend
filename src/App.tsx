import React from 'react';
import './App.css';
import { Header, Footer, UrlForm, UrlResult } from './components';
import { useUrlShortener } from './hooks/useUrlShortener';

function App() {
  const {
    formState,
    shortUrl,
    updateFormField,
    createShortUrl,
    clearError
  } = useUrlShortener();

  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#f8fafc' }}>
      <Header />
      
      <main className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-4xl bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden">
          <div className="p-8 md:p-12">
            <UrlForm
              formState={formState}
              onUrlChange={(value) => updateFormField('longUrl', value)}
              onSubmit={createShortUrl}
              onClearError={clearError}
            />
            
            {shortUrl && (
              <UrlResult shortUrl={shortUrl} />
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}

export default App;
