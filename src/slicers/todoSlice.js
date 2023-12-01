import { createSlice } from "@reduxjs/toolkit";

const todoSlice = createSlice({
  name: "todoList",
  initialState: {
    tasks: [],
  },
  reducers: {
    changeState: (state, action) => {
      const id = action.payload;
      state.tasks = state.tasks.map((note) => {
        if (note.id === id) {
          return { ...note, completed: !note.completed };
        }
        return note;
      });
    },
    updateTasks: (state, action) => {
      state.tasks = action.payload;
    },
  },
});

export const { changeState, updateTasks } = todoSlice.actions;
export const todoReducer = todoSlice.reducer;
