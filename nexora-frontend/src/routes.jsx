import { lazy, Suspense } from 'react'
import { Navigate, createBrowserRouter } from 'react-router-dom'
import { useAuth } from './context/AuthContext'

const Home = lazy(() => import('./pages/Home'))
const About = lazy(() => import('./pages/About'))
const Services = lazy(() => import('./pages/Services'))
const CaseStudies = lazy(() => import('./pages/CaseStudies'))
const Blog = lazy(() => import('./pages/Blog'))
const Contact = lazy(() => import('./pages/Contact'))
const Login = lazy(() => import('./pages/Login'))
const Register = lazy(() => import('./pages/Register'))
const VerifyEmail = lazy(() => import('./pages/VerifyEmail'))
const ForgotPassword = lazy(() => import('./pages/ForgotPassword'))
const Dashboard = lazy(() => import('./pages/Dashboard'))

function ProtectedRoute({ element }) {
  const { token } = useAuth()
  if (!token) return <Navigate to="/login" replace />
  return element
}

function Loader({ children }) {
  return <Suspense fallback={<div className="p-8 text-center">Loading...</div>}>{children}</Suspense>
}

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Loader>
        <Home />
      </Loader>
    ),
  },
  { path: '/about', element: <Loader><About /></Loader> },
  { path: '/services', element: <Loader><Services /></Loader> },
  { path: '/case-studies', element: <Loader><CaseStudies /></Loader> },
  { path: '/blog', element: <Loader><Blog /></Loader> },
  { path: '/contact', element: <Loader><Contact /></Loader> },
  { path: '/login', element: <Loader><Login /></Loader> },
  { path: '/register', element: <Loader><Register /></Loader> },
  { path: '/verify', element: <Loader><VerifyEmail /></Loader> },
  { path: '/forgot-password', element: <Loader><ForgotPassword /></Loader> },
  {
    path: '/dashboard',
    element: (
      <Loader>
        <ProtectedRoute element={<Dashboard />} />
      </Loader>
    ),
  },
  { path: '*', element: <Navigate to="/" replace /> },
])

