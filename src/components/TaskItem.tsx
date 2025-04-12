
import { useState } from "react";
import { Task } from "@/types";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { CalendarIcon, Trash2 } from "lucide-react";
import { format } from "date-fns";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { useProjects } from "@/contexts/ProjectContext";

interface TaskItemProps {
  projectId: string;
  task: Task;
}

export function TaskItem({ projectId, task }: TaskItemProps) {
  const { updateTask, deleteTask } = useProjects();
  const [isEditing, setIsEditing] = useState(false);
  const [description, setDescription] = useState(task.description);
  
  const handleCheckboxChange = (checked: boolean) => {
    updateTask(projectId, task.id, { completed: checked });
  };
  
  const handleUpdate = () => {
    if (description.trim() !== "") {
      updateTask(projectId, task.id, { description });
      setIsEditing(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleUpdate();
    } else if (e.key === "Escape") {
      setDescription(task.description);
      setIsEditing(false);
    }
  };

  const handleDateSelect = (date: Date | undefined) => {
    updateTask(projectId, task.id, { 
      dueDate: date ? date.toISOString() : undefined 
    });
  };
  
  return (
    <div className="flex items-center gap-2 py-2 group">
      <Checkbox
        checked={task.completed}
        onCheckedChange={handleCheckboxChange}
        className="data-[state=checked]:bg-brand-purple data-[state=checked]:text-primary-foreground"
      />
      
      {isEditing ? (
        <div className="flex-grow flex gap-2">
          <Input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            onBlur={handleUpdate}
            onKeyDown={handleKeyDown}
            autoFocus
            className="flex-grow"
          />
        </div>
      ) : (
        <div 
          className="flex-grow cursor-pointer hover:text-primary"
          onClick={() => setIsEditing(true)}
        >
          <span className={task.completed ? "line-through text-muted-foreground" : ""}>
            {task.description}
          </span>
        </div>
      )}
      
      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <CalendarIcon className="h-4 w-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="end">
            <Calendar
              mode="single"
              selected={task.dueDate ? new Date(task.dueDate) : undefined}
              onSelect={handleDateSelect}
              initialFocus
            />
          </PopoverContent>
        </Popover>
        
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-destructive hover:text-destructive"
          onClick={() => deleteTask(projectId, task.id)}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
      
      {task.dueDate && (
        <div className="text-xs text-muted-foreground ml-auto mr-2">
          {format(new Date(task.dueDate), "MMM d")}
        </div>
      )}
    </div>
  );
}
