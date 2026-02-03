import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { LoginRequest, LoginResponse, RegisterRequest, RegisterResponse, RefreshRequest, RefreshResponse } from './authTypes';
import { API_URL } from '../../utils/env';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_URL}/api`,
  }),
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (credentials) => ({
        url: '/auth/token/',
        method: 'POST',
        body: credentials,
      }),
    }),
    register: builder.mutation<RegisterResponse, RegisterRequest>({
      query: (credentials) => ({
        url: '/register/',
        method: 'POST',
        body: credentials,
      }),
    }),
    refresh: builder.mutation<RefreshResponse, RefreshRequest>({
      query: (credentials) => ({
        url: '/auth/token/refresh/',
        method: 'POST',
        body: credentials,
      }),
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation, useRefreshMutation } = authApi;
