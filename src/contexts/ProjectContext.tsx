
import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { mockProjects } from "../data/mockProjects";
import { Project, Task, ProjectStatus } from "../types";
import { toast } from "@/components/ui/sonner";

// Context type
type ProjectContextType = {
  projects: Project[];
  getProject: (id: string) => Project | undefined;
  addProject: (project: Omit<Project, "id" | "createdAt" | "updatedAt">) => void;
  updateProject: (id: string, updates: Partial<Omit<Project, "id" | "createdAt" | "updatedAt">>) => void;
  deleteProject: (id: string) => void;
  addTask: (projectId: string, task: Omit<Task, "id" | "createdAt">) => void;
  updateTask: (projectId: string, taskId: string, updates: Partial<Omit<Task, "id" | "createdAt">>) => void;
  deleteTask: (projectId: string, taskId: string) => void;
  getProjectsByStatus: (status: ProjectStatus) => Project[];
  getTasksWithDueDate: () => { projectId: string; projectName: string; task: Task }[];
};

// Create context
const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

// Generate ID helper
const generateId = (): string => {
  return Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15);
};

// Provider component
export const ProjectProvider = ({ children }: { children: ReactNode }) => {
  const [projects, setProjects] = useState<Project[]>([]);

  // Initialize with mock data
  useEffect(() => {
    setProjects(mockProjects);
  }, []);

  // Get a single project
  const getProject = (id: string) => {
    return projects.find(project => project.id === id);
  };

  // Add a new project
  const addProject = (project: Omit<Project, "id" | "createdAt" | "updatedAt">) => {
    const now = new Date().toISOString();
    const newProject: Project = {
      ...project,
      id: generateId(),
      createdAt: now,
      updatedAt: now,
      tasks: project.tasks || []
    };
    
    setProjects(prev => [...prev, newProject]);
    toast.success("Project created successfully");
  };

  // Update an existing project
  const updateProject = (id: string, updates: Partial<Omit<Project, "id" | "createdAt" | "updatedAt">>) => {
    setProjects(prev => 
      prev.map(project => 
        project.id === id
          ? { ...project, ...updates, updatedAt: new Date().toISOString() }
          : project
      )
    );
    toast.success("Project updated successfully");
  };

  // Delete a project
  const deleteProject = (id: string) => {
    setProjects(prev => prev.filter(project => project.id !== id));
    toast.success("Project deleted successfully");
  };

  // Add a task to a project
  const addTask = (projectId: string, task: Omit<Task, "id" | "createdAt">) => {
    const newTask: Task = {
      ...task,
      id: generateId(),
      createdAt: new Date().toISOString()
    };
    
    setProjects(prev => 
      prev.map(project => 
        project.id === projectId
          ? { 
              ...project, 
              tasks: [...project.tasks, newTask],
              updatedAt: new Date().toISOString()
            }
          : project
      )
    );
  };

  // Update a task
  const updateTask = (projectId: string, taskId: string, updates: Partial<Omit<Task, "id" | "createdAt">>) => {
    setProjects(prev => 
      prev.map(project => 
        project.id === projectId
          ? { 
              ...project, 
              tasks: project.tasks.map(task => 
                task.id === taskId
                  ? { ...task, ...updates }
                  : task
              ),
              updatedAt: new Date().toISOString()
            }
          : project
      )
    );
  };

  // Delete a task
  const deleteTask = (projectId: string, taskId: string) => {
    setProjects(prev => 
      prev.map(project => 
        project.id === projectId
          ? { 
              ...project, 
              tasks: project.tasks.filter(task => task.id !== taskId),
              updatedAt: new Date().toISOString()
            }
          : project
      )
    );
  };

  // Get projects by status
  const getProjectsByStatus = (status: ProjectStatus) => {
    return projects.filter(project => project.status === status);
  };

  // Get all tasks with due dates (for calendar view)
  const getTasksWithDueDate = () => {
    const tasksWithDates: { projectId: string; projectName: string; task: Task }[] = [];
    
    projects.forEach(project => {
      project.tasks.forEach(task => {
        if (task.dueDate) {
          tasksWithDates.push({
            projectId: project.id,
            projectName: project.name,
            task
          });
        }
      });
    });
    
    return tasksWithDates;
  };

  const value = {
    projects,
    getProject,
    addProject,
    updateProject,
    deleteProject,
    addTask,
    updateTask,
    deleteTask,
    getProjectsByStatus,
    getTasksWithDueDate
  };

  return <ProjectContext.Provider value={value}>{children}</ProjectContext.Provider>;
};

// Custom hook to use the context
export const useProjects = () => {
  const context = useContext(ProjectContext);
  if (context === undefined) {
    throw new Error("useProjects must be used within a ProjectProvider");
  }
  return context;
};
