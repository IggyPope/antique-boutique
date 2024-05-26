import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface UserState {
  isLoading: boolean;
  isAuthenticated: boolean;
  isInitialRender: boolean;
  errorMessage: string | null;
}

const initialState: UserState = {
  isLoading: false,
  isInitialRender: true,
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
      state.isInitialRender = false;
    },
    signInError: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.errorMessage = action.payload;
    },
    signOut: (state) => {
      state.isAuthenticated = false;
    },

    setIsInitialRender: (state, action: PayloadAction<boolean>) => {
      state.isInitialRender = action.payload;
    },
  },
});

export const { signInStart, signInSuccess, signInError, signOut, setIsInitialRender } =
  userSlice.actions;

export default userSlice.reducer;
