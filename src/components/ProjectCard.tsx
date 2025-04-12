
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Project } from "@/types";
import { CalendarClock, CheckCircle2, CircleDashed, Clock, ExternalLink, Github } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface ProjectCardProps {
  project: Project;
}

const statusIcons = {
  "planning": <CircleDashed className="h-4 w-4 text-blue-400" />,
  "in-progress": <Clock className="h-4 w-4 text-yellow-400" />,
  "on-hold": <CalendarClock className="h-4 w-4 text-orange-400" />,
  "completed": <CheckCircle2 className="h-4 w-4 text-green-400" />,
  "archived": <CheckCircle2 className="h-4 w-4 text-gray-400" />
};

const statusColors = {
  "planning": "bg-blue-500/10 text-blue-400 border-blue-500/20",
  "in-progress": "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  "on-hold": "bg-orange-500/10 text-orange-400 border-orange-500/20",
  "completed": "bg-green-500/10 text-green-400 border-green-500/20",
  "archived": "bg-gray-500/10 text-gray-400 border-gray-500/20"
};

export function ProjectCard({ project }: ProjectCardProps) {
  // Calculate completed tasks percentage
  const totalTasks = project.tasks.length;
  const completedTasks = project.tasks.filter(task => task.completed).length;
  const progressPercentage = totalTasks > 0 ? Math.floor((completedTasks / totalTasks) * 100) : 0;
  
  return (
    <Link to={`/projects/${project.id}`}>
      <Card className="hover:border-primary/50 transition-colors h-full flex flex-col">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <CardTitle className="text-lg">{project.name}</CardTitle>
            <Badge variant="outline" className={`${statusColors[project.status]} flex items-center gap-1.5`}>
              {statusIcons[project.status]}
              {project.status.replace('-', ' ')}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="py-2 flex-grow">
          <p className="text-muted-foreground text-sm line-clamp-2 mb-3">
            {project.description}
          </p>
          
          <div className="flex flex-wrap gap-1.5 mb-4">
            {project.techStack.slice(0, 3).map((tech, index) => (
              <Badge key={index} variant="secondary" className="font-normal">
                {tech}
              </Badge>
            ))}
            {project.techStack.length > 3 && (
              <Badge variant="secondary" className="font-normal">
                +{project.techStack.length - 3}
              </Badge>
            )}
          </div>

          {totalTasks > 0 && (
            <div className="space-y-1">
              <div className="text-xs text-muted-foreground flex justify-between">
                <span>Progress</span>
                <span>{completedTasks}/{totalTasks} tasks</span>
              </div>
              <div className="h-1.5 w-full bg-secondary rounded-full overflow-hidden">
                <div 
                  className="h-full bg-brand-purple rounded-full" 
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter className="pt-2 text-xs text-muted-foreground flex justify-between">
          <div className="flex items-center gap-2">
            {project.githubUrl && <Github className="h-3.5 w-3.5" />}
            {project.deploymentUrl && <ExternalLink className="h-3.5 w-3.5" />}
          </div>
          <div>
            Updated {formatDistanceToNow(new Date(project.updatedAt), { addSuffix: true })}
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
