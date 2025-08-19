import { createSlice } from '@reduxjs/toolkit';
import { storage } from '../../utils/helpers';

const initialState = {
  mode: storage.get('theme', 'light'), // 'light' or 'dark'
  primaryColor: storage.get('primaryColor', 'blue'),
  fontSize: storage.get('fontSize', 'medium'),
  animations: storage.get('animations', true),
  compactMode: storage.get('compactMode', false),
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.mode = state.mode === 'light' ? 'dark' : 'light';
      storage.set('theme', state.mode);
      
      // Apply theme to document
      if (state.mode === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    },
    
    setTheme: (state, action) => {
      state.mode = action.payload;
      storage.set('theme', state.mode);
      
      // Apply theme to document
      if (state.mode === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    },
    
    setPrimaryColor: (state, action) => {
      state.primaryColor = action.payload;
      storage.set('primaryColor', state.primaryColor);
      
      // Apply color scheme to CSS variables
      const colors = {
        blue: { primary: '#3b82f6', secondary: '#06b6d4' },
        purple: { primary: '#8b5cf6', secondary: '#a855f7' },
        green: { primary: '#10b981', secondary: '#059669' },
        red: { primary: '#ef4444', secondary: '#dc2626' },
        orange: { primary: '#f97316', secondary: '#ea580c' },
        pink: { primary: '#ec4899', secondary: '#db2777' },
      };
      
      const selectedColors = colors[action.payload] || colors.blue;
      document.documentElement.style.setProperty('--color-primary', selectedColors.primary);
      document.documentElement.style.setProperty('--color-secondary', selectedColors.secondary);
    },
    
    setFontSize: (state, action) => {
      state.fontSize = action.payload;
      storage.set('fontSize', state.fontSize);
      
      // Apply font size to document
      const fontSizes = {
        small: '14px',
        medium: '16px',
        large: '18px',
        xlarge: '20px',
      };
      
      document.documentElement.style.fontSize = fontSizes[action.payload] || fontSizes.medium;
    },
    
    toggleAnimations: (state) => {
      state.animations = !state.animations;
      storage.set('animations', state.animations);
      
      // Apply animations setting
      if (state.animations) {
        document.documentElement.classList.remove('no-animations');
      } else {
        document.documentElement.classList.add('no-animations');
      }
    },
    
    setAnimations: (state, action) => {
      state.animations = action.payload;
      storage.set('animations', state.animations);
      
      // Apply animations setting
      if (state.animations) {
        document.documentElement.classList.remove('no-animations');
      } else {
        document.documentElement.classList.add('no-animations');
      }
    },
    
    toggleCompactMode: (state) => {
      state.compactMode = !state.compactMode;
      storage.set('compactMode', state.compactMode);
    },
    
    setCompactMode: (state, action) => {
      state.compactMode = action.payload;
      storage.set('compactMode', state.compactMode);
    },
    
    resetTheme: (state) => {
      state.mode = 'light';
      state.primaryColor = 'blue';
      state.fontSize = 'medium';
      state.animations = true;
      state.compactMode = false;
      
      // Clear storage
      storage.remove('theme');
      storage.remove('primaryColor');
      storage.remove('fontSize');
      storage.remove('animations');
      storage.remove('compactMode');
      
      // Reset document
      document.documentElement.classList.remove('dark', 'no-animations');
      document.documentElement.style.fontSize = '16px';
      document.documentElement.style.setProperty('--color-primary', '#3b82f6');
      document.documentElement.style.setProperty('--color-secondary', '#06b6d4');
    },
  },
});

export const {
  toggleTheme,
  setTheme,
  setPrimaryColor,
  setFontSize,
  toggleAnimations,
  setAnimations,
  toggleCompactMode,
  setCompactMode,
  resetTheme,
} = themeSlice.actions;

export default themeSlice.reducer;