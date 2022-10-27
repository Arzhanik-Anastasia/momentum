/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from '@reduxjs/toolkit';
import { ITodo } from '../../interface/types';

type ITodoState = {
  todos: ITodo[];
  activeTab: string;
};

const initialState: ITodoState = {
  todos: [],
  activeTab: 'All',
};

export const todoReducer = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    changeTab(state: any, action) {
      state.activeTab = action.payload;
    },
    addTodo(state: any, action) {
      state.todos.push(action.payload);
    },
    deleteTodo(state, action) {
      state.todos = state.todos.filter((todo: ITodo) => todo.id !== action.payload);
    },
    changeImportant(state, action) {
      state.todos.find((todo: ITodo) => {
        if (todo.id === action.payload) {
          todo.important = !todo.important;
        }
      });
    },
    makeTodo(state, action) {
      state.todos.find((todo: ITodo) => {
        if (todo.id === action.payload) {
          todo.make = !todo.make;
        }
      });
    },
  },
});

export default todoReducer.reducer;
export const { addTodo, changeTab, changeImportant, deleteTodo, makeTodo } = todoReducer.actions;
