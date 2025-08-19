import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { dashboardAPI } from '../../utils/api';

// Async thunks
export const fetchDashboardStats = createAsyncThunk(
  'dashboard/fetchStats',
  async (_, { rejectWithValue }) => {
    try {
      const response = await dashboardAPI.getStats();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch dashboard stats');
    }
  }
);

export const fetchRecentActivity = createAsyncThunk(
  'dashboard/fetchRecentActivity',
  async (_, { rejectWithValue }) => {
    try {
      const response = await dashboardAPI.getRecentActivity();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch recent activity');
    }
  }
);

export const fetchNotifications = createAsyncThunk(
  'dashboard/fetchNotifications',
  async (_, { rejectWithValue }) => {
    try {
      const response = await dashboardAPI.getNotifications();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch notifications');
    }
  }
);

const initialState = {
  // Stats
  stats: {
    totalProjects: 0,
    activeProjects: 0,
    completedTasks: 0,
    pendingTasks: 0,
    teamMembers: 0,
    revenue: 0,
    growth: 0,
    efficiency: 0,
  },
  statsLoading: false,
  
  // Recent Activity
  recentActivity: [],
  activityLoading: false,
  
  // Notifications
  notifications: [],
  unreadCount: 0,
  notificationsLoading: false,
  
  // Widgets
  widgets: {
    overview: { enabled: true, position: 1 },
    projects: { enabled: true, position: 2 },
    tasks: { enabled: true, position: 3 },
    team: { enabled: true, position: 4 },
    analytics: { enabled: true, position: 5 },
    calendar: { enabled: true, position: 6 },
    messages: { enabled: true, position: 7 },
    files: { enabled: true, position: 8 },
  },
  
  // Filters and settings
  filters: {
    dateRange: 'last30days',
    projectStatus: 'all',
    taskStatus: 'all',
    teamMember: 'all',
  },
  
  // Layout
  layout: 'grid', // 'grid' or 'list'
  sidebarCollapsed: false,
  
  // Error and loading states
  error: null,
  lastUpdated: null,
};

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    // Widget management
    toggleWidget: (state, action) => {
      const widgetId = action.payload;
      if (state.widgets[widgetId]) {
        state.widgets[widgetId].enabled = !state.widgets[widgetId].enabled;
      }
    },
    
    updateWidgetPosition: (state, action) => {
      const { widgetId, position } = action.payload;
      if (state.widgets[widgetId]) {
        state.widgets[widgetId].position = position;
      }
    },
    
    resetWidgets: (state) => {
      state.widgets = initialState.widgets;
    },
    
    // Filters
    updateFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    
    setDateRange: (state, action) => {
      state.filters.dateRange = action.payload;
    },
    
    setProjectFilter: (state, action) => {
      state.filters.projectStatus = action.payload;
    },
    
    setTaskFilter: (state, action) => {
      state.filters.taskStatus = action.payload;
    },
    
    setTeamFilter: (state, action) => {
      state.filters.teamMember = action.payload;
    },
    
    // Layout
    setLayout: (state, action) => {
      state.layout = action.payload;
    },
    
    toggleSidebar: (state) => {
      state.sidebarCollapsed = !state.sidebarCollapsed;
    },
    
    setSidebarCollapsed: (state, action) => {
      state.sidebarCollapsed = action.payload;
    },
    
    // Notifications
    markNotificationRead: (state, action) => {
      const notificationId = action.payload;
      const notification = state.notifications.find(n => n.id === notificationId);
      if (notification && !notification.read) {
        notification.read = true;
        state.unreadCount = Math.max(0, state.unreadCount - 1);
      }
    },
    
    markAllNotificationsRead: (state) => {
      state.notifications.forEach(notification => {
        notification.read = true;
      });
      state.unreadCount = 0;
    },
    
    removeNotification: (state, action) => {
      const notificationId = action.payload;
      const notificationIndex = state.notifications.findIndex(n => n.id === notificationId);
      if (notificationIndex !== -1) {
        const notification = state.notifications[notificationIndex];
        if (!notification.read) {
          state.unreadCount = Math.max(0, state.unreadCount - 1);
        }
        state.notifications.splice(notificationIndex, 1);
      }
    },
    
    addNotification: (state, action) => {
      const notification = {
        id: Date.now(),
        timestamp: new Date().toISOString(),
        read: false,
        ...action.payload,
      };
      state.notifications.unshift(notification);
      state.unreadCount += 1;
    },
    
    // Activity
    addActivity: (state, action) => {
      const activity = {
        id: Date.now(),
        timestamp: new Date().toISOString(),
        ...action.payload,
      };
      state.recentActivity.unshift(activity);
      
      // Keep only last 50 activities
      if (state.recentActivity.length > 50) {
        state.recentActivity = state.recentActivity.slice(0, 50);
      }
    },
    
    clearActivity: (state) => {
      state.recentActivity = [];
    },
    
    // Stats updates
    updateStats: (state, action) => {
      state.stats = { ...state.stats, ...action.payload };
      state.lastUpdated = new Date().toISOString();
    },
    
    incrementStat: (state, action) => {
      const { stat, value = 1 } = action.payload;
      if (state.stats[stat] !== undefined) {
        state.stats[stat] += value;
      }
    },
    
    decrementStat: (state, action) => {
      const { stat, value = 1 } = action.payload;
      if (state.stats[stat] !== undefined) {
        state.stats[stat] = Math.max(0, state.stats[stat] - value);
      }
    },
    
    // General
    clearError: (state) => {
      state.error = null;
    },
    
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
  
  extraReducers: (builder) => {
    // Fetch stats
    builder
      .addCase(fetchDashboardStats.pending, (state) => {
        state.statsLoading = true;
        state.error = null;
      })
      .addCase(fetchDashboardStats.fulfilled, (state, action) => {
        state.statsLoading = false;
        state.stats = action.payload;
        state.lastUpdated = new Date().toISOString();
      })
      .addCase(fetchDashboardStats.rejected, (state, action) => {
        state.statsLoading = false;
        state.error = action.payload;
      });
    
    // Fetch recent activity
    builder
      .addCase(fetchRecentActivity.pending, (state) => {
        state.activityLoading = true;
        state.error = null;
      })
      .addCase(fetchRecentActivity.fulfilled, (state, action) => {
        state.activityLoading = false;
        state.recentActivity = action.payload;
      })
      .addCase(fetchRecentActivity.rejected, (state, action) => {
        state.activityLoading = false;
        state.error = action.payload;
      });
    
    // Fetch notifications
    builder
      .addCase(fetchNotifications.pending, (state) => {
        state.notificationsLoading = true;
        state.error = null;
      })
      .addCase(fetchNotifications.fulfilled, (state, action) => {
        state.notificationsLoading = false;
        state.notifications = action.payload;
        state.unreadCount = action.payload.filter(n => !n.read).length;
      })
      .addCase(fetchNotifications.rejected, (state, action) => {
        state.notificationsLoading = false;
        state.error = action.payload;
      });
  },
});

export const {
  toggleWidget,
  updateWidgetPosition,
  resetWidgets,
  updateFilters,
  setDateRange,
  setProjectFilter,
  setTaskFilter,
  setTeamFilter,
  setLayout,
  toggleSidebar,
  setSidebarCollapsed,
  markNotificationRead,
  markAllNotificationsRead,
  removeNotification,
  addNotification,
  addActivity,
  clearActivity,
  updateStats,
  incrementStat,
  decrementStat,
  clearError,
  setError,
} = dashboardSlice.actions;

export default dashboardSlice.reducer;