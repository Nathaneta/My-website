import React from 'react';

const Tasks = () => {
  const tasks = [
    { id: 1, title: 'Review AI model performance', priority: 'High', dueDate: '2024-01-20', completed: false },
    { id: 2, title: 'Update dashboard analytics', priority: 'Medium', dueDate: '2024-01-22', completed: true },
    { id: 3, title: 'Client presentation prep', priority: 'High', dueDate: '2024-01-18', completed: false },
    { id: 4, title: 'Code review for automation', priority: 'Low', dueDate: '2024-01-25', completed: false },
  ];

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High': return 'text-red-600 bg-red-100 dark:bg-red-900 dark:text-red-400';
      case 'Medium': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900 dark:text-yellow-400';
      case 'Low': return 'text-green-600 bg-green-100 dark:bg-green-900 dark:text-green-400';
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-700 dark:text-gray-400';
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Tasks
          </h1>
          <button className="btn-primary">
            New Task
          </button>
        </div>
        
        <div className="space-y-4">
          {tasks.map((task) => (
            <div key={task.id} className={`p-4 border rounded-lg ${task.completed ? 'bg-gray-50 dark:bg-gray-700 opacity-75' : 'bg-white dark:bg-gray-800'} border-gray-200 dark:border-gray-600`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <input 
                    type="checkbox" 
                    checked={task.completed}
                    className="h-4 w-4 text-primary-600 rounded"
                    readOnly
                  />
                  <div>
                    <h3 className={`font-medium ${task.completed ? 'line-through text-gray-500' : 'text-gray-900 dark:text-white'}`}>
                      {task.title}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Due: {new Date(task.dueDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(task.priority)}`}>
                  {task.priority}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Tasks;