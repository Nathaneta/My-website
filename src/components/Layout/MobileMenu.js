import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useAuth } from '../../context/AuthContext';
import { setMobileMenu } from '../../store/slices/uiSlice';

const MobileMenu = ({ dashboard = false, admin = false }) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { user, hasRole, logout } = useAuth();

  const publicNavItems = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Case Studies', path: '/case-studies' },
    { name: 'Blog', path: '/blog' },
    { name: 'Contact', path: '/contact' },
  ];

  const dashboardNavItems = [
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Projects', path: '/dashboard/projects' },
    { name: 'Tasks', path: '/dashboard/tasks' },
    { name: 'Team', path: '/dashboard/team' },
    { name: 'Analytics', path: '/dashboard/analytics' },
    { name: 'Files', path: '/dashboard/files' },
  ];

  const adminNavItems = [
    { name: 'Admin Dashboard', path: '/admin' },
    { name: 'User Management', path: '/admin/users' },
    { name: 'System Settings', path: '/admin/settings' },
  ];

  const handleLinkClick = () => {
    dispatch(setMobileMenu(false));
  };

  const handleLogout = async () => {
    await logout();
    dispatch(setMobileMenu(false));
  };

  const isActive = (path) => location.pathname === path;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-gray-600 bg-opacity-75"
        onClick={() => dispatch(setMobileMenu(false))}
      />
      
      {/* Menu */}
      <div className="fixed inset-y-0 left-0 flex flex-col w-full max-w-sm bg-white dark:bg-gray-800 shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <Link to="/" className="flex items-center" onClick={handleLinkClick}>
            <div className="h-8 w-8 bg-gradient-to-br from-primary-600 to-secondary-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">N</span>
            </div>
            <span className="ml-2 text-xl font-bold gradient-text">Nexora</span>
          </Link>
          
          <button
            onClick={() => dispatch(setMobileMenu(false))}
            className="p-2 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto py-4">
          <nav className="px-4 space-y-2">
            {/* Public or Dashboard Navigation */}
            {(dashboard ? dashboardNavItems : publicNavItems).map((item) => (
              <Link
                key={item.name}
                to={item.path}
                onClick={handleLinkClick}
                className={`${
                  isActive(item.path)
                    ? 'bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                } block px-3 py-2 text-base font-medium rounded-lg transition-colors`}
              >
                {item.name}
              </Link>
            ))}

            {/* Admin Navigation */}
            {dashboard && hasRole('admin') && (
              <>
                <div className="pt-4">
                  <h3 className="px-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
                    Administration
                  </h3>
                  {adminNavItems.map((item) => (
                    <Link
                      key={item.name}
                      to={item.path}
                      onClick={handleLinkClick}
                      className={`${
                        isActive(item.path)
                          ? 'bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300'
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                      } block px-3 py-2 text-base font-medium rounded-lg transition-colors`}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </>
            )}

            {/* Profile Links for Dashboard */}
            {dashboard && (
              <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                <Link
                  to="/dashboard/profile"
                  onClick={handleLinkClick}
                  className={`${
                    isActive('/dashboard/profile')
                      ? 'bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  } block px-3 py-2 text-base font-medium rounded-lg transition-colors`}
                >
                  Profile
                </Link>
                <Link
                  to="/dashboard/settings"
                  onClick={handleLinkClick}
                  className={`${
                    isActive('/dashboard/settings')
                      ? 'bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  } block px-3 py-2 text-base font-medium rounded-lg transition-colors`}
                >
                  Settings
                </Link>
              </div>
            )}
          </nav>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-200 dark:border-gray-700 p-4">
          {user ? (
            <>
              {/* User Info */}
              <div className="flex items-center mb-4">
                <img
                  className="h-10 w-10 rounded-full object-cover"
                  src={user?.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.firstName + ' ' + user?.lastName)}&background=3b82f6&color=fff`}
                  alt={`${user?.firstName} ${user?.lastName}`}
                />
                <div className="ml-3">
                  <p className="text-base font-medium text-gray-900 dark:text-white">
                    {user?.firstName} {user?.lastName}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {user?.email}
                  </p>
                </div>
              </div>
              
              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="w-full flex items-center px-3 py-2 text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                <svg className="mr-3 h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Sign out
              </button>
            </>
          ) : (
            <div className="space-y-2">
              <Link
                to="/login"
                onClick={handleLinkClick}
                className="w-full flex justify-center px-4 py-2 text-base font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors"
              >
                Sign in
              </Link>
              <Link
                to="/register"
                onClick={handleLinkClick}
                className="w-full flex justify-center px-4 py-2 text-base font-medium text-white bg-primary-600 hover:bg-primary-700 rounded-lg transition-colors"
              >
                Get Started
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;