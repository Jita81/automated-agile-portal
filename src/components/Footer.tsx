import { Linkedin } from 'lucide-react';
import logo from '@/assets/logo.png';

export const Footer = () => {
  return (
    <footer className="py-16 border-t border-border">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 mb-12">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <img src={logo} alt="Automated Agile" className="h-10 w-auto" />
            <span className="text-xl font-semibold tracking-tight">AutomatedAgile</span>
          </div>

          {/* Tagline */}
          <p className="text-muted-foreground text-sm max-w-md">
            30% Software Productivity Improvement—Guaranteed. A scalable, reliable approach 
            to AI-powered productivity.
          </p>

          {/* Social */}
          <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
            <Linkedin size={24} />
          </a>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-muted-foreground text-sm">
            © 2026 Automated Agile. All rights reserved.
          </p>
          <p className="font-mono text-xs text-muted-foreground">
            AI-Powered Agility
          </p>
        </div>
      </div>
    </footer>
  );
};
