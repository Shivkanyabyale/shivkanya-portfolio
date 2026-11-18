import { Layers, Database, Sparkles, CheckCircle2 } from 'lucide-react';
import { Profile } from '@/lib/types/portfolio';

interface AboutSectionProps {
  profile: Profile;
}

export function AboutSection({ profile }: AboutSectionProps) {
  const domains = [
    'Finance & Accounting',
    'Procurement & Spend',
    'B2B Supply Chain & Logistics',
    'Transportation',
    'Manufacturing',
    'Banking',
    'Multi-Marketplace Reconciliation',
  ];

  return (
    <section id="about" className="py-20 md:py-28 relative border-t border-slate-200/80 dark:border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Section Header & Left Column */}
          <div className="lg:col-span-5 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-brand-50 dark:bg-brand-950/40 text-brand-700 dark:text-brand-300 border border-brand-200 dark:border-brand-800/80">
              <Sparkles className="w-3.5 h-3.5 text-brand-500" />
              <span>Background & Philosophy</span>
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
              Bridging business realities and analytics architecture.
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
              Every dashboard or automation begins by understanding the operational problem first. Technology is simply the catalyst to deliver reliable numbers and streamlined decisions.
            </p>

            {/* Core Domain Exposure Chips */}
            <div className="pt-4">
              <h4 className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-3">
                Cross-Domain Exposure
              </h4>
              <div className="flex flex-wrap gap-2">
                {domains.map((domain) => (
                  <span
                    key={domain}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border border-slate-200/60 dark:border-slate-700/60"
                  >
                    <CheckCircle2 className="w-3 h-3 text-brand-500" />
                    <span>{domain}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Two Concise Paragraphs + Spotlight Callout */}
          <div className="lg:col-span-7 space-y-6">
            <div className="p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 shadow-xs space-y-5">
              <p className="text-base sm:text-lg text-slate-700 dark:text-slate-200 leading-relaxed font-normal">
                {profile.aboutP1 ||
                  'About 3 years of experience across finance, procurement, sales, B2B supply chain, logistics, transportation, manufacturing, banking and reconciliation.'}
              </p>

              <p className="text-base sm:text-lg text-slate-700 dark:text-slate-200 leading-relaxed font-normal">
                {profile.aboutP2 ||
                  'Started as a Business Analyst and Power BI Developer, now a Consultant building Power BI solutions plus Power Platform solutions (Power Automate cloud and Desktop, Power Apps, Copilot Studio) and RPA with Python. Data modeling is my favourite part of the work.'}
              </p>
            </div>

            {/* Callout: Why Data Modeling Matters */}
            <div className="p-5 rounded-xl border border-brand-200/60 dark:border-brand-900/40 bg-brand-50/40 dark:bg-brand-950/20 flex items-start gap-3.5">
              <div className="p-2 rounded-lg bg-brand-100 dark:bg-brand-900/50 text-brand-600 dark:text-brand-400 shrink-0 mt-0.5">
                <Database className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
                  Why Data Modeling is My Anchor
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  Clean Star schemas, normalized dimensions, and calculated DAX measures form the foundation of high-performance analytics. When the model is architected properly, reports load fast, metrics never disagree, and automation runs reliably.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
