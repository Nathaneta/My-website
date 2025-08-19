import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AIRecommendation } from '../../types/api';

interface AIState {
  recommendations: AIRecommendation[];
  chatHistory: Array<{
    id: string;
    type: 'user' | 'ai';
    message: string;
    timestamp: string;
  }>;
  isProcessing: boolean;
  personalization: {
    preferences: string[];
    industry: string | null;
    role: string | null;
    interests: string[];
  };
  insights: Array<{
    id: string;
    type: 'performance' | 'optimization' | 'prediction';
    title: string;
    description: string;
    confidence: number;
    createdAt: string;
  }>;
}

const initialState: AIState = {
  recommendations: [],
  chatHistory: [],
  isProcessing: false,
  personalization: {
    preferences: [],
    industry: null,
    role: null,
    interests: [],
  },
  insights: [],
};

const aiSlice = createSlice({
  name: 'ai',
  initialState,
  reducers: {
    setRecommendations: (state, action: PayloadAction<AIRecommendation[]>) => {
      state.recommendations = action.payload;
    },
    addRecommendation: (state, action: PayloadAction<AIRecommendation>) => {
      state.recommendations.unshift(action.payload);
    },
    removeRecommendation: (state, action: PayloadAction<string>) => {
      state.recommendations = state.recommendations.filter(r => r.id !== action.payload);
    },
    addChatMessage: (state, action: PayloadAction<Omit<AIState['chatHistory'][0], 'id' | 'timestamp'>>) => {
      const message = {
        ...action.payload,
        id: Date.now().toString(),
        timestamp: new Date().toISOString(),
      };
      state.chatHistory.push(message);
    },
    clearChatHistory: (state) => {
      state.chatHistory = [];
    },
    setProcessing: (state, action: PayloadAction<boolean>) => {
      state.isProcessing = action.payload;
    },
    updatePersonalization: (state, action: PayloadAction<Partial<AIState['personalization']>>) => {
      state.personalization = { ...state.personalization, ...action.payload };
    },
    addInsight: (state, action: PayloadAction<Omit<AIState['insights'][0], 'id' | 'createdAt'>>) => {
      const insight = {
        ...action.payload,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
      };
      state.insights.unshift(insight);
    },
    clearInsights: (state) => {
      state.insights = [];
    },
  },
});

export const {
  setRecommendations,
  addRecommendation,
  removeRecommendation,
  addChatMessage,
  clearChatHistory,
  setProcessing,
  updatePersonalization,
  addInsight,
  clearInsights,
} = aiSlice.actions;

export default aiSlice.reducer;