import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { storage } from '../../utils/storage';
import { authApi } from './authApi';
import type { AuthState } from './authTypes';

const initialState: AuthState = {
  isAuthenticated: false,
  accessToken: storage.getAccessToken(),
  refreshToken: storage.getRefreshToken(),
  loading: false,
  error: null,
};

export const logout = createAsyncThunk('auth/logout', async () => {
  storage.clearTokens();
  return null;
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { access, refresh } = action.payload;
      state.accessToken = access;
      state.refreshToken = refresh;
      state.isAuthenticated = true;
      state.error = null;
      storage.setAccessToken(access);
      storage.setRefreshToken(refresh);
    },
    clearAuth: (state) => {
      state.accessToken = null;
      state.refreshToken = null;
      state.isAuthenticated = false;
      state.error = null;
      storage.clearTokens();
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(logout.fulfilled, (state) => {
        state.accessToken = null;
        state.refreshToken = null;
        state.isAuthenticated = false;
        state.error = null;
      })
      .addMatcher(authApi.endpoints.login.matchPending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addMatcher(authApi.endpoints.login.matchFulfilled, (state, action) => {
        state.loading = false;
        state.accessToken = action.payload.access;
        state.refreshToken = action.payload.refresh;
        state.isAuthenticated = true;
        state.error = null;
        storage.setAccessToken(action.payload.access);
        storage.setRefreshToken(action.payload.refresh);
      })
      .addMatcher(authApi.endpoints.login.matchRejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Login failed';
        state.isAuthenticated = false;
      })
      .addMatcher(authApi.endpoints.refresh.matchFulfilled, (state, action) => {
        state.accessToken = action.payload.access;
        storage.setAccessToken(action.payload.access);
      })
      .addMatcher(authApi.endpoints.refresh.matchRejected, (state) => {
        state.accessToken = null;
        state.refreshToken = null;
        state.isAuthenticated = false;
        storage.clearTokens();
      });
  },
});

export const { setCredentials, clearAuth } = authSlice.actions;
export default authSlice.reducer;
