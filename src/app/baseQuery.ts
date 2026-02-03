import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import { storage } from '../utils/storage';
import { API_URL } from '../utils/env';

export const baseQuery = fetchBaseQuery({
  baseUrl: `${API_URL}/api`,
  prepareHeaders: (headers) => {
    const token = storage.getAccessToken();
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

/**
 * Enhanced base query with error handling
 * Handles common HTTP error codes and provides user-friendly messages
 */
export const baseQueryWithErrors: BaseQueryFn<
  string | FetchArgs,
  unknown,
  Record<string, unknown>
> = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);

  if (result.error) {
    const error = result.error as FetchBaseQueryError;

    // Handle specific HTTP status codes
    if (error.status === 401) {
      // Unauthorized - token expired or invalid
      // Clear tokens and redirect to login
      storage.clearTokens();
      // Note: We don't redirect here to avoid circular dependencies
      // The component consuming this error should handle the redirect
      return {
        error: {
          status: 401,
          data: {
            detail: 'Sua sessão expirou. Por favor, faça login novamente.',
          },
        },
      };
    }

    if (error.status === 403) {
      // Forbidden - user doesn't have permission
      return {
        error: {
          status: 403,
          data: {
            detail: 'Você não tem permissão para realizar esta ação.',
          },
        },
      };
    }

    if (error.status === 404) {
      // Not Found
      return {
        error: {
          status: 404,
          data: {
            detail: 'O recurso solicitado não foi encontrado.',
          },
        },
      };
    }

    if (error.status === 500) {
      // Server Error
      return {
        error: {
          status: 500,
          data: {
            detail: 'Erro interno do servidor. Tente novamente mais tarde.',
          },
        },
      };
    }

    // Network errors (status is undefined or 'FETCH_ERROR')
    if (error.status === 'FETCH_ERROR') {
      return {
        error: {
          status: 'FETCH_ERROR',
          data: {
            detail: 'Erro de conexão. Verifique sua internet e tente novamente.',
          },
        },
      };
    }

    // Timeout errors
    if (error.status === 'TIMEOUT_ERROR') {
      return {
        error: {
          status: 'TIMEOUT_ERROR',
          data: {
            detail: 'A requisição demorou muito tempo. Tente novamente.',
          },
        },
      };
    }
  }

  return result;
};

// Example of how to create an API slice with a ping endpoint (commented out)
// This is just an example - do not uncomment as there is no ping endpoint in backend
/*
import { createApi } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithErrors,
  endpoints: (builder) => ({
    ping: builder.query<void, void>({
      query: () => '/ping/',
    }),
  }),
});

export const { usePingQuery } = api;
*/
