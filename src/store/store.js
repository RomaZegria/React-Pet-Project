import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { userReducer } from "../slicers/userSlice";
import { todoReducer } from "../slicers/todoSlice";
import { postReducer } from "../slicers/postSlice";
import { apiSlice } from "../api/api";

const rootReducer = combineReducers({
  post: postReducer, 
  user: userReducer,
  todoList: todoReducer,
  [apiSlice.reducerPath]: apiSlice.reducer, 
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export default store;
