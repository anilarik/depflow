
import React from 'react';
import { Task, TaskStatus, UserRole } from '../types';
import { MOCK_USERS } from '../constants';

interface TaskCardProps {
  task: Task;
  role: UserRole;
  onAction?: (status?: TaskStatus) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, role, onAction }) => {
  const isOverdue = new Date(task.dueDate) < new Date() && task.status !== TaskStatus.COMPLETED;
  const isCritical = task.status === TaskStatus.CRITICAL;
  const isCompleted = task.status === TaskStatus.COMPLETED;

  const getStatusColor = () => {
    if (isCompleted) return 'bg-emerald-50 border-emerald-200';
    if (isCritical) return 'bg-rose-50 border-rose-200 ring-2 ring-rose-500';
    if (isOverdue) return 'bg-amber-50 border-amber-200 ring-2 ring-amber-500';
    return 'bg-white border-slate-200';
  };

  const assignee = MOCK_USERS.find(u => u.id === task.assignedTo);

  return (
    <div className={`p-5 rounded-2xl border transition-all duration-300 flex flex-col h-full shadow-sm hover:shadow-md ${getStatusColor()}`}>
      <div className="flex justify-between items-start mb-4">
        <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider ${
          isCompleted ? 'bg-emerald-200 text-emerald-800' : 
          isCritical ? 'bg-rose-200 text-rose-800' :
          isOverdue ? 'bg-amber-200 text-amber-800' : 'bg-slate-100 text-slate-600'
        }`}>
          {isCompleted ? 'Completed' : isCritical ? 'Critical' : isOverdue ? 'Overdue' : 'Pending'}
        </span>
        <span className="text-xs text-slate-400 font-medium">
          Due: {new Date(task.dueDate).toLocaleDateString()}
        </span>
      </div>

      <h3 className="font-bold text-slate-800 mb-2 leading-tight">{task.title}</h3>
      <p className="text-sm text-slate-500 mb-4 flex-grow line-clamp-3">{task.description}</p>

      <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-100">
        <div className="flex items-center space-x-2">
          <img src={assignee?.avatar} className="w-6 h-6 rounded-full" />
          <span className="text-xs font-semibold text-slate-600">{assignee?.name}</span>
        </div>
        
        {role === UserRole.COLLEAGUE && !isCompleted && (
          <button 
            onClick={() => onAction && onAction()}
            className="bg-blue-600 text-white px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-blue-700 transition-colors"
          >
            Submit Report
          </button>
        )}

        {role === UserRole.HOD && (
          <div className="flex space-x-1">
            <button 
              onClick={() => onAction && onAction(TaskStatus.CRITICAL)}
              title="Flag as Critical"
              className={`p-1.5 rounded-lg transition-colors ${isCritical ? 'bg-rose-500 text-white' : 'bg-slate-100 text-rose-600 hover:bg-rose-100'}`}
            >
              🚩
            </button>
            <button 
              onClick={() => onAction && onAction(TaskStatus.COMPLETED)}
              title="Mark as Done"
              className={`p-1.5 rounded-lg transition-colors ${isCompleted ? 'bg-emerald-500 text-white' : 'bg-slate-100 text-emerald-600 hover:bg-emerald-100'}`}
            >
              ✅
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskCard;
