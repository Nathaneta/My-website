import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme, setPrimaryColor } from '../../store/slices/themeSlice';

const Settings = () => {
  const dispatch = useDispatch();
  const { mode, primaryColor } = useSelector(state => state.theme);

  const colors = [
    { name: 'Blue', value: 'blue', color: 'bg-blue-500' },
    { name: 'Purple', value: 'purple', color: 'bg-purple-500' },
    { name: 'Green', value: 'green', color: 'bg-green-500' },
    { name: 'Red', value: 'red', color: 'bg-red-500' },
    { name: 'Orange', value: 'orange', color: 'bg-orange-500' },
    { name: 'Pink', value: 'pink', color: 'bg-pink-500' },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Settings
        </h1>
        
        <div className="space-y-8">
          {/* Appearance Settings */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              Appearance
            </h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Dark Mode
                  </label>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Toggle between light and dark theme
                  </p>
                </div>
                <button
                  onClick={() => dispatch(toggleTheme())}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 ${
                    mode === 'dark' ? 'bg-primary-600' : 'bg-gray-200'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      mode === 'dark' ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3 block">
                  Primary Color
                </label>
                <div className="flex space-x-3">
                  {colors.map((color) => (
                    <button
                      key={color.value}
                      onClick={() => dispatch(setPrimaryColor(color.value))}
                      className={`w-8 h-8 rounded-full ${color.color} ${
                        primaryColor === color.value
                          ? 'ring-2 ring-offset-2 ring-gray-400 dark:ring-gray-600'
                          : ''
                      }`}
                      title={color.name}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Notification Settings */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              Notifications
            </h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Email Notifications
                  </label>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Receive email updates about your projects
                  </p>
                </div>
                <input type="checkbox" className="h-4 w-4 text-primary-600 rounded" defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Push Notifications
                  </label>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Receive push notifications in your browser
                  </p>
                </div>
                <input type="checkbox" className="h-4 w-4 text-primary-600 rounded" />
              </div>
            </div>
          </div>
          
          {/* Privacy Settings */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              Privacy
            </h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Analytics
                  </label>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Help improve our service by sharing usage data
                  </p>
                </div>
                <input type="checkbox" className="h-4 w-4 text-primary-600 rounded" defaultChecked />
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
          <button className="btn-primary">
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;