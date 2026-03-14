import { Link, Download } from 'lucide-react';
import logo from '@/assets/logo.png';

interface FooterProps {
  onDownload?: () => void;
}

export const Footer = ({ onDownload }: FooterProps) => {
  return (
    <footer className="border-t border-border">
      <div className="max-w-6xl mx-auto px-6 lg:px-10 py-10">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <img src={logo} alt="Automated Agile" className="h-6 w-auto opacity-60" />
            <span className="font-mono text-xs tracking-widest uppercase text-muted-foreground">Automated Agile</span>
          </div>

          <p className="text-xs font-mono text-muted-foreground">
            Context Engineering Platform — Process Architecture v1.0
          </p>

          <div className="flex items-center gap-6">
            {onDownload && (
              <button
                onClick={onDownload}
                className="flex items-center gap-1.5 font-mono text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                <Download size={12} strokeWidth={1.5} />
                Download
              </button>
            )}
            <a
              href="https://www.linkedin.com/company/automatedagile/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Link size={14} strokeWidth={1.5} />
            </a>
            <span className="font-mono text-xs text-muted-foreground">© 2026</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
