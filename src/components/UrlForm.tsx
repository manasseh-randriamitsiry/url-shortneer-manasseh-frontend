import React from 'react';
import { Input } from './Input';
import { Button } from './Button';
import { Alert } from './Alert';
import { UrlFormState } from '../types';

interface UrlFormProps {
  formState: UrlFormState;
  onUrlChange: (value: string) => void;
  onSubmit: () => void;
  onClearError: () => void;
}

export const UrlForm: React.FC<UrlFormProps> = ({
  formState,
  onUrlChange,
  onSubmit,
  onClearError
}) => {

  return (
    <>
      {formState.error && (
        <Alert
          type="error"
          message={formState.error}
          onClose={onClearError}
          className="mb-4"
        />
      )}

      <form onSubmit={(e) => { e.preventDefault(); onSubmit(); }} className="mb-8">
        <div className="mb-6">
          <Input
            type="url"
            value={formState.longUrl}
            onChange={onUrlChange}
            placeholder="Collez votre URL longue ici (ex: https://example.com/very/long/url)"
            disabled={formState.loading}
            required
            error={!!formState.error}
          />
        </div>
        <div className="text-center">
          <Button
            type="submit"
            loading={formState.loading}
            disabled={!formState.longUrl.trim() || formState.loading}
            variant="primary"
            size="large"
          >
            🔗 Raccourcir l'URL
          </Button>
        </div>
      </form>
    </>
  );
};

