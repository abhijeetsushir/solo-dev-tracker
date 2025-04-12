
export type ProjectStatus = 'planning' | 'in-progress' | 'on-hold' | 'completed' | 'archived';

export interface Task {
  id: string;
  description: string;
  completed: boolean;
  dueDate?: string; // ISO date string
  createdAt: string; // ISO date string
}

export interface Project {
  id: string;
  name: string;
  description: string;
  status: ProjectStatus;
  techStack: string[]; // Tech tags
  githubUrl?: string;
  deploymentUrl?: string;
  startDate?: string; // ISO date string
  targetCompletionDate?: string; // ISO date string
  tasks: Task[];
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
}
