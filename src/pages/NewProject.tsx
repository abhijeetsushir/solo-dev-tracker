
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useProjects } from "@/contexts/ProjectContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { TechTagInput } from "@/components/TechTagInput";
import { ArrowLeft } from "lucide-react";
import { Project } from "@/types";

export default function NewProject() {
  const navigate = useNavigate();
  const { addProject } = useProjects();
  
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [techStack, setTechStack] = useState<string[]>([]);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim()) {
      return;
    }
    
    const newProject: Omit<Project, "id" | "createdAt" | "updatedAt"> = {
      name: name.trim(),
      description: description.trim(),
      status: "planning",
      techStack,
      tasks: []
    };
    
    addProject(newProject);
    navigate("/dashboard");
  };
  
  return (
    <div className="container max-w-screen-lg mx-auto py-6 px-4">
      <div className="mb-6">
        <Button variant="ghost" onClick={() => navigate(-1)} className="mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <h1 className="text-2xl font-bold">Create New Project</h1>
      </div>
      
      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>Project Details</CardTitle>
            <CardDescription>
              Enter the basic information about your new project.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Project Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="My Awesome Project"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Briefly describe what this project is about..."
                rows={4}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="techStack">Technologies</Label>
              <TechTagInput
                value={techStack}
                onChange={setTechStack}
              />
              <p className="text-muted-foreground text-xs mt-1">
                Add technologies you'll use in this project. Press Enter after each tag.
              </p>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" type="button" onClick={() => navigate("/dashboard")}>
              Cancel
            </Button>
            <Button type="submit">Create Project</Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}
