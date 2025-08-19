import React, { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { AuthProvider } from './context/AuthContext';
import { store } from './store';
import AppRoutes from './routes';
import ErrorBoundary from './components/ErrorBoundary';
import { initTheme } from './utils/helpers';

// Import styles
import './styles/globals.scss';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  useEffect(() => {
    // Initialize theme on app start
    initTheme();

    // Handle viewport changes for responsive design
    const handleResize = () => {
      const viewport = {
        width: window.innerWidth,
        height: window.innerHeight,
      };
      
      // Update CSS custom properties
      document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`);
      
      // Dispatch to Redux store if needed
      store.dispatch({
        type: 'ui/updateViewport',
        payload: viewport,
      });
    };

    // Handle orientation change
    const handleOrientationChange = () => {
      setTimeout(() => {
        const orientation = window.innerHeight > window.innerWidth ? 'portrait' : 'landscape';
        store.dispatch({
          type: 'ui/setOrientation',
          payload: orientation,
        });
        handleResize();
      }, 100);
    };

    // Add event listeners
    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleOrientationChange);

    // Initial call
    handleResize();

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleOrientationChange);
    };
  }, []);

  // Handle online/offline status
  useEffect(() => {
    const handleOnline = () => {
      store.dispatch({
        type: 'notification/addNotification',
        payload: {
          type: 'success',
          title: 'Connection Restored',
          message: 'You are back online!',
          duration: 3000,
        },
      });
    };

    const handleOffline = () => {
      store.dispatch({
        type: 'notification/addNotification',
        payload: {
          type: 'warning',
          title: 'Connection Lost',
          message: 'You are currently offline. Some features may not work.',
          persistent: true,
        },
      });
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (event) => {
      // Global keyboard shortcuts
      if (event.ctrlKey || event.metaKey) {
        switch (event.key) {
          case 'k':
            // Open search modal
            event.preventDefault();
            store.dispatch({
              type: 'ui/openModal',
              payload: { modal: 'search' },
            });
            break;
          case '/':
            // Focus search input
            event.preventDefault();
            const searchInput = document.querySelector('[data-search-input]');
            if (searchInput) {
              searchInput.focus();
            }
            break;
          case 'b':
            // Toggle left sidebar
            event.preventDefault();
            store.dispatch({ type: 'ui/toggleLeftSidebar' });
            break;
          default:
            break;
        }
      }

      // Escape key to close modals
      if (event.key === 'Escape') {
        store.dispatch({ type: 'ui/closeAllModals' });
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <ErrorBoundary>
      <Provider store={store}>
        <AuthProvider>
          <Router>
            <div className="App">
              <AppRoutes />
              
              {/* Toast Notifications */}
              <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
                className="toast-container"
                toastClassName="toast-item"
                bodyClassName="toast-body"
                progressClassName="toast-progress"
              />
            </div>
          </Router>
        </AuthProvider>
      </Provider>
    </ErrorBoundary>
  );
}

export default App;