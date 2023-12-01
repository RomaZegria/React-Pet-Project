import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import apiUrl from "../utils/api";

export const apiSlice = createApi({
  reducerPath: "apiSlice",
  baseQuery: fetchBaseQuery({ baseUrl: apiUrl }),
  endpoints: (builder) => ({
    getPostsList: builder.query({
      query: () => "/posts",
    }),
    getUsersList: builder.query({
      query: () => "/users",
    }),
    getTodoList: builder.query({
      query: () => "/todos",
    }),
    getUserPosts: builder.query({
      query: (id) => `/users/${id}/posts`,
    }),
    getUserAlbums: builder.query({
      query: (id) => `/users/${id}/albums`,
    }),
    getUserTodos: builder.query({
      query: (id) => `/users/${id}/todos`,
    }),

    createPost: builder.mutation({
      query: () => "/posts",
      async onQueryStarted(newPost, { dispatch, getState, queryFulfilled }) {
        const currentPosts = apiSlice.endpoints.getPostsList.select()(
          getState()
        ).data;
        const optimisticPosts = [...currentPosts, newPost];
        dispatch(
          apiSlice.util.updateQueryData(
            "getPostsList",
            undefined,
            () => optimisticPosts
          )
        );

        try {
          await queryFulfilled;
        } catch (error) {
          dispatch(
            apiSlice.util.updateQueryData(
              "getPostsList",
              undefined,
              () => currentPosts
            )
          );
        }
      },
      onError: (error) => {
        console.error(error);
      },
    }),
  }),
});

export const {
  useGetPostsListQuery,
  useGetUsersListQuery,
  useGetTodoListQuery,
  useCreatePostMutation,
  useGetUserPostsQuery,
  useGetUserAlbumsQuery,
  useGetUserTodosQuery,
} = apiSlice;
export default apiSlice.reducer;
