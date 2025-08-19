import { Link, NavLink } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import ThemeToggle from './ThemeToggle'

export default function Navbar() {
  const { token, logout } = useAuth()

  return (
    <header className="sticky top-0 z-40 border-b border-gray-200/10 bg-white/80 backdrop-blur dark:bg-gray-900/60">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link to="/" className="text-xl font-semibold text-brand">Nexora</Link>
        <nav className="hidden gap-6 md:flex">
          {[
            ['Home', '/'],
            ['About', '/about'],
            ['Services', '/services'],
            ['Case Studies', '/case-studies'],
            ['Blog', '/blog'],
            ['Contact', '/contact'],
          ].map(([label, to]) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `text-sm ${isActive ? 'text-brand' : 'text-gray-600 dark:text-gray-300'} hover:text-brand`
              }
              end
            >
              {label}
            </NavLink>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          {token ? (
            <>
              <Link to="/dashboard" className="rounded-md bg-brand px-3 py-1.5 text-sm text-white">Dashboard</Link>
              <button onClick={logout} className="rounded-md border px-3 py-1.5 text-sm">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="rounded-md px-3 py-1.5 text-sm">Login</Link>
              <Link to="/register" className="rounded-md bg-brand px-3 py-1.5 text-sm text-white">Sign Up</Link>
            </>
          )}
        </div>
      </div>
    </header>
  )
}

