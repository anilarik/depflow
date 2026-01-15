
import React from 'react';
import { User } from '../types';

interface HeaderProps {
  user: User;
}

const Header: React.FC<HeaderProps> = ({ user }) => {
  return (
    <header className="h-16 bg-white border-b border-slate-200 px-8 flex items-center justify-between">
      <div>
        <h1 className="text-lg font-semibold text-slate-800">
          Welcome back, {user.name.split(' ')[0]} 👋
        </h1>
        <p className="text-sm text-slate-500 hidden md:block">
          Manage your tasks and keep your department running smoothly.
        </p>
      </div>

      <div className="flex items-center space-x-4">
        <button className="p-2 text-slate-400 hover:text-slate-600 relative">
          <span className="text-xl">🔔</span>
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
        </button>
        <div className="h-8 w-px bg-slate-200"></div>
        <img src={user.avatar} className="w-8 h-8 rounded-full border border-slate-200" />
      </div>
    </header>
  );
};

export default Header;
