
import React from 'react';
import { User, Task, TaskStatus } from '../types';
import TaskCard from './TaskCard';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

interface StaffDashboardProps {
  user: User;
  tasks: Task[];
  onSubmitReport: (taskId: string) => void;
}

const StaffDashboard: React.FC<StaffDashboardProps> = ({ user, tasks, onSubmitReport }) => {
  const completedCount = tasks.filter(t => t.status === TaskStatus.COMPLETED).length;
  const totalCount = tasks.length;
  const completionRate = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  const chartData = [
    { name: 'Completed', value: completedCount },
    { name: 'Remaining', value: totalCount - completedCount },
  ];

  const COLORS = ['#2563eb', '#e2e8f0'];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Stats Section */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-8">
        <div className="w-32 h-32">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                innerRadius={30}
                outerRadius={45}
                paddingAngle={5}
                dataKey="value"
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
        
        <div className="text-center md:text-left">
          <h2 className="text-2xl font-bold text-slate-800">{completionRate}% Done</h2>
          <p className="text-slate-500">
            You have completed <span className="font-semibold text-blue-600">{completedCount}</span> out of <span className="font-semibold">{totalCount}</span> tasks assigned to you.
          </p>
          <div className="mt-3 w-full bg-slate-100 h-2 rounded-full overflow-hidden">
            <div 
              className="bg-blue-600 h-full transition-all duration-1000" 
              style={{ width: `${completionRate}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Tasks Grid */}
      <div>
        <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center">
          <span className="mr-2">📋</span> My Active Tasks
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tasks.map(task => (
            <TaskCard 
              key={task.id} 
              task={task} 
              role={user.role}
              onAction={() => onSubmitReport(task.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default StaffDashboard;
