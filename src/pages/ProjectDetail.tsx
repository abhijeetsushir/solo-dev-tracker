
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useProjects } from "@/contexts/ProjectContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ProjectStatus } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TechTagInput } from "@/components/TechTagInput";
import { TaskList } from "@/components/TaskList";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { CalendarIcon, ExternalLink, Github, Trash } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";

export default function ProjectDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getProject, updateProject, deleteProject } = useProjects();
  
  const [project, setProject] = useState(getProject(id || ""));
  const [confirmDelete, setConfirmDelete] = useState(false);
  
  // Form state
  const [name, setName] = useState(project?.name || "");
  const [description, setDescription] = useState(project?.description || "");
  const [status, setStatus] = useState<ProjectStatus>(project?.status || "planning");
  const [techStack, setTechStack] = useState<string[]>(project?.techStack || []);
  const [githubUrl, setGithubUrl] = useState(project?.githubUrl || "");
  const [deploymentUrl, setDeploymentUrl] = useState(project?.deploymentUrl || "");
  const [startDate, setStartDate] = useState<Date | undefined>(
    project?.startDate ? new Date(project.startDate) : undefined
  );
  const [targetDate, setTargetDate] = useState<Date | undefined>(
    project?.targetCompletionDate ? new Date(project.targetCompletionDate) : undefined
  );

  // Update local state when project changes
  useEffect(() => {
    const currentProject = getProject(id || "");
    if (currentProject) {
      setProject(currentProject);
      setName(currentProject.name);
      setDescription(currentProject.description);
      setStatus(currentProject.status);
      setTechStack(currentProject.techStack);
      setGithubUrl(currentProject.githubUrl || "");
      setDeploymentUrl(currentProject.deploymentUrl || "");
      setStartDate(currentProject.startDate ? new Date(currentProject.startDate) : undefined);
      setTargetDate(currentProject.targetCompletionDate ? new Date(currentProject.targetCompletionDate) : undefined);
    } else {
      navigate("/dashboard");
    }
  }, [id, getProject, navigate]);

  // Auto-save on input blur
  const handleBlur = () => {
    if (!project) return;
    
    updateProject(project.id, {
      name,
      description,
      status,
      techStack,
      githubUrl: githubUrl || undefined,
      deploymentUrl: deploymentUrl || undefined,
      startDate: startDate?.toISOString(),
      targetCompletionDate: targetDate?.toISOString(),
    });
  };

  const handleStatusChange = (value: ProjectStatus) => {
    setStatus(value);
    if (project) {
      updateProject(project.id, { status: value });
    }
  };

  const handleDeleteProject = () => {
    if (project) {
      deleteProject(project.id);
      navigate("/dashboard");
    }
  };

  if (!project) {
    return null;
  }

  return (
    <div className="container max-w-screen-xl mx-auto py-6 px-4">
      <div className="mb-8">
        <div className="flex flex-col md:flex-row justify-between gap-4 mb-4">
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            onBlur={handleBlur}
            className="text-2xl font-bold bg-transparent border-none p-0 h-auto focus-visible:ring-0 w-full md:w-auto"
            placeholder="Project Title"
          />
          
          <div className="flex items-center gap-4">
            <Select value={status} onValueChange={handleStatusChange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="planning">Planning</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="on-hold">On Hold</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="archived">Archived</SelectItem>
              </SelectContent>
            </Select>

            <Dialog open={confirmDelete} onOpenChange={setConfirmDelete}>
              <DialogTrigger asChild>
                <Button variant="destructive" size="icon">
                  <Trash className="h-4 w-4" />
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Delete project</DialogTitle>
                  <DialogDescription>
                    Are you sure you want to delete "{project.name}"? This action cannot be undone.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setConfirmDelete(false)}>
                    Cancel
                  </Button>
                  <Button variant="destructive" onClick={handleDeleteProject}>
                    Delete
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
        
        <Textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          onBlur={handleBlur}
          placeholder="Project description..."
          className="w-full resize-none bg-transparent border-none p-0 focus-visible:ring-0 text-muted-foreground"
        />
      </div>

      <Tabs defaultValue="overview">
        <TabsList className="mb-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="tasks">Tasks</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-base font-medium">Project Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="techStack">Technologies</Label>
                  <TechTagInput
                    value={techStack}
                    onChange={(value) => {
                      setTechStack(value);
                      if (project) {
                        updateProject(project.id, { techStack: value });
                      }
                    }}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="startDate">Start Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start text-left font-normal"
                          id="startDate"
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {startDate ? (
                            format(startDate, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={startDate}
                          onSelect={(date) => {
                            setStartDate(date);
                            if (project && date) {
                              updateProject(project.id, { 
                                startDate: date.toISOString() 
                              });
                            }
                          }}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="targetDate">Target Completion</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start text-left font-normal"
                          id="targetDate"
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {targetDate ? (
                            format(targetDate, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={targetDate}
                          onSelect={(date) => {
                            setTargetDate(date);
                            if (project && date) {
                              updateProject(project.id, { 
                                targetCompletionDate: date.toISOString() 
                              });
                            }
                          }}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-base font-medium">Links</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="githubUrl" className="flex items-center gap-2">
                    <Github className="h-4 w-4" />
                    GitHub Repository
                  </Label>
                  <Input
                    id="githubUrl"
                    value={githubUrl}
                    onChange={(e) => setGithubUrl(e.target.value)}
                    onBlur={handleBlur}
                    placeholder="https://github.com/yourusername/project"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="deploymentUrl" className="flex items-center gap-2">
                    <ExternalLink className="h-4 w-4" />
                    Deployment URL
                  </Label>
                  <Input
                    id="deploymentUrl"
                    value={deploymentUrl}
                    onChange={(e) => setDeploymentUrl(e.target.value)}
                    onBlur={handleBlur}
                    placeholder="https://your-project.com"
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="tasks">
          <Card>
            <CardHeader>
              <CardTitle className="text-base font-medium">Tasks</CardTitle>
            </CardHeader>
            <CardContent>
              <TaskList projectId={project.id} tasks={project.tasks} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
