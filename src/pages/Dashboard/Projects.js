import React from 'react';

const Projects = () => {
  const projects = [
    { id: 1, name: 'AI Chatbot Implementation', status: 'In Progress', progress: 75 },
    { id: 2, name: 'Data Analytics Dashboard', status: 'Completed', progress: 100 },
    { id: 3, name: 'Process Automation', status: 'Planning', progress: 25 },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Projects
          </h1>
          <button className="btn-primary">
            New Project
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div key={project.id} className="card">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {project.name}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Status: {project.status}
              </p>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-4">
                <div 
                  className="bg-primary-600 h-2 rounded-full" 
                  style={{ width: `${project.progress}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {project.progress}% Complete
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Projects;