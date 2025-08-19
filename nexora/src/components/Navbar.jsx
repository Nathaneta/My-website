import { Link, NavLink } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Navbar() {
  const { user, logout } = useAuth()
  const navItem = ({ isActive }) =>
    isActive ? 'text-brand font-medium' : 'text-neutral-300 hover:text-white'

  return (
    <header className="border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 h-16 flex items-center justify-between">
        <Link to="/" className="font-extrabold text-xl">Nexora</Link>
        <nav className="flex items-center gap-6">
          <NavLink to="/services" className={navItem}>Services</NavLink>
          <NavLink to="/case-studies" className={navItem}>Case Studies</NavLink>
          <NavLink to="/blog" className={navItem}>Blog</NavLink>
          <NavLink to="/about" className={navItem}>About</NavLink>
          <NavLink to="/contact" className={navItem}>Contact</NavLink>
        </nav>
        <div className="flex items-center gap-4">
          {user ? (
            <>
              <NavLink to="/dashboard" className={navItem}>Dashboard</NavLink>
              <button onClick={logout} className="text-sm text-neutral-300 hover:text-white">Logout</button>
            </>
          ) : (
            <>
              <NavLink to="/login" className={navItem}>Login</NavLink>
              <NavLink to="/register" className="bg-brand hover:bg-brand-dark px-3 py-1.5 rounded-md text-sm">Sign Up</NavLink>
            </>
          )}
        </div>
      </div>
    </header>
  )
}

