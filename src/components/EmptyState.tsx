
import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface EmptyStateProps {
  icon: ReactNode;
  title: string;
  description: string;
  actionLabel?: string;
  actionLink?: string;
}

export function EmptyState({
  icon,
  title,
  description,
  actionLabel,
  actionLink,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center px-4 py-12 text-center">
      <div className="text-muted-foreground mb-6 w-16 h-16 flex items-center justify-center rounded-full bg-secondary/50">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground mb-6 max-w-md">{description}</p>
      {actionLabel && actionLink && (
        <Link to={actionLink}>
          <Button>{actionLabel}</Button>
        </Link>
      )}
    </div>
  );
}
