export interface ShortUrlResponse {
  id: number;
  originalUrl: string;
  shortCode: string;
  createdAt: string;
}

export interface CreateUrlRequest {
  originalUrl: string;
}

export interface ApiError {
  message: string;
  statusCode: number;
  error?: string;
}

export interface UrlFormState {
  longUrl: string;
  loading: boolean;
  error: string;
}
