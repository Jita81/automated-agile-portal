import { useState, useEffect, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { SlidersHorizontal, Minus } from 'lucide-react';
import logo from '@/assets/logo.png';

const navItems = [
  { label: 'The Model', href: '#model' },
  { label: 'Decisions', href: '#decisions' },
  { label: 'Meetings', href: '#meetings' },
  { label: 'Self-Curation', href: '#self-curation' },
  { label: 'Integrations', href: '#integrations' },
];

export const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNav = useCallback((e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileOpen(false);
    const el = document.getElementById(href.replace('#', ''));
    if (el) setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }), 80);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-background/95 backdrop-blur-sm border-b border-border' : ''}`}>
      <div className="max-w-6xl mx-auto px-6 lg:px-10">
        <div className="flex items-center justify-between h-16">
          <a href="#" className="flex items-center gap-3 group">
            <img src={logo} alt="Automated Agile" className="h-7 w-auto opacity-80 group-hover:opacity-100 transition-opacity" />
            <span className="font-mono text-xs tracking-widest uppercase text-foreground/80">Automated Agile</span>
          </a>

          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <a key={item.label} href={item.href} className="nav-link" onClick={(e) => handleNav(e, item.href)}>
                {item.label}
              </a>
            ))}
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
            <nav className="max-w-6xl mx-auto px-6 py-6 flex flex-col gap-5">
              {navItems.map((item) => (
                <a key={item.label} href={item.href} className="nav-link text-base" onClick={(e) => handleNav(e, item.href)}>
                  {item.label}
                </a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
