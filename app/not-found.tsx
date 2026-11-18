import Link from 'next/link';
import { Home, ArrowLeft, Search } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 relative">
      <div className="absolute inset-0 data-grid-bg opacity-30 pointer-events-none" />

      <div className="max-w-md w-full text-center space-y-6 relative">
        <div className="w-16 h-16 rounded-2xl bg-brand-50 dark:bg-brand-950/50 border border-brand-200 dark:border-brand-800 flex items-center justify-center text-brand-600 dark:text-brand-400 mx-auto shadow-xs">
          <Search className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <span className="font-mono text-sm font-bold text-brand-600 dark:text-brand-400 uppercase tracking-widest">
            Error 404
          </span>
          <h1 className="font-heading text-3xl font-extrabold text-slate-900 dark:text-white">
            Page Not Found
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            The dashboard, case study, or resource you are looking for has been moved or does not exist.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold bg-brand-600 hover:bg-brand-700 text-white shadow-sm transition-colors"
          >
            <Home className="w-4 h-4" />
            <span>Return to Portfolio</span>
          </Link>
          <Link
            href="/#projects"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
          >
            <span>Browse Case Studies</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
