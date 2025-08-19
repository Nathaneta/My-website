import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Navbar() {
  const { isAuthenticated, user, logout } = useAuth()
  const navigate = useNavigate()

  return (
    <header className="sticky top-0 z-40 w-full border-b border-gray-200 bg-white/80 backdrop-blur dark:border-gray-800 dark:bg-gray-950/80">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        <Link to="/" className="flex items-center gap-2 text-xl font-semibold">
          <span className="inline-block rounded bg-primary-600 px-2 py-1 text-white">Nexora</span>
          <span className="hidden text-gray-700 dark:text-gray-200 sm:inline">Platform</span>
        </Link>
        <nav className="flex items-center gap-4 text-sm">
          <NavLink to="/services" className={({isActive})=>`hover:text-primary-600 ${isActive? 'text-primary-600 font-semibold' : 'text-gray-700 dark:text-gray-200'}`}>Services</NavLink>
          <NavLink to="/case-studies" className={({isActive})=>`hover:text-primary-600 ${isActive? 'text-primary-600 font-semibold' : 'text-gray-700 dark:text-gray-200'}`}>Case Studies</NavLink>
          <NavLink to="/blog" className={({isActive})=>`hover:text-primary-600 ${isActive? 'text-primary-600 font-semibold' : 'text-gray-700 dark:text-gray-200'}`}>Blog</NavLink>
          <NavLink to="/about" className={({isActive})=>`hover:text-primary-600 ${isActive? 'text-primary-600 font-semibold' : 'text-gray-700 dark:text-gray-200'}`}>About</NavLink>
          <NavLink to="/contact" className={({isActive})=>`hover:text-primary-600 ${isActive? 'text-primary-600 font-semibold' : 'text-gray-700 dark:text-gray-200'}`}>Contact</NavLink>
        </nav>
        <div className="flex items-center gap-3">
          {isAuthenticated ? (
            <>
              <NavLink to="/dashboard" className="rounded-md bg-gray-100 px-3 py-1.5 text-sm dark:bg-gray-800">Dashboard</NavLink>
              <button
                onClick={() => { logout(); navigate('/'); }}
                className="rounded-md bg-primary-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-primary-700"
              >Logout</button>
            </>
          ) : (
            <>
              <NavLink to="/login" className="text-sm">Login</NavLink>
              <NavLink to="/register" className="rounded-md bg-primary-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-primary-700">Get Started</NavLink>
            </>
          )}
        </div>
      </div>
    </header>
  )
}

