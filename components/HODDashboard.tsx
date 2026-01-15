
import React from 'react';
import { Task, TaskStatus, UserRole, User } from '../types';
import { MOCK_USERS } from '../constants';
import TaskCard from './TaskCard';

interface HODDashboardProps {
  tasks: Task[];
  onUpdateStatus: (taskId: string, status: TaskStatus) => void;
}

const HODDashboard: React.FC<HODDashboardProps> = ({ tasks, onUpdateStatus }) => {
  const stats = MOCK_USERS.filter(u => u.role === UserRole.COLLEAGUE).map(u => {
    const userTasks = tasks.filter(t => t.assignedTo === u.id);
    const completed = userTasks.filter(t => t.status === TaskStatus.COMPLETED).length;
    const pending = userTasks.filter(t => t.status === TaskStatus.PENDING).length;
    const late = userTasks.filter(t => {
      const isOverdue = new Date(t.dueDate) < new Date() && t.status !== TaskStatus.COMPLETED;
      return isOverdue || t.status === TaskStatus.CRITICAL;
    }).length;

    return { id: u.id, name: u.name, completed, pending, late, avatar: u.avatar };
  });

  const handleNudge = (userName: string) => {
    alert(`Nudge sent to ${userName}! Notification & Email triggered.`);
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Department Summary Table */}
      <section className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100">
          <h2 className="text-xl font-bold text-slate-800">Team Performance</h2>
          <p className="text-sm text-slate-500">Overview of task status across the department.</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 text-slate-500 text-sm uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4 font-semibold">Staff Member</th>
                <th className="px-6 py-4 font-semibold">Completed</th>
                <th className="px-6 py-4 font-semibold">Pending</th>
                <th className="px-6 py-4 font-semibold">Late/Critical</th>
                <th className="px-6 py-4 font-semibold">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {stats.map(row => (
                <tr key={row.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 flex items-center space-x-3">
                    <img src={row.avatar} className="w-8 h-8 rounded-full" />
                    <span className="font-medium text-slate-700">{row.name}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold">
                      {row.completed}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-600">{row.pending}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                      row.late > 0 ? 'bg-red-100 text-red-700' : 'bg-slate-100 text-slate-400'
                    }`}>
                      {row.late}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button 
                      onClick={() => handleNudge(row.name)}
                      className="text-blue-600 hover:text-blue-800 text-sm font-semibold underline"
                    >
                      Ask Update
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Full Task List with HOD Controls */}
      <section>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-slate-800">Department Tasks</h2>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/30">
            + Assign New Task
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tasks.map(task => (
            <TaskCard 
              key={task.id} 
              task={task} 
              role={UserRole.HOD}
              onAction={(newStatus) => onUpdateStatus(task.id, newStatus!)}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default HODDashboard;
