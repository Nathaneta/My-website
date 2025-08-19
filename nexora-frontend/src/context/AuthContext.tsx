import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { User, AuthState, LoginCredentials, RegisterData, VerificationData, ResetPasswordData } from '../types/auth';
import { AuthUtils } from '../utils/auth';
import { apiClient } from '../utils/api';
import toast from 'react-hot-toast';

// Auth Actions
type AuthAction =
  | { type: 'AUTH_START' }
  | { type: 'AUTH_SUCCESS'; payload: { user: User; token: string } }
  | { type: 'AUTH_FAILURE'; payload: string }
  | { type: 'LOGOUT' }
  | { type: 'CLEAR_ERROR' }
  | { type: 'UPDATE_USER'; payload: User };

// Initial State
const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

// Reducer
const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'AUTH_START':
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case 'AUTH_SUCCESS':
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      };
    case 'AUTH_FAILURE':
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
        error: action.payload,
      };
    case 'LOGOUT':
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      };
    case 'CLEAR_ERROR':
      return {
        ...state,
        error: null,
      };
    case 'UPDATE_USER':
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
};

// Context Type
interface AuthContextType extends AuthState {
  login: (credentials: LoginCredentials) => Promise<boolean>;
  register: (data: RegisterData) => Promise<boolean>;
  verifyEmail: (data: VerificationData) => Promise<boolean>;
  resendVerificationCode: (email: string) => Promise<boolean>;
  forgotPassword: (email: string) => Promise<boolean>;
  resetPassword: (data: ResetPasswordData) => Promise<boolean>;
  logout: () => Promise<void>;
  clearError: () => void;
  updateUser: (user: User) => void;
  checkAuth: () => Promise<void>;
}

// Create Context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider Component
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Check authentication status on mount
  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async (): Promise<void> => {
    const token = AuthUtils.getToken();
    const user = AuthUtils.getUser();

    if (token && user && !AuthUtils.isTokenExpired(token)) {
      dispatch({ type: 'AUTH_SUCCESS', payload: { user, token } });
    } else {
      AuthUtils.clearAuth();
      dispatch({ type: 'LOGOUT' });
    }
  };

  const login = async (credentials: LoginCredentials): Promise<boolean> => {
    dispatch({ type: 'AUTH_START' });

    try {
      const response = await apiClient.login(credentials);

      if (response.success && response.data) {
        const { user, token } = response.data;
        
        AuthUtils.setToken(token, credentials.rememberMe || false);
        AuthUtils.setUser(user);
        
        dispatch({ type: 'AUTH_SUCCESS', payload: { user, token } });
        toast.success('Login successful!');
        return true;
      } else {
        dispatch({ type: 'AUTH_FAILURE', payload: response.message || 'Login failed' });
        toast.error(response.message || 'Login failed');
        return false;
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Login failed';
      dispatch({ type: 'AUTH_FAILURE', payload: errorMessage });
      toast.error(errorMessage);
      return false;
    }
  };

  const register = async (data: RegisterData): Promise<boolean> => {
    dispatch({ type: 'AUTH_START' });

    try {
      const response = await apiClient.register(data);

      if (response.success) {
        dispatch({ type: 'CLEAR_ERROR' });
        toast.success('Registration successful! Please check your email for verification code.');
        return true;
      } else {
        dispatch({ type: 'AUTH_FAILURE', payload: response.message || 'Registration failed' });
        toast.error(response.message || 'Registration failed');
        return false;
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Registration failed';
      dispatch({ type: 'AUTH_FAILURE', payload: errorMessage });
      toast.error(errorMessage);
      return false;
    }
  };

  const verifyEmail = async (data: VerificationData): Promise<boolean> => {
    dispatch({ type: 'AUTH_START' });

    try {
      const response = await apiClient.verifyEmail(data);

      if (response.success && response.data) {
        const { user, token } = response.data;
        
        AuthUtils.setToken(token);
        AuthUtils.setUser(user);
        
        dispatch({ type: 'AUTH_SUCCESS', payload: { user, token } });
        toast.success('Email verified successfully!');
        return true;
      } else {
        dispatch({ type: 'AUTH_FAILURE', payload: response.message || 'Verification failed' });
        toast.error(response.message || 'Verification failed');
        return false;
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Verification failed';
      dispatch({ type: 'AUTH_FAILURE', payload: errorMessage });
      toast.error(errorMessage);
      return false;
    }
  };

  const resendVerificationCode = async (email: string): Promise<boolean> => {
    try {
      const response = await apiClient.resendVerificationCode(email);

      if (response.success) {
        toast.success('Verification code sent!');
        return true;
      } else {
        toast.error(response.message || 'Failed to send verification code');
        return false;
      }
    } catch (error: any) {
      toast.error('Failed to send verification code');
      return false;
    }
  };

  const forgotPassword = async (email: string): Promise<boolean> => {
    try {
      const response = await apiClient.forgotPassword(email);

      if (response.success) {
        toast.success('Reset code sent to your email!');
        return true;
      } else {
        toast.error(response.message || 'Failed to send reset code');
        return false;
      }
    } catch (error: any) {
      toast.error('Failed to send reset code');
      return false;
    }
  };

  const resetPassword = async (data: ResetPasswordData): Promise<boolean> => {
    try {
      const response = await apiClient.resetPassword(data);

      if (response.success) {
        toast.success('Password reset successfully!');
        return true;
      } else {
        toast.error(response.message || 'Password reset failed');
        return false;
      }
    } catch (error: any) {
      toast.error('Password reset failed');
      return false;
    }
  };

  const logout = async (): Promise<void> => {
    try {
      await apiClient.logout();
    } catch (error) {
      // Continue with logout even if API call fails
    } finally {
      AuthUtils.clearAuth();
      dispatch({ type: 'LOGOUT' });
      toast.success('Logged out successfully');
    }
  };

  const clearError = (): void => {
    dispatch({ type: 'CLEAR_ERROR' });
  };

  const updateUser = (user: User): void => {
    AuthUtils.setUser(user);
    dispatch({ type: 'UPDATE_USER', payload: user });
  };

  const contextValue: AuthContextType = {
    ...state,
    login,
    register,
    verifyEmail,
    resendVerificationCode,
    forgotPassword,
    resetPassword,
    logout,
    clearError,
    updateUser,
    checkAuth,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom Hook
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};