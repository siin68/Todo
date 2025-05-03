import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface Todo {
  _id: string;
  name: string;
  completed: boolean;
}

interface TodoState {
  todos: Todo[];
  loading: boolean;
  error: string | null;
}

const initialState: TodoState = {
  todos: [],
  loading: false,
  error: null
};

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    fetchTodosStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchTodosSuccess: (state, action: PayloadAction<Todo[]>) => {
      state.todos = action.payload;
      state.loading = false;
    },
    fetchTodosFailure: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
    addTodo: (state, action: PayloadAction<Todo>) => {
      state.todos.push(action.payload);
    },
    updateTodo: (state, action: PayloadAction<Todo>) => {
      const index = state.todos.findIndex(todo => todo._id === action.payload._id);
      if (index !== -1) {
        state.todos[index] = action.payload;
      }
    },
    deleteTodo: (state, action: PayloadAction<string>) => {
      state.todos = state.todos.filter(todo => todo._id !== action.payload);
    }
  }
});

export const {
  fetchTodosStart,
  fetchTodosSuccess,
  fetchTodosFailure,
  addTodo,
  updateTodo,
  deleteTodo
} = todoSlice.actions;

export const fetchTodos = () => async (dispatch: any, getState: any) => {
  try {
    dispatch(fetchTodosStart());
    const token = getState().auth.token;
    const response = await axios.get('http://localhost:5000/api/todos', {
      headers: { Authorization: `Bearer ${token}` }
    });
    dispatch(fetchTodosSuccess(response.data));
  } catch (error: any) {
    dispatch(fetchTodosFailure(error.response?.data?.message || 'Failed to fetch todos'));
  }
};

export const createTodo = (name: string) => async (dispatch: any, getState: any) => {
  try {
    const token = getState().auth.token;
    const response = await axios.post('http://localhost:5000/api/todos', { name }, {
      headers: { Authorization: `Bearer ${token}` }
    });
    dispatch(addTodo(response.data));
  } catch (error: any) {
    console.error('Error creating todo:', error);
  }
};

export const toggleTodo = (id: string, completed: boolean) => async (dispatch: any, getState: any) => {
  try {
    const token = getState().auth.token;
    const response = await axios.put(`http://localhost:5000/api/todos/${id}`, { completed }, {
      headers: { Authorization: `Bearer ${token}` }
    });
    dispatch(updateTodo(response.data));
  } catch (error: any) {
    console.error('Error updating todo:', error);
  }
};

export const removeTodo = (id: string) => async (dispatch: any, getState: any) => {
  try {
    const token = getState().auth.token;
    await axios.delete(`http://localhost:5000/api/todos/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    dispatch(deleteTodo(id));
  } catch (error: any) {
    console.error('Error deleting todo:', error);
  }
};

export default todoSlice.reducer; 