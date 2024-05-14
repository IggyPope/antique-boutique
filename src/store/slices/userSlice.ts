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
    signInStart: (state) => {
      state.isLoading = true;
      state.errorMessage = null;
    },
    signInSuccess: (state) => {
      state.isLoading = false;
      state.isAuthenticated = true;
    },
    signInError: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.errorMessage = action.payload;
    },
    signOut: (state) => {
      state.isAuthenticated = false;
    },
  },
});

export const { signInStart, signInSuccess, signInError, signOut } = userSlice.actions;

export default userSlice.reducer;
