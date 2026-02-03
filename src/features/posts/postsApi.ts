import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '../../app/baseQuery';
import type { Post, CreatePostRequest, UpdatePostRequest } from './postsTypes';

export const postsApi = createApi({
  reducerPath: 'postsApi',
  baseQuery,
  tagTypes: ['Post'],
  endpoints: (builder) => ({
    getFeed: builder.query<Post[], void>({
      query: () => '/posts/feed/',
      providesTags: ['Post'],
    }),
    createPost: builder.mutation<Post, CreatePostRequest>({
      query: (data) => ({
        url: '/posts/',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Post'],
    }),
    getPost: builder.query<Post, number>({
      query: (id) => `/posts/${id}/`,
      providesTags: (_result, _error, id) => [{ type: 'Post', id }],
    }),
    updatePost: builder.mutation<Post, { id: number; data: UpdatePostRequest }>({
      query: ({ id, data }) => ({
        url: `/posts/${id}/`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: (_result, _error, { id }) => [{ type: 'Post', id }],
    }),
    deletePost: builder.mutation<void, number>({
      query: (id) => ({
        url: `/posts/${id}/`,
        method: 'DELETE',
      }),
      invalidatesTags: (_result, _error, id) => [{ type: 'Post', id }],
    }),
    likePost: builder.mutation<{ detail: string }, number>({
      query: (id) => ({
        url: `/posts/${id}/like/`,
        method: 'POST',
      }),
      invalidatesTags: (_result, _error, id) => [{ type: 'Post', id }],
    }),
    dislikePost: builder.mutation<{ detail: string }, number>({
      query: (id) => ({
        url: `/posts/${id}/dislike/`,
        method: 'POST',
      }),
      invalidatesTags: (_result, _error, id) => [{ type: 'Post', id }],
    }),
  }),
});

export const {
  useGetFeedQuery,
  useCreatePostMutation,
  useGetPostQuery,
  useUpdatePostMutation,
  useDeletePostMutation,
  useLikePostMutation,
  useDislikePostMutation,
} = postsApi;
