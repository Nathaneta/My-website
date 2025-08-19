import React, { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import LoadingSpinner from './components/LoadingSpinner';
import Layout from './components/Layout/Layout';

// Lazy load pages for better performance
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Services = lazy(() => import('./pages/Services'));
const CaseStudies = lazy(() => import('./pages/CaseStudies'));
const Blog = lazy(() => import('./pages/Blog'));
const Contact = lazy(() => import('./pages/Contact'));

// Auth pages
const Login = lazy(() => import('./pages/auth/Login'));
const Register = lazy(() => import('./pages/auth/Register'));
const VerifyEmail = lazy(() => import('./pages/auth/VerifyEmail'));
const ForgotPassword = lazy(() => import('./pages/auth/ForgotPassword'));
const ResetPassword = lazy(() => import('./pages/auth/ResetPassword'));

// Dashboard pages
const Dashboard = lazy(() => import('./pages/Dashboard/Dashboard'));
const Profile = lazy(() => import('./pages/Dashboard/Profile'));
const Settings = lazy(() => import('./pages/Dashboard/Settings'));
const Projects = lazy(() => import('./pages/Dashboard/Projects'));
const Tasks = lazy(() => import('./pages/Dashboard/Tasks'));
const Team = lazy(() => import('./pages/Dashboard/Team'));
const Analytics = lazy(() => import('./pages/Dashboard/Analytics'));
const Files = lazy(() => import('./pages/Dashboard/Files'));

// Admin pages
const AdminDashboard = lazy(() => import('./pages/Admin/AdminDashboard'));
const UserManagement = lazy(() => import('./pages/Admin/UserManagement'));
const SystemSettings = lazy(() => import('./pages/Admin/SystemSettings'));

// Error pages
const NotFound = lazy(() => import('./pages/errors/NotFound'));
const ServerError = lazy(() => import('./pages/errors/ServerError'));
const Unauthorized = lazy(() => import('./pages/errors/Unauthorized'));

// Loading component wrapper
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center">
    <LoadingSpinner size="large" text="Loading page..." />
  </div>
);

// Suspense wrapper for lazy components
const SuspenseWrapper = ({ children }) => (
  <Suspense fallback={<PageLoader />}>
    {children}
  </Suspense>
);

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={
        <Layout>
          <SuspenseWrapper>
            <Home />
          </SuspenseWrapper>
        </Layout>
      } />
      
      <Route path="/about" element={
        <Layout>
          <SuspenseWrapper>
            <About />
          </SuspenseWrapper>
        </Layout>
      } />
      
      <Route path="/services" element={
        <Layout>
          <SuspenseWrapper>
            <Services />
          </SuspenseWrapper>
        </Layout>
      } />
      
      <Route path="/case-studies" element={
        <Layout>
          <SuspenseWrapper>
            <CaseStudies />
          </SuspenseWrapper>
        </Layout>
      } />
      
      <Route path="/blog" element={
        <Layout>
          <SuspenseWrapper>
            <Blog />
          </SuspenseWrapper>
        </Layout>
      } />
      
      <Route path="/contact" element={
        <Layout>
          <SuspenseWrapper>
            <Contact />
          </SuspenseWrapper>
        </Layout>
      } />

      {/* Authentication Routes */}
      <Route path="/login" element={
        <SuspenseWrapper>
          <Login />
        </SuspenseWrapper>
      } />
      
      <Route path="/register" element={
        <SuspenseWrapper>
          <Register />
        </SuspenseWrapper>
      } />
      
      <Route path="/verify-email" element={
        <SuspenseWrapper>
          <VerifyEmail />
        </SuspenseWrapper>
      } />
      
      <Route path="/forgot-password" element={
        <SuspenseWrapper>
          <ForgotPassword />
        </SuspenseWrapper>
      } />
      
      <Route path="/reset-password" element={
        <SuspenseWrapper>
          <ResetPassword />
        </SuspenseWrapper>
      } />

      {/* Protected Dashboard Routes */}
      <Route path="/dashboard" element={
        <ProtectedRoute>
          <Layout dashboard>
            <SuspenseWrapper>
              <Dashboard />
            </SuspenseWrapper>
          </Layout>
        </ProtectedRoute>
      } />
      
      <Route path="/dashboard/profile" element={
        <ProtectedRoute>
          <Layout dashboard>
            <SuspenseWrapper>
              <Profile />
            </SuspenseWrapper>
          </Layout>
        </ProtectedRoute>
      } />
      
      <Route path="/dashboard/settings" element={
        <ProtectedRoute>
          <Layout dashboard>
            <SuspenseWrapper>
              <Settings />
            </SuspenseWrapper>
          </Layout>
        </ProtectedRoute>
      } />
      
      <Route path="/dashboard/projects" element={
        <ProtectedRoute>
          <Layout dashboard>
            <SuspenseWrapper>
              <Projects />
            </SuspenseWrapper>
          </Layout>
        </ProtectedRoute>
      } />
      
      <Route path="/dashboard/tasks" element={
        <ProtectedRoute>
          <Layout dashboard>
            <SuspenseWrapper>
              <Tasks />
            </SuspenseWrapper>
          </Layout>
        </ProtectedRoute>
      } />
      
      <Route path="/dashboard/team" element={
        <ProtectedRoute>
          <Layout dashboard>
            <SuspenseWrapper>
              <Team />
            </SuspenseWrapper>
          </Layout>
        </ProtectedRoute>
      } />
      
      <Route path="/dashboard/analytics" element={
        <ProtectedRoute>
          <Layout dashboard>
            <SuspenseWrapper>
              <Analytics />
            </SuspenseWrapper>
          </Layout>
        </ProtectedRoute>
      } />
      
      <Route path="/dashboard/files" element={
        <ProtectedRoute>
          <Layout dashboard>
            <SuspenseWrapper>
              <Files />
            </SuspenseWrapper>
          </Layout>
        </ProtectedRoute>
      } />

      {/* Admin Routes */}
      <Route path="/admin" element={
        <ProtectedRoute requiredRole="admin">
          <Layout dashboard admin>
            <SuspenseWrapper>
              <AdminDashboard />
            </SuspenseWrapper>
          </Layout>
        </ProtectedRoute>
      } />
      
      <Route path="/admin/users" element={
        <ProtectedRoute requiredRole="admin">
          <Layout dashboard admin>
            <SuspenseWrapper>
              <UserManagement />
            </SuspenseWrapper>
          </Layout>
        </ProtectedRoute>
      } />
      
      <Route path="/admin/settings" element={
        <ProtectedRoute requiredRole="admin">
          <Layout dashboard admin>
            <SuspenseWrapper>
              <SystemSettings />
            </SuspenseWrapper>
          </Layout>
        </ProtectedRoute>
      } />

      {/* Error Routes */}
      <Route path="/unauthorized" element={
        <SuspenseWrapper>
          <Unauthorized />
        </SuspenseWrapper>
      } />
      
      <Route path="/server-error" element={
        <SuspenseWrapper>
          <ServerError />
        </SuspenseWrapper>
      } />

      {/* Catch all - 404 */}
      <Route path="*" element={
        <SuspenseWrapper>
          <NotFound />
        </SuspenseWrapper>
      } />
    </Routes>
  );
};

export default AppRoutes;