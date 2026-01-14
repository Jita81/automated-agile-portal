import { Linkedin, Twitter, Github } from 'lucide-react';

const footerLinks = {
  Product: ['Platform', 'Integrations', 'Pricing', 'Changelog'],
  Company: ['About', 'Careers', 'Blog', 'Press'],
  Resources: ['Documentation', 'API Reference', 'Case Studies', 'Webinars'],
  Legal: ['Privacy', 'Terms', 'Security', 'Cookies'],
};

export const Footer = () => {
  return (
    <footer className="py-16 border-t border-border">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 lg:gap-12 mb-16">
          {/* Brand */}
          <div className="col-span-2 md:col-span-4 lg:col-span-1">
            <span className="text-xl font-semibold tracking-tight block mb-4">
              AUTOMATED AGILE
            </span>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6 max-w-xs">
              Accelerating enterprise agility with AI-powered automation.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Github size={20} />
              </a>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="font-mono text-xs uppercase tracking-wider text-muted-foreground mb-4">
                {category}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-foreground/80 hover:text-primary transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-muted-foreground text-sm">
            © 2024 Automated Agile. All rights reserved.
          </p>
          <p className="font-mono text-xs text-muted-foreground">
            San Francisco · New York · London
          </p>
        </div>
      </div>
    </footer>
  );
};
