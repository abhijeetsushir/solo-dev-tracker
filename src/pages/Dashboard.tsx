
import { useState } from "react";
import { ProjectCard } from "@/components/ProjectCard";
import { ProjectStatusSelector } from "@/components/ProjectStatusSelector";
import { EmptyState } from "@/components/EmptyState";
import { useProjects } from "@/contexts/ProjectContext";
import { ProjectStatus } from "@/types";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { PlusCircle, Search, GanttChart } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function Dashboard() {
  const { projects } = useProjects();
  const [statusFilter, setStatusFilter] = useState<ProjectStatus | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter projects based on status and search query
  const filteredProjects = projects.filter(project => {
    const matchesStatus = statusFilter === 'all' || project.status === statusFilter;
    const matchesSearch = project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.techStack.some(tech => tech.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="container max-w-screen-xl mx-auto py-6 px-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold mb-1">Projects</h1>
          <p className="text-muted-foreground">
            {filteredProjects.length} {filteredProjects.length === 1 ? 'project' : 'projects'} total
          </p>
        </div>
        
        <div className="w-full md:w-auto flex flex-col md:flex-row gap-4">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search projects..."
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <Link to="/projects/new">
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              New Project
            </Button>
          </Link>
        </div>
      </div>
      
      <div className="mb-6">
        <ProjectStatusSelector
          currentStatus={statusFilter}
          onChange={setStatusFilter}
        />
      </div>
      
      {filteredProjects.length === 0 ? (
        <EmptyState
          icon={<GanttChart className="h-8 w-8" />}
          title="No projects found"
          description={
            statusFilter !== 'all'
              ? `You don't have any ${statusFilter.replace('-', ' ')} projects. Change the filter or create a new project.`
              : "You don't have any projects yet. Create your first project to get started!"
          }
          actionLabel="Create a project"
          actionLink="/projects/new"
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProjects.map(project => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}
    </div>
  );
}
