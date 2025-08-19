import React from 'react';
import { useAuth } from '../context/AuthContext';

const Dashboard: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
            Welcome to Your Dashboard
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Hello {user?.firstName || 'User'}! Your role-based dashboard is coming soon.
          </p>
          <div className="bg-white rounded-lg shadow p-6 max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Coming Soon Features:</h2>
            <ul className="text-left space-y-2 text-gray-600">
              <li>• Dynamic KPI widgets and live charts</li>
              <li>• AI-powered recommendations and insights</li>
              <li>• Real-time collaboration tools</li>
              <li>• Predictive analytics visualizations</li>
              <li>• Drag & drop task organization</li>
              <li>• Multi-role dashboard customization</li>
              <li>• Push notifications and alerts</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;