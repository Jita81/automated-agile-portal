import { useState, useEffect, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { SlidersHorizontal, Minus, ArrowUpRight, Sparkles } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import logo from '@/assets/logo.png';

const navItems = [
  { label: 'The Model', href: '#model' },
  { label: 'Decisions', href: '#decisions' },
  { label: 'Meetings', href: '#meetings' },
  { label: 'Self-Curation', href: '#self-curation' },
  { label: 'Integrations', href: '#integrations' },
];

const externalLinks = [
  { label: 'Context Engineering', href: 'https://contextengineering.team/' },
  { label: 'Software Manufacturing', href: 'https://softwaremanufacturing.team/' },
];

export const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNav = useCallback((e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileOpen(false);
    if (location.pathname !== '/') {
      navigate('/' + href);
      return;
    }
    const el = document.getElementById(href.replace('#', ''));
    if (el) setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }), 80);
  }, [location.pathname, navigate]);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-background/95 backdrop-blur-sm border-b border-border' : ''}`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex items-center justify-between h-16 gap-8">
          <a href="/" onClick={(e) => { e.preventDefault(); navigate('/'); }} className="flex items-center gap-3 group shrink-0">
            <img src={logo} alt="Automated Agile" className="h-7 w-auto opacity-80 group-hover:opacity-100 transition-opacity" />
            <span className="font-mono text-xs tracking-widest uppercase text-foreground/80">Automated Agile</span>
          </a>

          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <a key={item.label} href={item.href} className="nav-link" onClick={(e) => handleNav(e, item.href)}>
                {item.label}
              </a>
            ))}

            {/* Vertical divider */}
            <span className="w-px h-4 bg-border" aria-hidden="true" />

            {/* External links with secondary pill style */}
            {externalLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 font-mono text-xs tracking-wide uppercase text-muted-foreground/60 hover:text-muted-foreground border border-border hover:border-foreground/20 px-3 py-1 transition-all duration-200"
              >
                {item.label}
                <ArrowUpRight size={10} strokeWidth={1.5} className="opacity-50" />
              </a>
            ))}

            {/* Athena CTA */}
            <span className="w-px h-4 bg-border" aria-hidden="true" />
            <a
              href="/athena"
              onClick={(e) => { e.preventDefault(); navigate('/athena'); }}
              className="inline-flex items-center gap-1.5 font-mono text-xs tracking-wide uppercase bg-foreground text-background px-3 py-1.5 hover:bg-foreground/90 transition-colors"
            >
              <Sparkles size={10} strokeWidth={1.5} />
              Meet Athena
            </a>
          </nav>

          <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden p-1 text-foreground/70 hover:text-foreground" aria-label="Toggle menu">
            {mobileOpen ? <Minus size={18} strokeWidth={1.5} /> : <SlidersHorizontal size={18} strokeWidth={1.5} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background border-b border-border"
          >
            <nav className="max-w-7xl mx-auto px-6 py-6 flex flex-col gap-5">
              {navItems.map((item) => (
                <a key={item.label} href={item.href} className="nav-link text-base" onClick={(e) => handleNav(e, item.href)}>
                  {item.label}
                </a>
              ))}
              <span className="h-px w-full bg-border" aria-hidden="true" />
              {externalLinks.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-mono text-xs tracking-wide uppercase text-muted-foreground/60 hover:text-muted-foreground transition-colors"
                >
                  {item.label}
                  <ArrowUpRight size={11} strokeWidth={1.5} className="opacity-50" />
                </a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
