import type { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import type { SerializedError } from '@reduxjs/toolkit';

export interface ApiErrorResponse {
  detail?: string;
  message?: string;
  [key: string]: string[] | string | undefined;
}

export interface ParsedError {
  detail?: string;
  fieldErrors: Record<string, string[]>;
  hasFieldErrors: boolean;
}

/**
 * Parse API error response into structured format
 * Handles both field-level validation errors and detail messages
 */
export function parseApiError(
  error: FetchBaseQueryError | SerializedError | undefined
): ParsedError {
  const result: ParsedError = {
    fieldErrors: {},
    hasFieldErrors: false,
  };

  if (!error) {
    return result;
  }

  if ('data' in error && error.data && typeof error.data === 'object') {
    const data = error.data as ApiErrorResponse;

    // Extract detail message
    if (data.detail) {
      result.detail = data.detail;
    }
    if (data.message && !result.detail) {
      result.detail = data.message;
    }

    // Extract field-level errors
    for (const [key, value] of Object.entries(data)) {
      if (key !== 'detail' && key !== 'message') {
        if (Array.isArray(value)) {
          result.fieldErrors[key] = value;
          result.hasFieldErrors = true;
        } else if (typeof value === 'string') {
          result.fieldErrors[key] = [value];
          result.hasFieldErrors = true;
        }
      }
    }
  }

  // Handle network errors
  if ('error' in error && typeof error.error === 'string') {
    result.detail = error.error;
  }

  // Handle SerializedError
  if ('message' in error && error.message && !result.detail) {
    result.detail = error.message;
  }

  return result;
}

/**
 * Get a single error message string from an error
 * Prioritizes detail message, then first field error
 */
export function getErrorMessage(
  error: FetchBaseQueryError | SerializedError | undefined
): string {
  const parsed = parseApiError(error);

  if (parsed.detail) {
    return parsed.detail;
  }

  if (parsed.hasFieldErrors) {
    const firstField = Object.keys(parsed.fieldErrors)[0];
    const firstError = parsed.fieldErrors[firstField]?.[0];
    if (firstError) {
      return `${firstField}: ${firstError}`;
    }
  }

  return 'Ocorreu um erro. Tente novamente.';
}

/**
 * Format field errors for display
 */
export function formatFieldErrors(fieldErrors: Record<string, string[]>): string {
  const messages: string[] = [];

  for (const [field, errors] of Object.entries(fieldErrors)) {
    const fieldName = formatFieldName(field);
    if (errors.length > 0) {
      messages.push(`${fieldName}: ${errors.join(', ')}`);
    }
  }

  return messages.join('\n');
}

/**
 * Format field name for display (convert snake_case to Title Case)
 */
function formatFieldName(field: string): string {
  const fieldNames: Record<string, string> = {
    username: 'Nome de usuário',
    email: 'E-mail',
    password: 'Senha',
    display_name: 'Nome de exibição',
    avatar: 'Avatar',
    content: 'Conteúdo',
    text: 'Texto',
    post: 'Post',
  };

  return (
    fieldNames[field] ||
    field
      .split('_')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
  );
}
