
import { Button } from "@/components/ui/button";
import { ProjectStatus } from "@/types";

interface ProjectStatusSelectorProps {
  currentStatus: ProjectStatus | 'all';
  onChange: (status: ProjectStatus | 'all') => void;
}

export function ProjectStatusSelector({ currentStatus, onChange }: ProjectStatusSelectorProps) {
  const statuses: Array<ProjectStatus | 'all'> = [
    'all',
    'planning',
    'in-progress',
    'on-hold',
    'completed',
    'archived'
  ];

  return (
    <div className="flex flex-wrap gap-2">
      {statuses.map((status) => (
        <Button
          key={status}
          variant={currentStatus === status ? "default" : "outline"}
          size="sm"
          onClick={() => onChange(status)}
          className="capitalize"
        >
          {status.replace('-', ' ')}
        </Button>
      ))}
    </div>
  );
}
