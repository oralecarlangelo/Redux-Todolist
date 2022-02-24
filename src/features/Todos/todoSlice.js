import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialTodos = [
  { title: "Swimming", details: "This is a Detail", id: 1, isCompleted: false },
  { title: "Walking", details: "This is a Detail", id: 2, isCompleted: true },
  { title: "Jogging", details: "This is a Detail", id: 3, isCompleted: false },
];

const initialState = {
  currentPage: "todolist",
  error: { message: "", status: 0 },
  isLoading: false,
  isAddSuccess: false,
  isEditSuccess: false,
  todos: [],
  selectedTodo: {},
};

export const getTodos = createAsyncThunk("todo/getTodos", async () => {
  return initialTodos;
});

export const addTodo = createAsyncThunk("todo/addTodo", async (data) => {
  const id = initialTodos.length
    ? initialTodos[initialTodos.length - 1].id + 1
    : 1;

  return {
    ...data,
    isCompleted: false,
    id,
  };
});

export const deleteTodo = createAsyncThunk("todo/deleteTodo", async (id) => {
  return id;
});

export const editTodo = createAsyncThunk("todo/editTodo", async (data) => {
  return data;
});

const todoSlice = createSlice({
  name: "todo",
  reducers: {
    setIsCompleted: (state, action) => {
      const { id, isCompleted } = action.payload;
      state.todos = state.todos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, isCompleted };
        }
        return todo;
      });
    },
    pageChange: (state, action) => {
      state.currentPage = action.payload;
    },
    addCleanup: (state) => {
      state.isAddSuccess = false;
    },
    editCleanup: (state) => {
      state.isEditSuccess = false;
    },
    selectEdit: (state, action) => {
      state.selectedTodo = action.payload;
    },
  },
  initialState,
  extraReducers: {
    [getTodos.pending]: (state) => {
      state.isLoading = true;
    },
    [getTodos.rejected]: (state) => {
      state.isLoading = false;
      state.error = { message: "Something went wrong", status: 500 };
    },
    [getTodos.fulfilled]: (state, action) => {
      state.todos = action.payload;
      state.isLoading = false;
    },
    [addTodo.pending]: (state) => {
      state.isLoading = true;
    },
    [addTodo.rejected]: (state) => {
      state.isLoading = false;
      state.error = { message: "Something went wrong", status: 500 };
    },
    [addTodo.fulfilled]: (state, action) => {
      const data = action.payload;
      if (data.title) {
        state.todos.push(data);
        state.isAddSuccess = true;
      }
      state.isLoading = false;
    },
    [deleteTodo.pending]: (state) => {
      state.isLoading = true;
    },
    [deleteTodo.rejected]: (state) => {
      state.isLoading = false;
      state.error = { message: "Something went wrong", status: 500 };
    },
    [deleteTodo.fulfilled]: (state, action) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
      state.isLoading = false;
    },
    [editTodo.pending]: (state) => {
      state.isLoading = true;
    },
    [editTodo.rejected]: (state) => {
      state.isLoading = false;
      state.error = { message: "Something went wrong", status: 500 };
    },
    [editTodo.fulfilled]: (state, action) => {
      const data = action.payload;

      state.todos = state.todos.map((todo) => {
        if (todo.id === data.id) {
          state.isEditSuccess = true;
          return data;
        }
        return todo;
      });
      state.isLoading = false;
    },
  },
});

export const { setIsCompleted, pageChange, addCleanup, selectEdit } =
  todoSlice.actions;
export default todoSlice.reducer;
export const todoSelect = (state) => state.todo;
