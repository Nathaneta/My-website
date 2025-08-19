import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DashboardStats } from '../../types/api';

interface DashboardState {
  stats: DashboardStats | null;
  widgets: Array<{
    id: string;
    type: 'chart' | 'metric' | 'list' | 'progress';
    title: string;
    position: { x: number; y: number };
    size: { width: number; height: number };
    data: any;
    visible: boolean;
  }>;
  layout: 'grid' | 'list';
  dateRange: {
    start: string;
    end: string;
  };
  filters: {
    project: string | null;
    client: string | null;
    status: string | null;
  };
}

const initialState: DashboardState = {
  stats: null,
  widgets: [
    {
      id: 'total-projects',
      type: 'metric',
      title: 'Total Projects',
      position: { x: 0, y: 0 },
      size: { width: 1, height: 1 },
      data: null,
      visible: true,
    },
    {
      id: 'revenue-chart',
      type: 'chart',
      title: 'Revenue Overview',
      position: { x: 1, y: 0 },
      size: { width: 2, height: 2 },
      data: null,
      visible: true,
    },
    {
      id: 'project-progress',
      type: 'progress',
      title: 'Project Progress',
      position: { x: 0, y: 1 },
      size: { width: 1, height: 1 },
      data: null,
      visible: true,
    },
  ],
  layout: 'grid',
  dateRange: {
    start: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    end: new Date().toISOString().split('T')[0],
  },
  filters: {
    project: null,
    client: null,
    status: null,
  },
};

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    setStats: (state, action: PayloadAction<DashboardStats>) => {
      state.stats = action.payload;
    },
    updateWidget: (state, action: PayloadAction<{ id: string; data: any }>) => {
      const widget = state.widgets.find(w => w.id === action.payload.id);
      if (widget) {
        widget.data = action.payload.data;
      }
    },
    moveWidget: (state, action: PayloadAction<{ id: string; position: { x: number; y: number } }>) => {
      const widget = state.widgets.find(w => w.id === action.payload.id);
      if (widget) {
        widget.position = action.payload.position;
      }
    },
    resizeWidget: (state, action: PayloadAction<{ id: string; size: { width: number; height: number } }>) => {
      const widget = state.widgets.find(w => w.id === action.payload.id);
      if (widget) {
        widget.size = action.payload.size;
      }
    },
    toggleWidgetVisibility: (state, action: PayloadAction<string>) => {
      const widget = state.widgets.find(w => w.id === action.payload);
      if (widget) {
        widget.visible = !widget.visible;
      }
    },
    setLayout: (state, action: PayloadAction<'grid' | 'list'>) => {
      state.layout = action.payload;
    },
    setDateRange: (state, action: PayloadAction<{ start: string; end: string }>) => {
      state.dateRange = action.payload;
    },
    setFilters: (state, action: PayloadAction<Partial<DashboardState['filters']>>) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearFilters: (state) => {
      state.filters = {
        project: null,
        client: null,
        status: null,
      };
    },
  },
});

export const {
  setStats,
  updateWidget,
  moveWidget,
  resizeWidget,
  toggleWidgetVisibility,
  setLayout,
  setDateRange,
  setFilters,
  clearFilters,
} = dashboardSlice.actions;

export default dashboardSlice.reducer;