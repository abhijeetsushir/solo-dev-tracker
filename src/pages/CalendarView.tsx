
import { useState } from "react";
import { useProjects } from "@/contexts/ProjectContext";
import { Calendar } from "@/components/ui/calendar";
import { Task } from "@/types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Clock } from "lucide-react";
import { format } from "date-fns";
import { Link } from "react-router-dom";

export default function CalendarView() {
  const { projects, getTasksWithDueDate } = useProjects();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  
  // Get all tasks with due dates
  const tasksWithDueDates = getTasksWithDueDate();
  
  // Create a map of dates to task IDs for the calendar
  const dateToTasksMap = new Map<string, { projectId: string; projectName: string; task: Task }[]>();
  
  tasksWithDueDates.forEach(({ projectId, projectName, task }) => {
    if (task.dueDate) {
      const dateKey = task.dueDate.split('T')[0]; // Get just the date part
      if (!dateToTasksMap.has(dateKey)) {
        dateToTasksMap.set(dateKey, []);
      }
      dateToTasksMap.get(dateKey)?.push({ projectId, projectName, task });
    }
  });
  
  // Get tasks for the selected date
  const getTasksForSelectedDate = () => {
    if (!selectedDate) return [];
    
    const dateKey = selectedDate.toISOString().split('T')[0];
    return dateToTasksMap.get(dateKey) || [];
  };
  
  // Get the selected date as a formatted string
  const formattedSelectedDate = selectedDate ? format(selectedDate, "MMMM d, yyyy") : "";
  
  return (
    <div className="container max-w-screen-xl mx-auto py-6 px-4">
      <h1 className="text-2xl font-bold mb-6">Calendar</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="rounded-md"
              modifiersClassNames={{
                selected: "bg-primary text-primary-foreground",
              }}
              modifiers={{
                // Highlight dates that have tasks
                booked: Array.from(dateToTasksMap.keys()).map(dateString => new Date(dateString)),
              }}
              modifiersStyles={{
                booked: {
                  fontWeight: "bold",
                  borderBottom: "2px solid var(--brand-purple)",
                },
              }}
            />
          </Card>
        </div>
        
        <div>
          <Card className="h-full">
            <CardHeader className="pb-2">
              <CardTitle>{formattedSelectedDate}</CardTitle>
              <CardDescription>
                {getTasksForSelectedDate().length} {getTasksForSelectedDate().length === 1 ? "task" : "tasks"} due
              </CardDescription>
            </CardHeader>
            <CardContent>
              {getTasksForSelectedDate().length === 0 ? (
                <p className="text-muted-foreground text-center py-4">
                  No tasks due on this date
                </p>
              ) : (
                <ul className="space-y-3">
                  {getTasksForSelectedDate().map(({ projectId, projectName, task }) => (
                    <li key={task.id} className="border-b border-border pb-3 last:border-0">
                      <Link to={`/projects/${projectId}`} className="block">
                        <div className="flex items-start">
                          <div className="mr-2 mt-1">
                            {task.completed ? (
                              <Check className="h-4 w-4 text-green-400" />
                            ) : (
                              <Clock className="h-4 w-4 text-yellow-400" />
                            )}
                          </div>
                          <div>
                            <p className={`${task.completed ? "line-through text-muted-foreground" : ""}`}>
                              {task.description}
                            </p>
                            <div className="flex items-center mt-1">
                              <Badge variant="outline" className="text-xs font-normal">
                                {projectName}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
