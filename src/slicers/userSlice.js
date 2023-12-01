import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    users: [],
  },
  reducers: {
    updateUsers: (state, action) => {
      state.users = action.payload;
    },
  },
});

export const { updateUsers } = userSlice.actions;

export const userReducer = userSlice.reducer;
