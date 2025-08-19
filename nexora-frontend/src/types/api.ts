export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
  errors?: Record<string, string[]>;
}

export interface PaginationParams {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface DashboardStats {
  totalProjects: number;
  activeProjects: number;
  completedProjects: number;
  totalRevenue: number;
  monthlyGrowth: number;
  clientSatisfaction: number;
  teamProductivity: number;
}

export interface AIRecommendation {
  id: string;
  type: 'task_optimization' | 'resource_allocation' | 'business_insight';
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  confidence: number;
  createdAt: string;
  actionItems?: string[];
}