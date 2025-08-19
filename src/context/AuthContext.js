import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { authAPI } from '../utils/api';
import { storage } from '../utils/helpers';
import { toast } from 'react-toastify';

// Initial state
const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
  loading: true,
  error: null,
};

// Action types
const AuthActionTypes = {
  LOGIN_START: 'LOGIN_START',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGIN_FAILURE: 'LOGIN_FAILURE',
  LOGOUT: 'LOGOUT',
  REGISTER_START: 'REGISTER_START',
  REGISTER_SUCCESS: 'REGISTER_SUCCESS',
  REGISTER_FAILURE: 'REGISTER_FAILURE',
  VERIFY_EMAIL_START: 'VERIFY_EMAIL_START',
  VERIFY_EMAIL_SUCCESS: 'VERIFY_EMAIL_SUCCESS',
  VERIFY_EMAIL_FAILURE: 'VERIFY_EMAIL_FAILURE',
  LOAD_USER_START: 'LOAD_USER_START',
  LOAD_USER_SUCCESS: 'LOAD_USER_SUCCESS',
  LOAD_USER_FAILURE: 'LOAD_USER_FAILURE',
  UPDATE_PROFILE_SUCCESS: 'UPDATE_PROFILE_SUCCESS',
  CLEAR_ERROR: 'CLEAR_ERROR',
  SET_LOADING: 'SET_LOADING',
};

// Reducer
const authReducer = (state, action) => {
  switch (action.type) {
    case AuthActionTypes.LOGIN_START:
    case AuthActionTypes.REGISTER_START:
    case AuthActionTypes.VERIFY_EMAIL_START:
    case AuthActionTypes.LOAD_USER_START:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case AuthActionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: true,
        loading: false,
        error: null,
      };

    case AuthActionTypes.REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
      };

    case AuthActionTypes.VERIFY_EMAIL_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: true,
        loading: false,
        error: null,
      };

    case AuthActionTypes.LOAD_USER_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        isAuthenticated: true,
        loading: false,
        error: null,
      };

    case AuthActionTypes.UPDATE_PROFILE_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        loading: false,
        error: null,
      };

    case AuthActionTypes.LOGIN_FAILURE:
    case AuthActionTypes.REGISTER_FAILURE:
    case AuthActionTypes.VERIFY_EMAIL_FAILURE:
    case AuthActionTypes.LOAD_USER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };

    case AuthActionTypes.LOGOUT:
      return {
        ...initialState,
        loading: false,
      };

    case AuthActionTypes.CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };

    case AuthActionTypes.SET_LOADING:
      return {
        ...state,
        loading: action.payload.loading,
      };

    default:
      return state;
  }
};

// Create context
const AuthContext = createContext();

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Auth provider component
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Load user on app start
  useEffect(() => {
    const token = storage.get('token');
    const user = storage.get('user');
    
    if (token && user) {
      dispatch({
        type: AuthActionTypes.LOGIN_SUCCESS,
        payload: { user, token }
      });
    } else {
      dispatch({ type: AuthActionTypes.SET_LOADING, payload: { loading: false } });
    }
  }, []);

  // Auto-refresh token
  useEffect(() => {
    if (state.token) {
      const refreshInterval = setInterval(async () => {
        try {
          const response = await authAPI.refreshToken();
          const { token, user } = response.data;
          
          storage.set('token', token);
          storage.set('user', user);
          
          dispatch({
            type: AuthActionTypes.LOGIN_SUCCESS,
            payload: { user, token }
          });
        } catch (error) {
          console.error('Token refresh failed:', error);
          logout();
        }
      }, 15 * 60 * 1000); // Refresh every 15 minutes

      return () => clearInterval(refreshInterval);
    }
  }, [state.token]);

  // Actions
  const login = async (credentials, rememberMe = false) => {
    dispatch({ type: AuthActionTypes.LOGIN_START });
    
    try {
      const response = await authAPI.login(credentials);
      const { user, token } = response.data;
      
      // Store in appropriate storage
      if (rememberMe) {
        storage.set('token', token);
        storage.set('user', user);
      } else {
        sessionStorage.set('token', token);
        sessionStorage.set('user', user);
      }
      
      dispatch({
        type: AuthActionTypes.LOGIN_SUCCESS,
        payload: { user, token }
      });
      
      toast.success(`Welcome back, ${user.firstName}!`);
      return { success: true };
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Login failed';
      dispatch({
        type: AuthActionTypes.LOGIN_FAILURE,
        payload: { error: errorMessage }
      });
      return { success: false, error: errorMessage };
    }
  };

  const register = async (userData) => {
    dispatch({ type: AuthActionTypes.REGISTER_START });
    
    try {
      const response = await authAPI.register(userData);
      
      dispatch({ type: AuthActionTypes.REGISTER_SUCCESS });
      
      toast.success('Registration successful! Please check your email for verification.');
      return { success: true, data: response.data };
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Registration failed';
      dispatch({
        type: AuthActionTypes.REGISTER_FAILURE,
        payload: { error: errorMessage }
      });
      return { success: false, error: errorMessage };
    }
  };

  const verifyEmail = async (verificationData) => {
    dispatch({ type: AuthActionTypes.VERIFY_EMAIL_START });
    
    try {
      const response = await authAPI.verifyEmail(verificationData);
      const { user, token } = response.data;
      
      storage.set('token', token);
      storage.set('user', user);
      
      dispatch({
        type: AuthActionTypes.VERIFY_EMAIL_SUCCESS,
        payload: { user, token }
      });
      
      toast.success('Email verified successfully! Welcome to Nexora!');
      return { success: true };
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Email verification failed';
      dispatch({
        type: AuthActionTypes.VERIFY_EMAIL_FAILURE,
        payload: { error: errorMessage }
      });
      return { success: false, error: errorMessage };
    }
  };

  const resendVerification = async (email) => {
    try {
      await authAPI.resendVerification(email);
      toast.success('Verification email sent!');
      return { success: true };
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to resend verification email';
      toast.error(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  const forgotPassword = async (email) => {
    try {
      await authAPI.forgotPassword(email);
      toast.success('Password reset email sent!');
      return { success: true };
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to send reset email';
      toast.error(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  const resetPassword = async (resetData) => {
    try {
      await authAPI.resetPassword(resetData);
      toast.success('Password reset successfully!');
      return { success: true };
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Password reset failed';
      toast.error(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  const logout = async () => {
    try {
      await authAPI.logout();
    } catch (error) {
      console.error('Logout API call failed:', error);
    } finally {
      // Clear storage regardless of API call result
      storage.remove('token');
      storage.remove('user');
      sessionStorage.remove('token');
      sessionStorage.remove('user');
      
      dispatch({ type: AuthActionTypes.LOGOUT });
      toast.success('Logged out successfully');
    }
  };

  const loadUser = async () => {
    dispatch({ type: AuthActionTypes.LOAD_USER_START });
    
    try {
      const response = await authAPI.getProfile();
      const { user } = response.data;
      
      storage.set('user', user);
      
      dispatch({
        type: AuthActionTypes.LOAD_USER_SUCCESS,
        payload: { user }
      });
      
      return { success: true };
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to load user';
      dispatch({
        type: AuthActionTypes.LOAD_USER_FAILURE,
        payload: { error: errorMessage }
      });
      return { success: false, error: errorMessage };
    }
  };

  const updateProfile = async (userData) => {
    try {
      const response = await authAPI.updateProfile(userData);
      const { user } = response.data;
      
      storage.set('user', user);
      
      dispatch({
        type: AuthActionTypes.UPDATE_PROFILE_SUCCESS,
        payload: { user }
      });
      
      toast.success('Profile updated successfully!');
      return { success: true };
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Profile update failed';
      toast.error(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  const clearError = () => {
    dispatch({ type: AuthActionTypes.CLEAR_ERROR });
  };

  // Check if user has specific role
  const hasRole = (role) => {
    return state.user?.roles?.includes(role) || false;
  };

  // Check if user has specific permission
  const hasPermission = (permission) => {
    return state.user?.permissions?.includes(permission) || false;
  };

  const value = {
    // State
    ...state,
    
    // Actions
    login,
    register,
    verifyEmail,
    resendVerification,
    forgotPassword,
    resetPassword,
    logout,
    loadUser,
    updateProfile,
    clearError,
    
    // Utilities
    hasRole,
    hasPermission,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;