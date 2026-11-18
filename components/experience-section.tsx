import { Briefcase, Calendar, MapPin, Award } from 'lucide-react';
import { ExperienceItem } from '@/lib/types/portfolio';

interface ExperienceSectionProps {
  experience: ExperienceItem[];
}

export function ExperienceSection({ experience }: ExperienceSectionProps) {
  const sortedExperience = [...experience].sort((a, b) => a.sortOrder - b.sortOrder);

  return (
    <section id="experience" className="py-20 md:py-28 relative border-t border-slate-200/80 dark:border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-brand-50 dark:bg-brand-950/40 text-brand-700 dark:text-brand-300 border border-brand-200 dark:border-brand-800/80">
            <Briefcase className="w-3.5 h-3.5 text-brand-500" />
            <span>Career Milestones</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
            Professional Experience
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
            A progressive journey across business analysis, end-to-end Power BI leadership, and enterprise automation consulting.
          </p>
        </div>

        {/* Vertical Timeline with Clean Connecting Lines */}
        <div className="relative border-l-2 border-slate-200 dark:border-slate-800 ml-3 sm:ml-4 space-y-12">
          {sortedExperience.map((item) => (
            <div key={item.id} className="relative pl-7 sm:pl-9 group">
              {/* Timeline Indicator Dot */}
              <div
                className={`absolute -left-[9px] top-1.5 w-4 h-4 rounded-full border-2 bg-white dark:bg-slate-900 transition-colors ${
                  item.isCurrent
                    ? 'border-brand-500 ring-4 ring-brand-500/20'
                    : 'border-slate-400 dark:border-slate-600 group-hover:border-brand-500'
                }`}
              />

              <div className="p-6 sm:p-7 rounded-2xl border border-slate-200 dark:border-slate-800/90 bg-white dark:bg-slate-900/60 shadow-xs hover:border-brand-500/40 transition-all">
                {/* Header: Role, Company, Years & Location */}
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 pb-3 mb-4 border-b border-slate-100 dark:border-slate-800/70">
                  <div>
                    <h3 className="font-heading text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                      {item.role}
                    </h3>
                    <div className="flex flex-wrap items-center gap-2 mt-1 text-sm font-semibold text-brand-600 dark:text-brand-400">
                      <span>{item.company}</span>
                      {item.location && (
                        <>
                          <span className="text-slate-300 dark:text-slate-700">•</span>
                          <span className="flex items-center gap-1 text-slate-500 dark:text-slate-400 font-normal text-xs">
                            <MapPin className="w-3 h-3" />
                            {item.location}
                          </span>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Year Tag (Strictly years only, no months) */}
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 self-start sm:self-auto shrink-0">
                    <Calendar className="w-3 h-3 text-brand-500" />
                    <span>
                      {item.startYear} – {item.endYear}
                    </span>
                  </div>
                </div>

                {/* Role Description */}
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                  {item.description}
                </p>

                {/* Highlights / Responsibilities */}
                {item.highlights && item.highlights.length > 0 && (
                  <ul className="space-y-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                    {item.highlights.map((highlight, hIndex) => {
                      const isPlaceholder = highlight.includes('[PLACEHOLDER');
                      const isAppreciation = highlight.includes('Certificate of Appreciation');

                      return (
                        <li key={hIndex} className="flex items-start gap-2.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-brand-500 shrink-0 mt-2" />
                          <span className="leading-relaxed">
                            {isPlaceholder ? (
                              <span className="inline-block px-2 py-0.5 rounded bg-amber-500/10 text-amber-700 dark:text-amber-400 font-mono text-xs border border-amber-500/20">
                                {highlight}
                              </span>
                            ) : isAppreciation ? (
                              <span className="font-medium text-slate-800 dark:text-slate-100">
                                {highlight} 🏆
                              </span>
                            ) : (
                              highlight
                            )}
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
