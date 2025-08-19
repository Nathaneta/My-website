import { configureStore, createSlice } from '@reduxjs/toolkit'

const preferencesSlice = createSlice({
  name: 'preferences',
  initialState: { theme: 'light', language: 'en' },
  reducers: {
    setTheme(state, action) {
      state.theme = action.payload
      document.documentElement.classList.toggle('dark', action.payload === 'dark')
    },
    setLanguage(state, action) {
      state.language = action.payload
    },
  },
})

export const { setTheme, setLanguage } = preferencesSlice.actions

export const store = configureStore({
  reducer: {
    preferences: preferencesSlice.reducer,
  },
})

