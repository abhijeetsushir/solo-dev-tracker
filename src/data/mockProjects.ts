
import { Project, ProjectStatus } from "../types";

// Helper function to generate a UUID
const generateId = (): string => {
  return Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15);
};

// Get current date as ISO string
const now = new Date().toISOString();

// Create mock projects
export const mockProjects: Project[] = [
  {
    id: generateId(),
    name: "ProjectPilot",
    description: "A minimal personal project tracker for solo developers and indie hackers.",
    status: "in-progress",
    techStack: ["React", "TypeScript", "Tailwind CSS", "Supabase"],
    githubUrl: "https://github.com/username/projectpilot",
    deploymentUrl: "https://projectpilot.vercel.app",
    startDate: new Date(2023, 11, 15).toISOString(),
    targetCompletionDate: new Date(2024, 0, 31).toISOString(),
    tasks: [
      {
        id: generateId(),
        description: "Design UI wireframes",
        completed: true,
        createdAt: now
      },
      {
        id: generateId(),
        description: "Set up project structure",
        completed: true,
        createdAt: now
      },
      {
        id: generateId(),
        description: "Implement authentication",
        completed: false,
        dueDate: new Date(2024, 0, 5).toISOString(),
        createdAt: now
      },
      {
        id: generateId(),
        description: "Create dashboard view",
        completed: false,
        dueDate: new Date(2024, 0, 12).toISOString(),
        createdAt: now
      }
    ],
    createdAt: now,
    updatedAt: now
  },
  {
    id: generateId(),
    name: "AI Writing Assistant",
    description: "Chrome extension that helps with writing and editing content online.",
    status: "planning",
    techStack: ["JavaScript", "Chrome Extension API", "OpenAI"],
    startDate: new Date(2024, 0, 10).toISOString(),
    tasks: [
      {
        id: generateId(),
        description: "Research Chrome extension development",
        completed: false,
        createdAt: now
      },
      {
        id: generateId(),
        description: "Design extension UI",
        completed: false,
        dueDate: new Date(2024, 0, 20).toISOString(),
        createdAt: now
      }
    ],
    createdAt: now,
    updatedAt: now
  },
  {
    id: generateId(),
    name: "Personal Portfolio",
    description: "My personal portfolio website showcasing projects and skills.",
    status: "completed",
    techStack: ["Next.js", "Tailwind CSS", "Framer Motion"],
    githubUrl: "https://github.com/username/portfolio",
    deploymentUrl: "https://myportfolio.dev",
    startDate: new Date(2023, 9, 1).toISOString(),
    targetCompletionDate: new Date(2023, 10, 15).toISOString(),
    tasks: [
      {
        id: generateId(),
        description: "Design mockups",
        completed: true,
        createdAt: now
      },
      {
        id: generateId(),
        description: "Implement responsive design",
        completed: true,
        createdAt: now
      },
      {
        id: generateId(),
        description: "Add projects section",
        completed: true,
        createdAt: now
      },
      {
        id: generateId(),
        description: "Deploy to Vercel",
        completed: true,
        createdAt: now
      }
    ],
    createdAt: now,
    updatedAt: now
  },
  {
    id: generateId(),
    name: "Task Management API",
    description: "RESTful API for task management applications built with Node.js and Express.",
    status: "on-hold",
    techStack: ["Node.js", "Express", "MongoDB", "JWT"],
    githubUrl: "https://github.com/username/task-api",
    startDate: new Date(2023, 8, 10).toISOString(),
    tasks: [
      {
        id: generateId(),
        description: "Define API endpoints",
        completed: true,
        createdAt: now
      },
      {
        id: generateId(),
        description: "Implement user authentication",
        completed: true,
        createdAt: now
      },
      {
        id: generateId(),
        description: "Write tests",
        completed: false,
        createdAt: now
      }
    ],
    createdAt: now,
    updatedAt: now
  }
];
