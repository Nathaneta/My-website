import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../types/auth';

interface AuthSliceState {
  user: User | null;
  isAuthenticated: boolean;
  preferences: {
    theme: 'light' | 'dark';
    language: string;
    notifications: boolean;
  };
}

const initialState: AuthSliceState = {
  user: null,
  isAuthenticated: false,
  preferences: {
    theme: 'light',
    language: 'en',
    notifications: true,
  },
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
      state.isAuthenticated = !!action.payload;
    },
    updatePreferences: (state, action: PayloadAction<Partial<AuthSliceState['preferences']>>) => {
      state.preferences = { ...state.preferences, ...action.payload };
    },
    clearAuth: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setUser, updatePreferences, clearAuth } = authSlice.actions;
export default authSlice.reducer;