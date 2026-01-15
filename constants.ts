
import { User, Task, UserRole, TaskStatus, Visibility } from './types';

export const CURRENT_USER: User = {
  id: 'u1',
  name: 'Alex Rivera',
  email: 'alex.rivera@deptflow.com',
  role: UserRole.COLLEAGUE,
  avatar: 'https://picsum.photos/seed/user1/100/100'
};

export const HOD_USER: User = {
  id: 'u_hod',
  name: 'Sarah Chen',
  email: 'sarah.chen@deptflow.com',
  role: UserRole.HOD,
  avatar: 'https://picsum.photos/seed/hod/100/100'
};

export const MOCK_USERS: User[] = [
  CURRENT_USER,
  HOD_USER,
  { id: 'u2', name: 'Jordan Smith', email: 'jordan.s@deptflow.com', role: UserRole.COLLEAGUE, avatar: 'https://picsum.photos/seed/user2/100/100' },
  { id: 'u3', name: 'Casey Vong', email: 'casey.v@deptflow.com', role: UserRole.COLLEAGUE, avatar: 'https://picsum.photos/seed/user3/100/100' }
];

const yesterday = new Date();
yesterday.setDate(yesterday.getDate() - 1);

const tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);

const nextWeek = new Date();
nextWeek.setDate(nextWeek.getDate() + 7);

export const MOCK_TASKS: Task[] = [
  {
    id: 't1',
    title: 'Monthly Financial Audit',
    description: 'Prepare the audit report for Q3 and upload documentation.',
    assignedTo: 'u1',
    status: TaskStatus.PENDING,
    dueDate: yesterday.toISOString(), // Late!
    createdAt: new Date().toISOString(),
    visibility: Visibility.HOD_ONLY
  },
  {
    id: 't2',
    title: 'Client Onboarding - Project Orion',
    description: 'Ensure all KYC documents are collected and organized.',
    assignedTo: 'u1',
    status: TaskStatus.COMPLETED,
    dueDate: tomorrow.toISOString(),
    createdAt: new Date().toISOString(),
    visibility: Visibility.PUBLIC
  },
  {
    id: 't3',
    title: 'Security Compliance Review',
    description: 'Verify server logs for the previous month.',
    assignedTo: 'u2',
    status: TaskStatus.CRITICAL, // Manually flagged red
    dueDate: nextWeek.toISOString(),
    createdAt: new Date().toISOString(),
    visibility: Visibility.HOD_ONLY
  },
  {
    id: 't4',
    title: 'Marketing Assets for Launch',
    description: 'Design social media banners and email templates.',
    assignedTo: 'u3',
    status: TaskStatus.PENDING,
    dueDate: nextWeek.toISOString(),
    createdAt: new Date().toISOString(),
    visibility: Visibility.PUBLIC
  }
];
