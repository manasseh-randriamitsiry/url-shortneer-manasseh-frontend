import React, { useState } from 'react';
import { ShortUrlResponse } from '../types';
import { Button } from './Button';
import { Alert } from './Alert';
import { urlService } from '../services/urlService';
import { copyToClipboard } from '../utils/clipboard';
import { formatDate } from '../utils/dateFormatter';

interface UrlResultProps {
  shortUrl: ShortUrlResponse;
}

export const UrlResult: React.FC<UrlResultProps> = ({ shortUrl }) => {
  const [copySuccess, setCopySuccess] = useState(false);
  const fullShortUrl = urlService.generateShortUrl(shortUrl.shortCode);

  const handleCopy = async () => {
    const success = await copyToClipboard(fullShortUrl);
    if (success) {
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 3000);
    }
  };

  return (
    <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-8 shadow-lg border border-gray-200">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-gray-800 mb-2">
          🎉 URL raccourcie avec succès !
        </h3>
      </div>

      {copySuccess && (
        <Alert
          type="success"
          message="URL copiée dans le presse-papiers !"
          className="mb-6"
        />
      )}

      <div className="space-y-6">
        {/* URL originale */}
        <div>
          <label className="block text-sm font-semibold text-gray-600 mb-2 uppercase tracking-wide">
            URL originale
          </label>
          <div className="bg-white p-4 rounded-lg border-2 border-gray-200 shadow-sm">
            <a
              href={shortUrl.originalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 hover:underline break-all font-mono text-sm"
            >
              {shortUrl.originalUrl}
            </a>
          </div>
        </div>

        {/* URL raccourcie */}
        <div>
          <label className="block text-sm font-semibold text-gray-600 mb-2 uppercase tracking-wide">
            URL raccourcie
          </label>
          <div className="bg-white p-4 rounded-lg border-2 border-gray-200 shadow-sm flex items-center justify-between">
            <span className="text-gray-800 font-mono text-sm break-all mr-4">
              {fullShortUrl}
            </span>
            <Button
              onClick={handleCopy}
              variant="success"
              size="small"
              className="ml-2 whitespace-nowrap"
            >
              📋 Copier
            </Button>
          </div>
        </div>

        {/* Code court */}
        <div>
          <label className="block text-sm font-semibold text-gray-600 mb-2 uppercase tracking-wide">
            Code court
          </label>
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4 rounded-lg text-center">
            <span className="font-mono font-bold text-xl tracking-wider">
              {shortUrl.shortCode}
            </span>
          </div>
        </div>

        {/* Date de création */}
        <div>
          <label className="block text-sm font-semibold text-gray-600 mb-2 uppercase tracking-wide">
            Créé le
          </label>
          <div className="bg-white p-4 rounded-lg border-2 border-gray-200 shadow-sm">
            <span className="text-gray-700 font-medium">
              {formatDate(shortUrl.createdAt)}
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="pt-4 text-center">
          <a
            href={fullShortUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="success" size="medium">
              🔗 Tester le lien
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
};
