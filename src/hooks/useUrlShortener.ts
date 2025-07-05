import { useState } from 'react';
import { ShortUrlResponse, UrlFormState } from '../types';
import { urlService } from '../services/urlService';

export const useUrlShortener = () => {
  const [formState, setFormState] = useState<UrlFormState>({
    longUrl: '',
    loading: false,
    error: ''
  });
  
  const [shortUrl, setShortUrl] = useState<ShortUrlResponse | null>(null);

  const updateFormField = (field: keyof UrlFormState, value: string | boolean) => {
    setFormState(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const clearError = () => {
    setFormState(prev => ({ ...prev, error: '' }));
  };

  const createShortUrl = async () => {
    if (!formState.longUrl.trim()) {
      updateFormField('error', 'Veuillez saisir une URL valide');
      return;
    }

    if (!urlService.isValidUrl(formState.longUrl)) {
      updateFormField('error', 'Veuillez saisir une URL valide (ex: https://example.com)');
      return;
    }

    updateFormField('loading', true);
    clearError();
    setShortUrl(null);

    try {
      const result = await urlService.createShortUrl({ 
        originalUrl: formState.longUrl 
      });
      
      setShortUrl(result);
      updateFormField('longUrl', ''); // Clear input after success
    } catch (error) {
      const errorMessage = error instanceof Error 
        ? error.message 
        : 'Une erreur est survenue lors de la création de l\'URL raccourcie';
      updateFormField('error', errorMessage);
    } finally {
      updateFormField('loading', false);
    }
  };

  const resetState = () => {
    setFormState({
      longUrl: '',
      loading: false,
      error: ''
    });
    setShortUrl(null);
  };

  return {
    formState,
    shortUrl,
    updateFormField,
    createShortUrl,
    resetState,
    clearError
  };
};
