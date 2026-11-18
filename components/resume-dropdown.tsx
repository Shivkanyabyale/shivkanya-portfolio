'use client';

import * as React from 'react';
import { Download, FileText, ChevronDown, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { ResumeFile } from '@/lib/types/portfolio';

interface ResumeDropdownProps {
  resumeFiles?: ResumeFile[];
  buttonVariant?: 'primary' | 'secondary' | 'outline';
  className?: string;
}

export function ResumeDropdown({
  resumeFiles = [],
  buttonVariant = 'outline',
  className = '',
}: ResumeDropdownProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  // Close on outside click
  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const defaultFiles: ResumeFile[] = [
    { id: '1', title: 'Power BI Specialist Resume', label: 'Power BI Focus', fileUrl: '/resume.pdf', isPrimary: true, sortOrder: 1 },
    { id: '2', title: 'Power Platform & RPA Resume', label: 'Power Platform Focus', fileUrl: '/resume.pdf', isPrimary: false, sortOrder: 2 },
    { id: '3', title: 'Business Analyst & Consulting Resume', label: 'Business Analyst Focus', fileUrl: '/resume.pdf', isPrimary: false, sortOrder: 3 },
    { id: '4', title: 'Complete Comprehensive CV', label: 'Complete CV', fileUrl: '/resume.pdf', isPrimary: false, sortOrder: 4 },
  ];

  const files = resumeFiles.length > 0 ? resumeFiles : defaultFiles;

  const buttonClasses =
    buttonVariant === 'primary'
      ? 'bg-brand-600 hover:bg-brand-700 text-white shadow-sm'
      : 'border border-slate-300 dark:border-slate-700 bg-white/80 dark:bg-slate-900/80 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200';

  return (
    <div className={`relative inline-block text-left ${className}`} ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="true"
        className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 ${buttonClasses}`}
      >
        <Download className="w-4 h-4 text-brand-500" />
        <span>Download Resume</span>
        <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 sm:left-0 sm:right-auto mt-2 w-64 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xl z-50 py-1.5 focus:outline-none animate-in fade-in slide-in-from-top-2 duration-150">
          <div className="px-3 py-1.5 border-b border-slate-100 dark:border-slate-800/80 text-[11px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
            Choose Resume Version
          </div>

          <div className="py-1">
            {files.map((file) => (
              <a
                key={file.id}
                href={file.fileUrl}
                download
                onClick={() => setIsOpen(false)}
                className="group flex items-center justify-between px-3.5 py-2 text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-brand-50 dark:hover:bg-brand-950/40 hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
              >
                <div className="flex items-center gap-2.5 truncate">
                  <FileText className="w-4 h-4 text-slate-400 group-hover:text-brand-500 shrink-0" />
                  <span className="truncate">{file.label}</span>
                </div>
                <Download className="w-3.5 h-3.5 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity shrink-0 ml-2" />
              </a>
            ))}
          </div>

          <div className="pt-1 mt-1 border-t border-slate-100 dark:border-slate-800/80 px-2 pb-1">
            <Link
              href="/resume"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-between px-2.5 py-1.5 rounded-md text-xs font-medium text-brand-600 dark:text-brand-400 hover:bg-brand-50 dark:hover:bg-brand-950/40 transition-colors"
            >
              <span>View Web Resume (Printable)</span>
              <ExternalLink className="w-3 h-3" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
