
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Calendar, GanttChart, Home, Menu, Plus, X } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

export function Header() {
  const location = useLocation();
  const isMobile = useIsMobile();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const links = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: <Home className="h-4 w-4 mr-2" />
    },
    {
      name: "Projects",
      path: "/projects",
      icon: <GanttChart className="h-4 w-4 mr-2" />
    },
    {
      name: "Calendar",
      path: "/calendar",
      icon: <Calendar className="h-4 w-4 mr-2" />
    }
  ];

  const isActive = (path: string) => {
    if (path === "/dashboard" && location.pathname === "/") {
      return true;
    }
    return location.pathname.startsWith(path);
  };

  return (
    <header className="w-full px-4 py-3 sm:py-4 border-b border-border sticky top-0 z-50 bg-background/80 backdrop-blur-md">
      <div className="container max-w-screen-xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <span className="text-xl font-bold text-gradient">ProjectPilot</span>
        </Link>

        {isMobile ? (
          <>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>

            {mobileMenuOpen && (
              <div className="fixed inset-0 top-[57px] bg-background z-50 flex flex-col">
                <nav className="container px-4 py-6 flex flex-col gap-2">
                  {links.map((link) => (
                    <Link
                      key={link.path}
                      to={link.path}
                      className={`flex items-center px-4 py-3 rounded-md transition-colors ${
                        isActive(link.path)
                          ? "bg-secondary text-foreground"
                          : "text-muted-foreground hover:bg-secondary/50"
                      }`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {link.icon}
                      {link.name}
                    </Link>
                  ))}
                  <div className="mt-4">
                    <Link to="/projects/new" onClick={() => setMobileMenuOpen(false)}>
                      <Button className="w-full">
                        <Plus className="h-4 w-4 mr-2" />
                        New Project
                      </Button>
                    </Link>
                  </div>
                </nav>
              </div>
            )}
          </>
        ) : (
          <div className="flex items-center gap-1 sm:gap-2">
            <nav className="flex items-center mr-4">
              {links.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-3 py-2 text-sm rounded-md transition-colors flex items-center mx-1 ${
                    isActive(link.path)
                      ? "bg-secondary text-foreground"
                      : "text-muted-foreground hover:bg-secondary/50"
                  }`}
                >
                  {link.icon}
                  {link.name}
                </Link>
              ))}
            </nav>
            <Link to="/projects/new">
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                New Project
              </Button>
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
