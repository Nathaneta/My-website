import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  // Loading states
  loading: {
    global: false,
    page: false,
    component: {},
  },
  
  // Modal states
  modals: {
    auth: false,
    profile: false,
    settings: false,
    confirmation: false,
    imageViewer: false,
    videoPlayer: false,
    fileUpload: false,
  },
  
  // Modal data
  modalData: {},
  
  // Sidebar states
  sidebar: {
    left: {
      open: true,
      collapsed: false,
      width: 280,
    },
    right: {
      open: false,
      collapsed: false,
      width: 320,
    },
  },
  
  // Mobile responsiveness
  mobile: {
    menuOpen: false,
    drawerOpen: false,
    orientation: 'portrait',
    viewport: {
      width: window.innerWidth,
      height: window.innerHeight,
    },
  },
  
  // Page states
  page: {
    title: '',
    breadcrumbs: [],
    actions: [],
    tabs: [],
    activeTab: 0,
  },
  
  // Search states
  search: {
    query: '',
    results: [],
    loading: false,
    filters: {},
    suggestions: [],
  },
  
  // Toast notifications (different from notification slice)
  toasts: [],
  
  // Drag and drop
  dragDrop: {
    isDragging: false,
    dragData: null,
    dropZones: [],
  },
  
  // Scroll positions
  scrollPositions: {},
  
  // Form states
  forms: {},
  
  // UI preferences
  preferences: {
    animations: true,
    sounds: true,
    tooltips: true,
    shortcuts: true,
    autoSave: true,
    confirmations: true,
  },
  
  // Error boundaries
  errors: [],
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    // Loading actions
    setGlobalLoading: (state, action) => {
      state.loading.global = action.payload;
    },
    
    setPageLoading: (state, action) => {
      state.loading.page = action.payload;
    },
    
    setComponentLoading: (state, action) => {
      const { component, loading } = action.payload;
      state.loading.component[component] = loading;
    },
    
    clearComponentLoading: (state, action) => {
      const component = action.payload;
      delete state.loading.component[component];
    },
    
    // Modal actions
    openModal: (state, action) => {
      const { modal, data } = action.payload;
      if (state.modals[modal] !== undefined) {
        state.modals[modal] = true;
        if (data) {
          state.modalData[modal] = data;
        }
      }
    },
    
    closeModal: (state, action) => {
      const modal = action.payload;
      if (state.modals[modal] !== undefined) {
        state.modals[modal] = false;
        delete state.modalData[modal];
      }
    },
    
    closeAllModals: (state) => {
      Object.keys(state.modals).forEach(modal => {
        state.modals[modal] = false;
      });
      state.modalData = {};
    },
    
    updateModalData: (state, action) => {
      const { modal, data } = action.payload;
      if (state.modals[modal]) {
        state.modalData[modal] = { ...state.modalData[modal], ...data };
      }
    },
    
    // Sidebar actions
    toggleLeftSidebar: (state) => {
      state.sidebar.left.open = !state.sidebar.left.open;
    },
    
    toggleRightSidebar: (state) => {
      state.sidebar.right.open = !state.sidebar.right.open;
    },
    
    setLeftSidebar: (state, action) => {
      state.sidebar.left = { ...state.sidebar.left, ...action.payload };
    },
    
    setRightSidebar: (state, action) => {
      state.sidebar.right = { ...state.sidebar.right, ...action.payload };
    },
    
    collapseLeftSidebar: (state) => {
      state.sidebar.left.collapsed = !state.sidebar.left.collapsed;
    },
    
    collapseRightSidebar: (state) => {
      state.sidebar.right.collapsed = !state.sidebar.right.collapsed;
    },
    
    // Mobile actions
    toggleMobileMenu: (state) => {
      state.mobile.menuOpen = !state.mobile.menuOpen;
    },
    
    setMobileMenu: (state, action) => {
      state.mobile.menuOpen = action.payload;
    },
    
    toggleMobileDrawer: (state) => {
      state.mobile.drawerOpen = !state.mobile.drawerOpen;
    },
    
    setMobileDrawer: (state, action) => {
      state.mobile.drawerOpen = action.payload;
    },
    
    updateViewport: (state, action) => {
      state.mobile.viewport = action.payload;
    },
    
    setOrientation: (state, action) => {
      state.mobile.orientation = action.payload;
    },
    
    // Page actions
    setPageTitle: (state, action) => {
      state.page.title = action.payload;
      document.title = `${action.payload} - Nexora`;
    },
    
    setBreadcrumbs: (state, action) => {
      state.page.breadcrumbs = action.payload;
    },
    
    addBreadcrumb: (state, action) => {
      state.page.breadcrumbs.push(action.payload);
    },
    
    setPageActions: (state, action) => {
      state.page.actions = action.payload;
    },
    
    addPageAction: (state, action) => {
      state.page.actions.push(action.payload);
    },
    
    setTabs: (state, action) => {
      state.page.tabs = action.payload;
    },
    
    setActiveTab: (state, action) => {
      state.page.activeTab = action.payload;
    },
    
    // Search actions
    setSearchQuery: (state, action) => {
      state.search.query = action.payload;
    },
    
    setSearchResults: (state, action) => {
      state.search.results = action.payload;
    },
    
    setSearchLoading: (state, action) => {
      state.search.loading = action.payload;
    },
    
    setSearchFilters: (state, action) => {
      state.search.filters = { ...state.search.filters, ...action.payload };
    },
    
    clearSearchFilters: (state) => {
      state.search.filters = {};
    },
    
    setSearchSuggestions: (state, action) => {
      state.search.suggestions = action.payload;
    },
    
    clearSearch: (state) => {
      state.search.query = '';
      state.search.results = [];
      state.search.suggestions = [];
    },
    
    // Toast actions
    addToast: (state, action) => {
      const toast = {
        id: Date.now() + Math.random(),
        timestamp: new Date().toISOString(),
        duration: 5000,
        ...action.payload,
      };
      state.toasts.push(toast);
    },
    
    removeToast: (state, action) => {
      const id = action.payload;
      state.toasts = state.toasts.filter(toast => toast.id !== id);
    },
    
    clearToasts: (state) => {
      state.toasts = [];
    },
    
    // Drag and drop actions
    startDrag: (state, action) => {
      state.dragDrop.isDragging = true;
      state.dragDrop.dragData = action.payload;
    },
    
    endDrag: (state) => {
      state.dragDrop.isDragging = false;
      state.dragDrop.dragData = null;
    },
    
    setDropZones: (state, action) => {
      state.dragDrop.dropZones = action.payload;
    },
    
    addDropZone: (state, action) => {
      state.dragDrop.dropZones.push(action.payload);
    },
    
    removeDropZone: (state, action) => {
      const id = action.payload;
      state.dragDrop.dropZones = state.dragDrop.dropZones.filter(zone => zone.id !== id);
    },
    
    // Scroll position actions
    saveScrollPosition: (state, action) => {
      const { key, position } = action.payload;
      state.scrollPositions[key] = position;
    },
    
    clearScrollPosition: (state, action) => {
      const key = action.payload;
      delete state.scrollPositions[key];
    },
    
    clearAllScrollPositions: (state) => {
      state.scrollPositions = {};
    },
    
    // Form actions
    setFormData: (state, action) => {
      const { formId, data } = action.payload;
      state.forms[formId] = { ...state.forms[formId], ...data };
    },
    
    clearFormData: (state, action) => {
      const formId = action.payload;
      delete state.forms[formId];
    },
    
    setFormErrors: (state, action) => {
      const { formId, errors } = action.payload;
      if (!state.forms[formId]) {
        state.forms[formId] = {};
      }
      state.forms[formId].errors = errors;
    },
    
    clearFormErrors: (state, action) => {
      const formId = action.payload;
      if (state.forms[formId]) {
        delete state.forms[formId].errors;
      }
    },
    
    // Preferences actions
    updatePreferences: (state, action) => {
      state.preferences = { ...state.preferences, ...action.payload };
    },
    
    togglePreference: (state, action) => {
      const preference = action.payload;
      if (state.preferences[preference] !== undefined) {
        state.preferences[preference] = !state.preferences[preference];
      }
    },
    
    resetPreferences: (state) => {
      state.preferences = initialState.preferences;
    },
    
    // Error boundary actions
    addError: (state, action) => {
      const error = {
        id: Date.now() + Math.random(),
        timestamp: new Date().toISOString(),
        ...action.payload,
      };
      state.errors.push(error);
      
      // Keep only last 10 errors
      if (state.errors.length > 10) {
        state.errors = state.errors.slice(-10);
      }
    },
    
    removeError: (state, action) => {
      const id = action.payload;
      state.errors = state.errors.filter(error => error.id !== id);
    },
    
    clearErrors: (state) => {
      state.errors = [];
    },
    
    // Utility actions
    reset: (state) => {
      return { ...initialState, preferences: state.preferences };
    },
    
    batchUpdate: (state, action) => {
      const updates = action.payload;
      Object.keys(updates).forEach(key => {
        if (state[key] !== undefined) {
          state[key] = { ...state[key], ...updates[key] };
        }
      });
    },
  },
});

export const {
  setGlobalLoading,
  setPageLoading,
  setComponentLoading,
  clearComponentLoading,
  openModal,
  closeModal,
  closeAllModals,
  updateModalData,
  toggleLeftSidebar,
  toggleRightSidebar,
  setLeftSidebar,
  setRightSidebar,
  collapseLeftSidebar,
  collapseRightSidebar,
  toggleMobileMenu,
  setMobileMenu,
  toggleMobileDrawer,
  setMobileDrawer,
  updateViewport,
  setOrientation,
  setPageTitle,
  setBreadcrumbs,
  addBreadcrumb,
  setPageActions,
  addPageAction,
  setTabs,
  setActiveTab,
  setSearchQuery,
  setSearchResults,
  setSearchLoading,
  setSearchFilters,
  clearSearchFilters,
  setSearchSuggestions,
  clearSearch,
  addToast,
  removeToast,
  clearToasts,
  startDrag,
  endDrag,
  setDropZones,
  addDropZone,
  removeDropZone,
  saveScrollPosition,
  clearScrollPosition,
  clearAllScrollPositions,
  setFormData,
  clearFormData,
  setFormErrors,
  clearFormErrors,
  updatePreferences,
  togglePreference,
  resetPreferences,
  addError,
  removeError,
  clearErrors,
  reset,
  batchUpdate,
} = uiSlice.actions;

export default uiSlice.reducer;