import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './rootReducer';
import { authApi } from '../features/auth/authApi';
import { postsApi } from '../features/posts/postsApi';
import { commentsApi } from '../features/comments/commentsApi';
import { profilesApi } from '../features/profiles/profilesApi';

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }).concat(authApi.middleware, postsApi.middleware, commentsApi.middleware, profilesApi.middleware),
});

export type AppDispatch = typeof store.dispatch;
