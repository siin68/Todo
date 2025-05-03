import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  token: localStorage.getItem('token'),
  isAuthenticated: !!localStorage.getItem('token'),
  loading: false,
  error: null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
      state.isAuthenticated = true;
      state.loading = false;
      localStorage.setItem('token', action.payload);
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
    logout: (state) => {
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem('token');
    }
  }
});

export const { loginStart, loginSuccess, loginFailure, logout } = authSlice.actions;

export const login = (username: string, password: string) => async (dispatch: any) => {
  try {
    dispatch(loginStart());
    const response = await axios.post('http://localhost:5000/api/auth/login', {
      username,
      password
    });
    dispatch(loginSuccess(response.data.token));
  } catch (error: any) {
    dispatch(loginFailure(error.response?.data?.message || 'Login failed'));
  }
};

export const register = (username: string, password: string) => async (dispatch: any) => {
  try {
    dispatch(loginStart());
    const response = await axios.post('http://localhost:5000/api/auth/register', {
      username,
      password
    });
    dispatch(loginSuccess(response.data.token));
  } catch (error: any) {
    dispatch(loginFailure(error.response?.data?.message || 'Registration failed'));
  }
};

export default authSlice.reducer; 