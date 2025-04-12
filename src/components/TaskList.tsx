
import { useState } from "react";
import { TaskItem } from "./TaskItem";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Task } from "@/types";
import { Plus } from "lucide-react";
import { useProjects } from "@/contexts/ProjectContext";

interface TaskListProps {
  projectId: string;
  tasks: Task[];
}

export function TaskList({ projectId, tasks }: TaskListProps) {
  const { addTask } = useProjects();
  const [newTaskDescription, setNewTaskDescription] = useState("");

  const handleAddTask = () => {
    if (newTaskDescription.trim() !== "") {
      addTask(projectId, {
        description: newTaskDescription,
        completed: false
      });
      setNewTaskDescription("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleAddTask();
    }
  };
  
  return (
    <div>
      <div className="mb-4 flex gap-2">
        <Input
          placeholder="Add a new task..."
          value={newTaskDescription}
          onChange={(e) => setNewTaskDescription(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-grow"
        />
        <Button onClick={handleAddTask} size="icon">
          <Plus className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="space-y-1 divide-y divide-border">
        {tasks.length === 0 ? (
          <p className="text-muted-foreground text-center py-4">No tasks yet. Add your first task above.</p>
        ) : (
          tasks.map((task) => (
            <TaskItem
              key={task.id}
              projectId={projectId}
              task={task}
            />
          ))
        )}
      </div>
    </div>
  );
}
