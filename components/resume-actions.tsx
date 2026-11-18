'use client';

import * as React from 'react';
import { Printer, Download } from 'lucide-react';

export function ResumeActions() {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={handlePrint}
        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors shadow-xs"
      >
        <Printer className="w-3.5 h-3.5 text-brand-500" />
        <span>Print / Save as PDF</span>
      </button>

      <a
        href="/resume.pdf"
        download
        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-brand-600 text-white hover:bg-brand-700 transition-colors shadow-xs"
      >
        <Download className="w-3.5 h-3.5" />
        <span>Download PDF</span>
      </a>
    </div>
  );
}
