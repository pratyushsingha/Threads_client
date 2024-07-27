import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const followApi = createApi({
  reducerPath: "followApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BACKEND_URL,
    credentials: "include",
  }),
  tagTypes: ["userProfile"],
  endpoints: (builder) => ({
    getUserProfileDetails: builder.query({
      providesTags: ["userProfile"],
      query: (username) => `/users/profile/u/${username}`,
      transformResponse: (response) => response.data,
    }),
    updateUserDetails: builder.mutation({
      query: (data) => ({
        url: `/users/profile`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["userProfile"],
    }),

    handleFollow: builder.mutation({
      query: ({ followerId }) => ({
        url: `/follow/${followerId}`,
        method: "POST",
        body: {},
      }),
      async onQueryStarted({ username }, { dispatch, queryFulfilled }) {
        const patchUpdate = dispatch(
          followApi.util.updateQueryData(
            "getUserProfileDetails",
            username,
            (draft) => {
              draft.isFollowing = !draft.isFollowing;
              if (draft.isFollowing) {
                draft.followersCount += 1;
              } else {
                draft.followersCount -= 1;
              }
            }
          )
        );
        try {
          await queryFulfilled;
        } catch (error) {
          patchUpdate.undo();
        }
      },
    }),
  }),
});

export const {
  useGetUserProfileDetailsQuery,
  useHandleFollowMutation,
  useUpdateUserDetailsMutation,
} = followApi;
