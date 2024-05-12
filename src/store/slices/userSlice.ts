import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface UserState {
  isLoading: boolean;
  isAuthenticated: boolean;
  error: string | null;
}

const initialState: UserState = {
  isLoading: false,
  isAuthenticated: false,
  error: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginStart: (state) => {
      console.log('loginStart');
      state.isLoading = true;
      state.error = null;
    },
    loginSuccess: (state) => {
      console.log('loginSuccess');
      state.isLoading = false;
      state.isAuthenticated = true;
    },
    loginError: (state, action: PayloadAction<string>) => {
      console.log('loginError');
      state.isLoading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
    },
  },
});

export const { loginStart, loginSuccess, loginError } = userSlice.actions;

export default userSlice.reducer;
