'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { ThemeToggle } from './theme-toggle';
import { ResumeDropdown } from './resume-dropdown';
import { ResumeFile } from '@/lib/types/portfolio';

interface NavbarProps {
  resumeFiles?: ResumeFile[];
}

export function Navbar({ resumeFiles = [] }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const pathname = usePathname();

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'About', href: '/#about' },
    { label: 'Services', href: '/#services' },
    { label: 'Skills', href: '/#skills' },
    { label: 'Experience', href: '/#experience' },
    { label: 'Projects', href: '/#projects' },
    { label: 'Contact', href: '/#contact' },
  ];

  const isHome = pathname === '/';

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 no-print ${
        scrolled
          ? 'bg-white/85 dark:bg-[#070b14]/85 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800/80 shadow-sm'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand / Logo */}
        <Link
          href="/"
          className="flex items-center gap-2.5 group focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 rounded-lg p-1"
        >
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-brand-500 to-sky-700 flex items-center justify-center text-white font-bold text-sm tracking-wider shadow-sm group-hover:scale-105 transition-transform">
            SB
          </div>
          <div className="flex flex-col">
            <span className="font-heading font-semibold text-sm tracking-tight text-slate-900 dark:text-white group-hover:text-brand-500 dark:group-hover:text-brand-400 transition-colors">
              Shivkanya Byale
            </span>
            <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400 -mt-0.5">
              Power BI & Fabric Consultant
            </span>
          </div>
        </Link>

        {/* Desktop Nav Items (Max 6 items, < 7) */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          {navLinks.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="px-3 py-1.5 rounded-md text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-brand-600 dark:hover:text-brand-400 hover:bg-slate-100/70 dark:hover:bg-slate-800/60 transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Desktop Right Actions: Theme Toggle + Resume Download */}
        <div className="hidden sm:flex items-center gap-3">
          <ThemeToggle />
          <ResumeDropdown resumeFiles={resumeFiles} />
        </div>

        {/* Mobile Actions */}
        <div className="flex sm:hidden items-center gap-2">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="w-9 h-9 flex items-center justify-center rounded-lg border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/70 text-slate-600 dark:text-slate-300"
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="sm:hidden border-b border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-[#070b14]/95 backdrop-blur-lg px-4 pt-3 pb-6 animate-in slide-in-from-top-2 duration-200 shadow-xl">
          <nav className="flex flex-col space-y-1">
            {navLinks.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2.5 rounded-lg text-base font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-col gap-3">
            <ResumeDropdown resumeFiles={resumeFiles} className="w-full" />
            <Link
              href="/#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium bg-brand-600 hover:bg-brand-700 text-white transition-colors"
            >
              <span>Let's Talk</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
