import { CreateUrlRequest, ShortUrlResponse, ApiError } from '../types';

// Use relative URLs when proxy is configured, fallback to full URL
const API_BASE_URL = process.env.NODE_ENV === 'development' ? '' : (process.env.REACT_APP_API_URL || 'http://localhost:3000');

class UrlService {
  async createShortUrl(request: CreateUrlRequest): Promise<ShortUrlResponse> {
    try {
      console.log('Making API request to:', `${API_BASE_URL}/api/url`);
      const response = await fetch(`${API_BASE_URL}/api/url`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
      });

      if (!response.ok) {
        let errorMessage = 'Erreur lors de la création de l\'URL raccourcie';
        try {
          const errorData: ApiError = await response.json();
          errorMessage = errorData.message || errorMessage;
        } catch (jsonError) {
          // If we can't parse JSON, it might be an HTML error page
          const textResponse = await response.text();
          if (textResponse.includes('<!DOCTYPE')) {
            errorMessage = `Erreur du serveur (${response.status}): Impossible de joindre l'API`;
          } else {
            errorMessage = `Erreur du serveur (${response.status}): ${textResponse}`;
          }
        }
        throw new Error(errorMessage);
      }

      return await response.json();
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Une erreur inattendue est survenue');
    }
  }

  generateShortUrl(shortCode: string): string {
    return `${API_BASE_URL}/${shortCode}`;
  }

  isValidUrl(url: string): boolean {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  }
}

export const urlService = new UrlService();
