import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { aiAPI } from '../../utils/api';

// Async thunks
export const getChatResponse = createAsyncThunk(
  'ai/getChatResponse',
  async (message, { rejectWithValue }) => {
    try {
      const response = await aiAPI.getChatResponse(message);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to get AI response');
    }
  }
);

export const getPersonalizedContent = createAsyncThunk(
  'ai/getPersonalizedContent',
  async (_, { rejectWithValue }) => {
    try {
      const response = await aiAPI.getPersonalizedContent();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to get personalized content');
    }
  }
);

export const getRecommendations = createAsyncThunk(
  'ai/getRecommendations',
  async (type, { rejectWithValue }) => {
    try {
      const response = await aiAPI.getRecommendations(type);
      return { type, data: response.data };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to get recommendations');
    }
  }
);

export const analyzeRequirements = createAsyncThunk(
  'ai/analyzeRequirements',
  async (requirements, { rejectWithValue }) => {
    try {
      const response = await aiAPI.analyzeRequirements(requirements);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to analyze requirements');
    }
  }
);

const initialState = {
  // Chat state
  chatHistory: [],
  currentMessage: '',
  isTyping: false,
  chatLoading: false,
  
  // Personalization state
  personalizedContent: null,
  contentLoading: false,
  
  // Recommendations state
  recommendations: {
    services: [],
    content: [],
    tasks: [],
    resources: [],
  },
  recommendationsLoading: false,
  
  // Analysis state
  requirementAnalysis: null,
  analysisLoading: false,
  
  // AI Settings
  settings: {
    voiceEnabled: false,
    autoSuggestions: true,
    personalizedExperience: true,
    analyticsEnabled: true,
  },
  
  // General state
  error: null,
  lastUpdated: null,
};

const aiSlice = createSlice({
  name: 'ai',
  initialState,
  reducers: {
    // Chat actions
    addMessage: (state, action) => {
      state.chatHistory.push({
        id: Date.now(),
        ...action.payload,
        timestamp: new Date().toISOString(),
      });
    },
    
    updateMessage: (state, action) => {
      const { id, updates } = action.payload;
      const messageIndex = state.chatHistory.findIndex(msg => msg.id === id);
      if (messageIndex !== -1) {
        state.chatHistory[messageIndex] = {
          ...state.chatHistory[messageIndex],
          ...updates,
        };
      }
    },
    
    deleteMessage: (state, action) => {
      state.chatHistory = state.chatHistory.filter(msg => msg.id !== action.payload);
    },
    
    clearChat: (state) => {
      state.chatHistory = [];
      state.currentMessage = '';
      state.isTyping = false;
    },
    
    setCurrentMessage: (state, action) => {
      state.currentMessage = action.payload;
    },
    
    setTyping: (state, action) => {
      state.isTyping = action.payload;
    },
    
    // Settings actions
    updateSettings: (state, action) => {
      state.settings = { ...state.settings, ...action.payload };
    },
    
    toggleVoice: (state) => {
      state.settings.voiceEnabled = !state.settings.voiceEnabled;
    },
    
    toggleAutoSuggestions: (state) => {
      state.settings.autoSuggestions = !state.settings.autoSuggestions;
    },
    
    togglePersonalization: (state) => {
      state.settings.personalizedExperience = !state.settings.personalizedExperience;
    },
    
    toggleAnalytics: (state) => {
      state.settings.analyticsEnabled = !state.settings.analyticsEnabled;
    },
    
    // Recommendations actions
    addRecommendation: (state, action) => {
      const { type, recommendation } = action.payload;
      if (state.recommendations[type]) {
        state.recommendations[type].push(recommendation);
      }
    },
    
    removeRecommendation: (state, action) => {
      const { type, id } = action.payload;
      if (state.recommendations[type]) {
        state.recommendations[type] = state.recommendations[type].filter(
          item => item.id !== id
        );
      }
    },
    
    clearRecommendations: (state, action) => {
      const type = action.payload;
      if (type && state.recommendations[type]) {
        state.recommendations[type] = [];
      } else {
        state.recommendations = {
          services: [],
          content: [],
          tasks: [],
          resources: [],
        };
      }
    },
    
    // General actions
    clearError: (state) => {
      state.error = null;
    },
    
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
  
  extraReducers: (builder) => {
    // Chat response
    builder
      .addCase(getChatResponse.pending, (state) => {
        state.chatLoading = true;
        state.error = null;
      })
      .addCase(getChatResponse.fulfilled, (state, action) => {
        state.chatLoading = false;
        state.chatHistory.push({
          id: Date.now(),
          type: 'ai',
          content: action.payload.response,
          timestamp: new Date().toISOString(),
          metadata: action.payload.metadata,
        });
        state.lastUpdated = new Date().toISOString();
      })
      .addCase(getChatResponse.rejected, (state, action) => {
        state.chatLoading = false;
        state.error = action.payload;
      });
    
    // Personalized content
    builder
      .addCase(getPersonalizedContent.pending, (state) => {
        state.contentLoading = true;
        state.error = null;
      })
      .addCase(getPersonalizedContent.fulfilled, (state, action) => {
        state.contentLoading = false;
        state.personalizedContent = action.payload;
        state.lastUpdated = new Date().toISOString();
      })
      .addCase(getPersonalizedContent.rejected, (state, action) => {
        state.contentLoading = false;
        state.error = action.payload;
      });
    
    // Recommendations
    builder
      .addCase(getRecommendations.pending, (state) => {
        state.recommendationsLoading = true;
        state.error = null;
      })
      .addCase(getRecommendations.fulfilled, (state, action) => {
        state.recommendationsLoading = false;
        const { type, data } = action.payload;
        if (state.recommendations[type]) {
          state.recommendations[type] = data;
        }
        state.lastUpdated = new Date().toISOString();
      })
      .addCase(getRecommendations.rejected, (state, action) => {
        state.recommendationsLoading = false;
        state.error = action.payload;
      });
    
    // Requirements analysis
    builder
      .addCase(analyzeRequirements.pending, (state) => {
        state.analysisLoading = true;
        state.error = null;
      })
      .addCase(analyzeRequirements.fulfilled, (state, action) => {
        state.analysisLoading = false;
        state.requirementAnalysis = action.payload;
        state.lastUpdated = new Date().toISOString();
      })
      .addCase(analyzeRequirements.rejected, (state, action) => {
        state.analysisLoading = false;
        state.error = action.payload;
      });
  },
});

export const {
  addMessage,
  updateMessage,
  deleteMessage,
  clearChat,
  setCurrentMessage,
  setTyping,
  updateSettings,
  toggleVoice,
  toggleAutoSuggestions,
  togglePersonalization,
  toggleAnalytics,
  addRecommendation,
  removeRecommendation,
  clearRecommendations,
  clearError,
  setError,
} = aiSlice.actions;

export default aiSlice.reducer;