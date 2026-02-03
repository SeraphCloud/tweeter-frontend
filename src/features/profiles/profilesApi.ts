import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '../../app/baseQuery';
import type { Profile, Follower, UpdateProfileRequest } from './profilesTypes';

export const profilesApi = createApi({
  reducerPath: 'profilesApi',
  baseQuery,
  tagTypes: ['Profile'],
  endpoints: (builder) => ({
    // GET /api/profiles/
    getProfiles: builder.query<Profile[], string | void>({
      query: (username) => {
        const params = username ? `?username=${username}` : '';
        return `/profiles${params}`;
      },
      providesTags: ['Profile'],
    }),

    // GET /api/profiles/{id}/
    getProfile: builder.query<Profile, number>({
      query: (id) => `/profiles/${id}/`,
      providesTags: (_result, _error, id) => [{ type: 'Profile', id }],
    }),

    // GET /api/profiles/me/
    getMyProfile: builder.query<Profile, void>({
      query: () => '/profiles/me/',
      providesTags: ['Profile'],
    }),

    // PATCH /api/profiles/me/
    updateMyProfile: builder.mutation<Profile, UpdateProfileRequest>({
      query: (data) => {
        const formData = new FormData();
        if (data.display_name) {
          formData.append('display_name', data.display_name);
        }
        if (data.avatar) {
          formData.append('avatar', data.avatar);
        }
        return {
          url: '/profiles/me/',
          method: 'PATCH',
          body: formData,
        };
      },
      invalidatesTags: ['Profile'],
    }),

    // POST /api/profiles/{id}/follow/
    followProfile: builder.mutation<{ detail: string }, number>({
      query: (id) => ({
        url: `/profiles/${id}/follow/`,
        method: 'POST',
      }),
      invalidatesTags: (_result, _error, id) => [
        { type: 'Profile', id },
        'Profile',
      ],
    }),

    // POST /api/profiles/{id}/unfollow/
    unfollowProfile: builder.mutation<{ detail: string }, number>({
      query: (id) => ({
        url: `/profiles/${id}/unfollow/`,
        method: 'POST',
      }),
      invalidatesTags: (_result, _error, id) => [
        { type: 'Profile', id },
        'Profile',
      ],
    }),

    // GET /api/profiles/{id}/followers/
    getFollowers: builder.query<Follower[], number>({
      query: (id) => `/profiles/${id}/followers/`,
    }),

    // GET /api/profiles/{id}/following/
    getFollowing: builder.query<Follower[], number>({
      query: (id) => `/profiles/${id}/following/`,
    }),
  }),
});

export const {
  useGetProfilesQuery,
  useGetProfileQuery,
  useGetMyProfileQuery,
  useUpdateMyProfileMutation,
  useFollowProfileMutation,
  useUnfollowProfileMutation,
  useGetFollowersQuery,
  useGetFollowingQuery,
} = profilesApi;
