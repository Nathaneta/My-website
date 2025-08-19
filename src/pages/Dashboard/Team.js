import React from 'react';

const Team = () => {
  const teamMembers = [
    { id: 1, name: 'John Doe', role: 'Project Manager', email: 'john@nexora.com', avatar: null, status: 'online' },
    { id: 2, name: 'Sarah Johnson', role: 'AI Engineer', email: 'sarah@nexora.com', avatar: null, status: 'away' },
    { id: 3, name: 'Mike Chen', role: 'Data Scientist', email: 'mike@nexora.com', avatar: null, status: 'offline' },
    { id: 4, name: 'Emily Rodriguez', role: 'UX Designer', email: 'emily@nexora.com', avatar: null, status: 'online' },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'online': return 'bg-green-400';
      case 'away': return 'bg-yellow-400';
      case 'offline': return 'bg-gray-400';
      default: return 'bg-gray-400';
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Team Members
          </h1>
          <button className="btn-primary">
            Invite Member
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {teamMembers.map((member) => (
            <div key={member.id} className="card">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <img
                    className="h-12 w-12 rounded-full object-cover"
                    src={member.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=3b82f6&color=fff`}
                    alt={member.name}
                  />
                  <span className={`absolute bottom-0 right-0 block h-3 w-3 rounded-full ring-2 ring-white dark:ring-gray-800 ${getStatusColor(member.status)}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white truncate">
                    {member.name}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                    {member.role}
                  </p>
                  <p className="text-xs text-gray-400 dark:text-gray-500 truncate">
                    {member.email}
                  </p>
                </div>
              </div>
              <div className="mt-4 flex space-x-2">
                <button className="btn-secondary text-sm flex-1">
                  Message
                </button>
                <button className="btn-outline text-sm flex-1">
                  Profile
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Team;