
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, GanttChart, Github, Globe, Layers } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <header className="px-4 pt-6 pb-4 w-full">
        <div className="container max-w-screen-xl mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <span className="text-xl font-bold text-gradient">ProjectPilot</span>
          </div>
          <div>
            <Link to="/dashboard">
              <Button>Go to Dashboard</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-20 px-4">
          <div className="container max-w-screen-xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 max-w-4xl mx-auto leading-tight">
              <span className="text-gradient">Track your projects</span> with simplicity and focus
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              The minimal project management tool designed for indie hackers and solo developers.
              Focus on building, not managing.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/dashboard">
                <Button size="lg" className="w-full sm:w-auto">
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 px-4 bg-secondary/30">
          <div className="container max-w-screen-xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Everything you need, nothing you don't</h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-background p-6 rounded-lg border border-border">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <GanttChart className="text-primary h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Project Dashboard</h3>
                <p className="text-muted-foreground">
                  Track all your projects in one place with a clean, focused dashboard showing progress and status.
                </p>
              </div>

              <div className="bg-background p-6 rounded-lg border border-border">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <CheckCircle2 className="text-primary h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Task Management</h3>
                <p className="text-muted-foreground">
                  Create tasks, set deadlines, and track progress with a simple but powerful task system.
                </p>
              </div>

              <div className="bg-background p-6 rounded-lg border border-border">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Layers className="text-primary h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Tech Stack Tracking</h3>
                <p className="text-muted-foreground">
                  Tag projects with technologies and keep all project-related information in one place.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4">
          <div className="container max-w-screen-xl mx-auto text-center">
            <div className="glass-morphism max-w-3xl mx-auto rounded-2xl p-10">
              <h2 className="text-3xl font-bold mb-4">Ready to streamline your projects?</h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
                Start tracking your projects with ProjectPilot today. Simple, focused, and designed for developers.
              </p>
              <Link to="/dashboard">
                <Button size="lg">
                  Get Started Now
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-border">
        <div className="container max-w-screen-xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <span className="font-semibold text-gradient">ProjectPilot</span>
          </div>
          <div className="flex items-center gap-4">
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              <Github className="h-5 w-5" />
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              <Globe className="h-5 w-5" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
