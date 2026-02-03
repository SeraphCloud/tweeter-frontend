import { createSlice } from '@reduxjs/toolkit';
import type { Post } from '../posts/postsTypes';
import type { Comment as CommentType } from '../comments/commentsTypes';
import type { Profile } from '../profiles/profilesTypes';
import { mockPosts, mockComments, mockProfiles } from '../../mocks';

interface MocksState {
  posts: Post[];
  comments: CommentType[];
  profiles: Profile[];
}

const initialState: MocksState = {
  posts: [...mockPosts],
  comments: [...mockComments],
  profiles: [...mockProfiles],
};

const mocksSlice = createSlice({
  name: 'mocks',
  initialState,
  reducers: {
    addPost: (state, action) => {
      state.posts.unshift(action.payload);
    },
    updatePost: (state, action) => {
      const index = state.posts.findIndex(p => p.id === action.payload.id);
      if (index !== -1) {
        state.posts[index] = action.payload;
      }
    },
    deletePost: (state, action) => {
      state.posts = state.posts.filter(p => p.id !== action.payload);
    },
    addComment: (state, action) => {
      state.comments.push(action.payload);
    },
    updateComment: (state, action) => {
      const index = state.comments.findIndex(c => c.id === action.payload.id);
      if (index !== -1) {
        state.comments[index] = action.payload;
      }
    },
    deleteComment: (state, action) => {
      state.comments = state.comments.filter(c => c.id !== action.payload);
    },
    updateProfile: (state, action) => {
      const index = state.profiles.findIndex(p => p.id === action.payload.id);
      if (index !== -1) {
        state.profiles[index] = action.payload;
      }
    },
    followProfile: (state, action) => {
      const userIndex = state.profiles.findIndex(p => p.id === action.payload.userId);
      if (userIndex !== -1) {
        const userProfile = state.profiles[userIndex];
        if (!userProfile.following_ids.includes(action.payload.targetId)) {
          userProfile.following_ids.push(action.payload.targetId);
        }
      }
    },
    unfollowProfile: (state, action) => {
      const userIndex = state.profiles.findIndex(p => p.id === action.payload.userId);
      if (userIndex !== -1) {
        const userProfile = state.profiles[userIndex];
        userProfile.following_ids = userProfile.following_ids.filter(id => id !== action.payload.targetId);
      }
    },
    resetMocks: (state) => {
      state.posts = [...mockPosts];
      state.comments = [...mockComments];
      state.profiles = [...mockProfiles];
    },
  },
});

export const {
  addPost,
  updatePost,
  deletePost,
  addComment,
  updateComment,
  deleteComment,
  updateProfile,
  followProfile,
  unfollowProfile,
  resetMocks,
} = mocksSlice.actions;

export default mocksSlice.reducer;
