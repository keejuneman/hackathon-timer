import { useState } from "react";
import Timer from "@/components/Timer";
import DeadlineInput from "@/components/DeadlineInput";
import { Github } from "lucide-react";

const Index = () => {
  const [deadline, setDeadline] = useState<Date | null>(null);

  return (
    <div className="min-h-screen bg-background cyber-grid overflow-hidden">
      {/* Gradient overlay */}
      <div className="fixed inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 pointer-events-none" />
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-8 md:py-12">
        <header className="text-center mb-12 md:mb-16">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-black mb-4 bg-gradient-cyber bg-clip-text text-transparent animate-pulse-glow">
            HACKATHON TIMER
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground font-medium">
            Track your deadline with precision
          </p>
        </header>

        <main className="space-y-12 md:space-y-16">
          {/* Timer Display */}
          <section className="min-h-[300px] md:min-h-[400px] flex items-center justify-center">
            <Timer deadline={deadline} />
          </section>

          {/* Deadline Input */}
          <section className="max-w-2xl mx-auto">
            <DeadlineInput onSetDeadline={setDeadline} currentDeadline={deadline} />
          </section>
        </main>

        <footer className="mt-16 md:mt-20 text-center text-sm text-muted-foreground space-y-2">
          <div className="flex items-center justify-center gap-2">
            <Github className="h-4 w-4" />
            <span className="font-display">Built with Lovable</span>
          </div>
          <p className="text-xs">
            Real-time countdown · Automatic color transitions · Responsive design
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
