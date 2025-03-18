export interface ErrorResponse {
  success: boolean;
  message: string;
  statusCode: number;
  data?: any;
}

export type ErrorType = 'API' | 'HTTP' | 'VALIDATION' | 'UNKNOWN';
