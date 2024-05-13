import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface UserState {
  isLoading: boolean;
  isAuthenticated: boolean;
  errorMessage: string | null;
}

const initialState: UserState = {
  isLoading: false,
  isAuthenticated: false,
  errorMessage: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.isLoading = true;
      state.errorMessage = null;
    },
    loginSuccess: (state) => {
      state.isLoading = false;
      state.isAuthenticated = true;
    },
    loginError: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.errorMessage = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
    },
  },
});

export const { loginStart, loginSuccess, loginError, logout } = userSlice.actions;

export default userSlice.reducer;
