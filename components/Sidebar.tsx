
import React from 'react';
import { User, UserRole } from '../types';

interface SidebarProps {
  user: User;
  activeView: string;
  setView: (view: 'dashboard' | 'submit') => void;
  onToggleUser: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ user, activeView, setView, onToggleUser }) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'submit', label: 'Upload Work', icon: '📤' },
  ];

  return (
    <aside className="w-64 bg-slate-900 text-white flex flex-col hidden md:flex">
      <div className="p-6 flex items-center space-x-3">
        <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-xl">
          🚀
        </div>
        <span className="font-bold text-xl tracking-tight">DeptFlow</span>
      </div>

      <nav className="flex-1 px-4 mt-4 space-y-1">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setView(item.id as any)}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
              activeView === item.id 
                ? 'bg-blue-600 text-white' 
                : 'text-slate-400 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <span className="text-xl">{item.icon}</span>
            <span className="font-medium">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="p-4 bg-slate-800 m-4 rounded-xl">
        <div className="flex items-center space-x-3 mb-4">
          <img src={user.avatar} className="w-10 h-10 rounded-full border-2 border-blue-500" />
          <div className="overflow-hidden">
            <p className="font-semibold truncate">{user.name}</p>
            <p className="text-xs text-slate-400">{user.role}</p>
          </div>
        </div>
        <button 
          onClick={onToggleUser}
          className="w-full text-xs bg-slate-700 py-2 rounded border border-slate-600 hover:bg-slate-600 transition-colors"
        >
          Switch Role (Demo)
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
