import { createSlice } from "@reduxjs/toolkit";

const postSlice = createSlice({
  name: "post",
  initialState: {
    posts: [],
  },
  reducers: {
    addPost: (state, action) => {
      const newPost = action.payload;
      state.posts = [...state.posts, newPost];
    },
    updateStore: (state, action) => {
      state.posts = action.payload;
    },
  },
});

export const { addPost, updateStore } = postSlice.actions;
export const postReducer = postSlice.reducer;
