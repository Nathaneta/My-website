import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { AuthResponse, LoginCredentials, RegisterData, VerificationData, ResetPasswordData } from '../types/auth';
import { ApiResponse } from '../types/api';

// API Base Configuration
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

class ApiClient {
  private instance: AxiosInstance;

  constructor() {
    this.instance = axios.create({
      baseURL: API_BASE_URL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors() {
    // Request interceptor - Add auth token
    this.instance.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('nexora_token') || sessionStorage.getItem('nexora_token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Response interceptor - Handle errors
    this.instance.interceptors.response.use(
      (response: AxiosResponse) => {
        return response;
      },
      (error) => {
        if (error.response?.status === 401) {
          // Token expired or invalid
          localStorage.removeItem('nexora_token');
          sessionStorage.removeItem('nexora_token');
          localStorage.removeItem('nexora_user');
          window.location.href = '/login';
        }
        return Promise.reject(error);
      }
    );
  }

  // Generic API methods
  async get<T>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    try {
      const response = await this.instance.get(url, config);
      return response.data;
    } catch (error: any) {
      return this.handleError(error);
    }
  }

  async post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    try {
      const response = await this.instance.post(url, data, config);
      return response.data;
    } catch (error: any) {
      return this.handleError(error);
    }
  }

  async put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    try {
      const response = await this.instance.put(url, data, config);
      return response.data;
    } catch (error: any) {
      return this.handleError(error);
    }
  }

  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    try {
      const response = await this.instance.delete(url, config);
      return response.data;
    } catch (error: any) {
      return this.handleError(error);
    }
  }

  private handleError(error: any): ApiResponse {
    if (error.response?.data) {
      return error.response.data;
    }
    
    return {
      success: false,
      message: error.message || 'An unexpected error occurred',
      error: error.message,
    };
  }

  // Authentication endpoints
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    return this.post<AuthResponse['data']>('/auth/login', credentials);
  }

  async register(data: RegisterData): Promise<AuthResponse> {
    return this.post<AuthResponse['data']>('/auth/register', data);
  }

  async verifyEmail(data: VerificationData): Promise<AuthResponse> {
    return this.post<AuthResponse['data']>('/auth/verify', data);
  }

  async resendVerificationCode(email: string): Promise<ApiResponse> {
    return this.post('/auth/resend-verification', { email });
  }

  async forgotPassword(email: string): Promise<ApiResponse> {
    return this.post('/auth/forgot-password', { email });
  }

  async resetPassword(data: ResetPasswordData): Promise<ApiResponse> {
    return this.post('/auth/reset-password', data);
  }

  async refreshToken(): Promise<AuthResponse> {
    return this.post<AuthResponse['data']>('/auth/refresh');
  }

  async logout(): Promise<ApiResponse> {
    return this.post('/auth/logout');
  }

  // User profile endpoints
  async getProfile(): Promise<ApiResponse> {
    return this.get('/user/profile');
  }

  async updateProfile(data: any): Promise<ApiResponse> {
    return this.put('/user/profile', data);
  }

  // Dashboard endpoints
  async getDashboardStats(): Promise<ApiResponse> {
    return this.get('/dashboard/stats');
  }

  async getAIRecommendations(): Promise<ApiResponse> {
    return this.get('/ai/recommendations');
  }
}

// Export singleton instance
export const apiClient = new ApiClient();
export default apiClient;