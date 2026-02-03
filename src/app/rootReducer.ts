import { combineReducers } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import { authApi } from '../features/auth/authApi';
import { postsApi } from '../features/posts/postsApi';
import { commentsApi } from '../features/comments/commentsApi';
import { profilesApi } from '../features/profiles/profilesApi';
import mocksReducer from '../features/mocks/mocksSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  [authApi.reducerPath]: authApi.reducer,
  [postsApi.reducerPath]: postsApi.reducer,
  [commentsApi.reducerPath]: commentsApi.reducer,
  [profilesApi.reducerPath]: profilesApi.reducer,
  mocks: mocksReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
