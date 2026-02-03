import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '../../app/baseQuery';
import type { Comment, CreateCommentRequest, UpdateCommentRequest } from './commentsTypes';

export const commentsApi = createApi({
  reducerPath: 'commentsApi',
  baseQuery,
  tagTypes: ['Comment', 'Post'],
  endpoints: (builder) => ({
    // GET /api/comments/?post={postId}
    getCommentsByPost: builder.query<Comment[], number>({
      query: (postId) => `/comments/?post=${postId}`,
      providesTags: (_result, _error, postId) => [
        { type: 'Comment', id: `POST_${postId}` },
      ],
    }),

    // GET /api/comments/{id}/
    getComment: builder.query<Comment, number>({
      query: (id) => `/comments/${id}/`,
      providesTags: (_result, _error, id) => [{ type: 'Comment', id }],
    }),

    // POST /api/comments/
    createComment: builder.mutation<Comment, CreateCommentRequest>({
      query: (data) => ({
        url: '/comments/',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: (_result, _error, { post }) => [
        { type: 'Comment', id: `POST_${post}` },
        { type: 'Post', id: post },
      ],
    }),

    // PATCH /api/comments/{id}/
    updateComment: builder.mutation<Comment, { id: number; data: UpdateCommentRequest }>({
      query: ({ id, data }) => ({
        url: `/comments/${id}/`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: (_result, _error, { id }) => [{ type: 'Comment', id }],
    }),

    // DELETE /api/comments/{id}/
    deleteComment: builder.mutation<void, number>({
      query: (id) => ({
        url: `/comments/${id}/`,
        method: 'DELETE',
      }),
      invalidatesTags: (_result, _error, id) => [{ type: 'Comment', id }],
    }),
  }),
});

export const {
  useGetCommentsByPostQuery,
  useGetCommentQuery,
  useCreateCommentMutation,
  useUpdateCommentMutation,
  useDeleteCommentMutation,
} = commentsApi;
