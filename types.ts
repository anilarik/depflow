
export enum UserRole {
  HOD = 'HOD',
  COLLEAGUE = 'COLLEAGUE'
}

export enum TaskStatus {
  PENDING = 'PENDING',
  COMPLETED = 'COMPLETED',
  CRITICAL = 'CRITICAL', // Red
  OVERDUE = 'OVERDUE'    // Amber (calculated)
}

export enum Visibility {
  HOD_ONLY = 'HOD_ONLY',
  PUBLIC = 'PUBLIC'
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

export interface Attachment {
  name: string;
  url: string;
  type: 'image' | 'pdf' | 'other';
}

export interface Task {
  id: string;
  title: string;
  description: string;
  assignedTo: string; // User ID
  status: TaskStatus;
  dueDate: string; // ISO String
  createdAt: string;
  sharedFolderLink?: string;
  attachments?: Attachment[];
  visibility: Visibility;
}

export interface Report {
  id: string;
  taskId: string;
  submittedBy: string;
  description: string;
  sharedFolderLink: string;
  attachments: Attachment[];
  submittedAt: string;
  visibility: Visibility;
}

export interface DashboardStats {
  name: string;
  completed: number;
  pending: number;
  late: number;
}
