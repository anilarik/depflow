
import React, { useState, useMemo } from 'react';
import { User, UserRole, Task, TaskStatus } from './types';
import { CURRENT_USER, HOD_USER, MOCK_TASKS } from './constants';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import StaffDashboard from './components/StaffDashboard';
import HODDashboard from './components/HODDashboard';
import ReportForm from './components/ReportForm';

const App: React.FC = () => {
  const [user, setUser] = useState<User>(CURRENT_USER);
  const [tasks, setTasks] = useState<Task[]>(MOCK_TASKS);
  const [view, setView] = useState<'dashboard' | 'submit'>('dashboard');
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);

  const toggleUser = () => {
    setUser(prev => prev.role === UserRole.HOD ? CURRENT_USER : HOD_USER);
    setView('dashboard');
  };

  const handleUpdateStatus = (taskId: string, status: TaskStatus) => {
    setTasks(prev => prev.map(t => t.id === taskId ? { ...t, status } : t));
  };

  const handleSubmitReport = (taskId: string) => {
    setSelectedTaskId(taskId);
    setView('submit');
  };

  const handleReportSuccess = () => {
    if (selectedTaskId) {
      handleUpdateStatus(selectedTaskId, TaskStatus.COMPLETED);
    }
    setView('dashboard');
    setSelectedTaskId(null);
  };

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      <Sidebar 
        user={user} 
        activeView={view} 
        setView={setView} 
        onToggleUser={toggleUser} 
      />
      
      <div className="flex-1 flex flex-col min-w-0">
        <Header user={user} />
        
        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          <div className="max-w-6xl mx-auto">
            {view === 'dashboard' ? (
              user.role === UserRole.HOD ? (
                <HODDashboard tasks={tasks} onUpdateStatus={handleUpdateStatus} />
              ) : (
                <StaffDashboard 
                  user={user} 
                  tasks={tasks.filter(t => t.assignedTo === user.id)} 
                  onSubmitReport={handleSubmitReport}
                />
              )
            ) : (
              <ReportForm 
                taskId={selectedTaskId || ''} 
                onCancel={() => setView('dashboard')} 
                onSuccess={handleReportSuccess}
              />
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
