import { WorkStep } from '@/lib/types/portfolio';
import { ArrowRight, Compass } from 'lucide-react';

interface HowIWorkSectionProps {
  steps: WorkStep[];
}

export function HowIWorkSection({ steps }: HowIWorkSectionProps) {
  const sortedSteps = [...steps].sort((a, b) => a.sortOrder - b.sortOrder);

  return (
    <section className="py-20 md:py-24 relative border-t border-slate-200/80 dark:border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-brand-50 dark:bg-brand-950/40 text-brand-700 dark:text-brand-300 border border-brand-200 dark:border-brand-800/80">
            <Compass className="w-3.5 h-3.5 text-brand-500" />
            <span>Delivery Methodology</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
            How I Work
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
            A disciplined, 5-stage consulting delivery framework ensuring precision, security, and long-term user adoption.
          </p>
        </div>

        {/* 5-Step Horizontal Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 relative">
          {sortedSteps.map((step, index) => (
            <div
              key={step.id || index}
              className="relative p-5 rounded-xl border border-slate-200/90 dark:border-slate-800/90 bg-white dark:bg-slate-900/60 shadow-xs hover:border-brand-500/50 transition-all group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="w-7 h-7 rounded-full bg-brand-50 dark:bg-brand-950/80 text-brand-600 dark:text-brand-400 border border-brand-200/60 dark:border-brand-800/60 font-heading text-xs font-bold flex items-center justify-center">
                    0{step.stepNumber || index + 1}
                  </span>
                  {index < sortedSteps.length - 1 && (
                    <ArrowRight className="hidden lg:block w-4 h-4 text-slate-300 dark:text-slate-700 group-hover:text-brand-500 transition-colors" />
                  )}
                </div>
                <h3 className="font-heading text-sm font-bold text-slate-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                  {step.title}
                </h3>
                <p className="mt-2 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
