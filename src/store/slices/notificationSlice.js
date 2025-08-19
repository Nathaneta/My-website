import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  notifications: [],
  unreadCount: 0,
  settings: {
    push: true,
    email: true,
    sms: false,
    desktop: true,
    sound: true,
    vibration: true,
  },
  types: {
    info: { enabled: true, sound: true },
    success: { enabled: true, sound: true },
    warning: { enabled: true, sound: true },
    error: { enabled: true, sound: true },
    task: { enabled: true, sound: false },
    message: { enabled: true, sound: true },
    system: { enabled: true, sound: false },
  },
};

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    addNotification: (state, action) => {
      const notification = {
        id: Date.now() + Math.random(),
        timestamp: new Date().toISOString(),
        read: false,
        persistent: false,
        ...action.payload,
      };
      
      state.notifications.unshift(notification);
      
      if (!notification.read) {
        state.unreadCount += 1;
      }
      
      // Auto-remove non-persistent notifications after 5 seconds
      if (!notification.persistent) {
        setTimeout(() => {
          // This would need to be handled in the component or middleware
        }, 5000);
      }
      
      // Keep only last 100 notifications
      if (state.notifications.length > 100) {
        const removedNotifications = state.notifications.splice(100);
        const unreadRemoved = removedNotifications.filter(n => !n.read).length;
        state.unreadCount = Math.max(0, state.unreadCount - unreadRemoved);
      }
    },
    
    removeNotification: (state, action) => {
      const id = action.payload;
      const index = state.notifications.findIndex(n => n.id === id);
      
      if (index !== -1) {
        const notification = state.notifications[index];
        if (!notification.read) {
          state.unreadCount = Math.max(0, state.unreadCount - 1);
        }
        state.notifications.splice(index, 1);
      }
    },
    
    markAsRead: (state, action) => {
      const id = action.payload;
      const notification = state.notifications.find(n => n.id === id);
      
      if (notification && !notification.read) {
        notification.read = true;
        state.unreadCount = Math.max(0, state.unreadCount - 1);
      }
    },
    
    markAllAsRead: (state) => {
      state.notifications.forEach(notification => {
        notification.read = true;
      });
      state.unreadCount = 0;
    },
    
    clearAll: (state) => {
      state.notifications = [];
      state.unreadCount = 0;
    },
    
    clearRead: (state) => {
      state.notifications = state.notifications.filter(n => !n.read);
    },
    
    updateNotification: (state, action) => {
      const { id, updates } = action.payload;
      const notification = state.notifications.find(n => n.id === id);
      
      if (notification) {
        const wasUnread = !notification.read;
        Object.assign(notification, updates);
        
        // Update unread count if read status changed
        if (wasUnread && notification.read) {
          state.unreadCount = Math.max(0, state.unreadCount - 1);
        } else if (!wasUnread && !notification.read) {
          state.unreadCount += 1;
        }
      }
    },
    
    // Settings
    updateSettings: (state, action) => {
      state.settings = { ...state.settings, ...action.payload };
    },
    
    toggleSetting: (state, action) => {
      const setting = action.payload;
      if (state.settings[setting] !== undefined) {
        state.settings[setting] = !state.settings[setting];
      }
    },
    
    updateTypeSettings: (state, action) => {
      const { type, settings } = action.payload;
      if (state.types[type]) {
        state.types[type] = { ...state.types[type], ...settings };
      }
    },
    
    toggleTypeEnabled: (state, action) => {
      const type = action.payload;
      if (state.types[type]) {
        state.types[type].enabled = !state.types[type].enabled;
      }
    },
    
    toggleTypeSound: (state, action) => {
      const type = action.payload;
      if (state.types[type]) {
        state.types[type].sound = !state.types[type].sound;
      }
    },
    
    // Batch operations
    addMultipleNotifications: (state, action) => {
      const notifications = action.payload.map(notification => ({
        id: Date.now() + Math.random(),
        timestamp: new Date().toISOString(),
        read: false,
        persistent: false,
        ...notification,
      }));
      
      state.notifications.unshift(...notifications);
      
      const unreadCount = notifications.filter(n => !n.read).length;
      state.unreadCount += unreadCount;
      
      // Keep only last 100 notifications
      if (state.notifications.length > 100) {
        const removedNotifications = state.notifications.splice(100);
        const unreadRemoved = removedNotifications.filter(n => !n.read).length;
        state.unreadCount = Math.max(0, state.unreadCount - unreadRemoved);
      }
    },
    
    markMultipleAsRead: (state, action) => {
      const ids = action.payload;
      let readCount = 0;
      
      state.notifications.forEach(notification => {
        if (ids.includes(notification.id) && !notification.read) {
          notification.read = true;
          readCount += 1;
        }
      });
      
      state.unreadCount = Math.max(0, state.unreadCount - readCount);
    },
    
    removeMultiple: (state, action) => {
      const ids = action.payload;
      let unreadRemoved = 0;
      
      state.notifications = state.notifications.filter(notification => {
        if (ids.includes(notification.id)) {
          if (!notification.read) {
            unreadRemoved += 1;
          }
          return false;
        }
        return true;
      });
      
      state.unreadCount = Math.max(0, state.unreadCount - unreadRemoved);
    },
  },
});

// Helper functions for creating different types of notifications
export const createNotification = (type, title, message, options = {}) => ({
  type,
  title,
  message,
  ...options,
});

export const createInfoNotification = (title, message, options = {}) =>
  createNotification('info', title, message, options);

export const createSuccessNotification = (title, message, options = {}) =>
  createNotification('success', title, message, options);

export const createWarningNotification = (title, message, options = {}) =>
  createNotification('warning', title, message, options);

export const createErrorNotification = (title, message, options = {}) =>
  createNotification('error', title, message, { persistent: true, ...options });

export const createTaskNotification = (title, message, options = {}) =>
  createNotification('task', title, message, options);

export const createMessageNotification = (title, message, options = {}) =>
  createNotification('message', title, message, options);

export const createSystemNotification = (title, message, options = {}) =>
  createNotification('system', title, message, options);

export const {
  addNotification,
  removeNotification,
  markAsRead,
  markAllAsRead,
  clearAll,
  clearRead,
  updateNotification,
  updateSettings,
  toggleSetting,
  updateTypeSettings,
  toggleTypeEnabled,
  toggleTypeSound,
  addMultipleNotifications,
  markMultipleAsRead,
  removeMultiple,
} = notificationSlice.actions;

export default notificationSlice.reducer;