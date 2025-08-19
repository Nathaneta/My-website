import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useAuth } from '../../context/AuthContext';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Footer from './Footer';
import MobileMenu from './MobileMenu';
import NotificationCenter from '../NotificationCenter';
import { updateViewport } from '../../store/slices/uiSlice';

const Layout = ({ 
  children, 
  dashboard = false, 
  admin = false,
  fullWidth = false,
  noHeader = false,
  noFooter = false,
  noSidebar = false 
}) => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useAuth();
  const { 
    sidebar,
    mobile,
    modals 
  } = useSelector(state => state.ui);

  // Handle responsive layout
  useEffect(() => {
    const handleResize = () => {
      dispatch(updateViewport({
        width: window.innerWidth,
        height: window.innerHeight,
      }));
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [dispatch]);

  // Determine layout classes
  const getMainClasses = () => {
    let classes = 'min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200';
    
    if (dashboard && isAuthenticated) {
      classes += ' flex';
    }
    
    return classes;
  };

  const getContentClasses = () => {
    let classes = 'flex-1 flex flex-col';
    
    if (dashboard && isAuthenticated && !noSidebar) {
      if (sidebar.left.open && !sidebar.left.collapsed) {
        classes += ' ml-0 lg:ml-64';
      } else if (sidebar.left.open && sidebar.left.collapsed) {
        classes += ' ml-0 lg:ml-16';
      }
    }
    
    return classes;
  };

  const getPageContentClasses = () => {
    let classes = 'flex-1';
    
    if (!fullWidth) {
      if (dashboard) {
        classes += ' p-4 lg:p-6';
      } else {
        classes += ' container mx-auto px-4 sm:px-6 lg:px-8';
      }
    }
    
    return classes;
  };

  return (
    <div className={getMainClasses()}>
      {/* Sidebar for dashboard */}
      {dashboard && isAuthenticated && !noSidebar && (
        <Sidebar admin={admin} />
      )}
      
      {/* Main content area */}
      <div className={getContentClasses()}>
        {/* Header/Navbar */}
        {!noHeader && (
          <Navbar dashboard={dashboard} admin={admin} />
        )}
        
        {/* Page content */}
        <main className={getPageContentClasses()}>
          {children}
        </main>
        
        {/* Footer */}
        {!noFooter && !dashboard && (
          <Footer />
        )}
      </div>
      
      {/* Mobile menu overlay */}
      {mobile.menuOpen && (
        <MobileMenu dashboard={dashboard} admin={admin} />
      )}
      
      {/* Notification Center */}
      <NotificationCenter />
      
      {/* Mobile sidebar backdrop */}
      {dashboard && mobile.menuOpen && (
        <div 
          className="fixed inset-0 bg-gray-600 bg-opacity-75 z-20 lg:hidden"
          onClick={() => dispatch({ type: 'ui/setMobileMenu', payload: false })}
        />
      )}
    </div>
  );
};

export default Layout;