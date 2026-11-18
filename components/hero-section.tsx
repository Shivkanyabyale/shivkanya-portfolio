import Link from 'next/link';
import { ArrowRight, Linkedin, Award, Sparkles, TrendingUp, ShieldCheck } from 'lucide-react';
import { ResumeDropdown } from './resume-dropdown';
import { Profile, KeyMetric, ResumeFile } from '@/lib/types/portfolio';

interface HeroSectionProps {
  profile: Profile;
  keyMetrics: KeyMetric[];
  resumeFiles?: ResumeFile[];
}

export function HeroSection({ profile, keyMetrics, resumeFiles = [] }: HeroSectionProps) {
  // Ensure we display strictly the verified numbers
  const metrics =
    keyMetrics.length > 0
      ? keyMetrics
      : [
          { id: '1', value: '3+', label: 'Years Experience', sortOrder: 1 },
          { id: '2', value: '5+', label: 'Entities Consolidated in One Finance Solution', sortOrder: 2 },
          { id: '3', value: '10+', label: 'Finance Reports Unified', sortOrder: 3 },
          { id: '4', value: 'DP-600', label: 'Microsoft Fabric Certified', sortOrder: 4 },
        ];

  return (
    <section className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden">
      {/* Subtle Data-Grid Background Accent */}
      <div className="absolute inset-0 data-grid-bg pointer-events-none" />

      {/* Subtle Ambient Light Glows */}
      <div className="ambient-glow -top-32 -left-32 w-96 h-96 bg-brand-500/10 dark:bg-brand-500/15" />
      <div className="ambient-glow top-48 -right-32 w-96 h-96 bg-sky-500/10 dark:bg-sky-500/10" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl">
          {/* Microsoft DP-600 Certification Badge */}
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-brand-50/90 dark:bg-brand-950/50 text-brand-700 dark:text-brand-300 border border-brand-200/80 dark:border-brand-800/80 mb-6 shadow-sm backdrop-blur-sm">
            <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <Award className="w-4 h-4 text-brand-500" />
            <span>Microsoft Certified: Fabric Analytics Engineer Associate (DP-600)</span>
          </div>

          {/* Candidate Name */}
          <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.12]">
            {profile.fullName || 'Shivkanya Byale'}
          </h1>

          {/* Professional Headline */}
          <p className="mt-4 text-xl sm:text-2xl md:text-2xl font-semibold bg-gradient-to-r from-brand-600 via-sky-600 to-slate-800 dark:from-brand-400 dark:via-sky-300 dark:to-slate-200 bg-clip-text text-transparent">
            {profile.headline || 'Power BI Developer | Power Platform Developer | Microsoft Fabric Consultant'}
          </p>

          {/* One-line Value Statement */}
          <p className="mt-4 text-base sm:text-lg md:text-xl text-slate-600 dark:text-slate-300 font-normal leading-relaxed max-w-3xl">
            {profile.valueStatement ||
              'I turn complex business data into dashboards, automation and decisions leaders can act on.'}
          </p>

          {/* Action Buttons: View Projects, Download Resume menu, LinkedIn */}
          <div className="mt-8 flex flex-wrap items-center gap-3.5">
            <Link
              href="#projects"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-semibold bg-brand-600 hover:bg-brand-700 text-white shadow-sm hover:shadow transition-all group focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
            >
              <span>View Projects</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>

            <ResumeDropdown resumeFiles={resumeFiles} buttonVariant="outline" />

            <a
              href={profile.linkedinUrl || 'https://www.linkedin.com/in/shivkanya-byale/'}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium border border-slate-300 dark:border-slate-700 bg-white/80 dark:bg-slate-900/80 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
              aria-label="Connect on LinkedIn"
            >
              <Linkedin className="w-4 h-4 text-[#0077b5]" />
              <span>LinkedIn</span>
            </a>
          </div>

          {/* Currently Learning / Building Strip */}
          <div className="mt-8 inline-flex items-center gap-2 text-xs font-medium text-slate-600 dark:text-slate-400 bg-slate-100/80 dark:bg-slate-800/60 px-3.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800">
            <Sparkles className="w-3.5 h-3.5 text-brand-500 shrink-0" />
            <span>
              <span className="font-semibold text-slate-700 dark:text-slate-200">Currently learning / building:</span>{' '}
              {profile.currentlyLearning || '[PLACEHOLDER: Microsoft Fabric & Copilot Studio]'}
            </span>
          </div>
        </div>

        {/* Key Numbers Strip (Strictly 4 verified facts) */}
        <div className="mt-14 pt-8 border-t border-slate-200 dark:border-slate-800/80">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {metrics.slice(0, 4).map((metric) => (
              <div
                key={metric.id}
                className="relative p-4 sm:p-5 rounded-xl border border-slate-200/90 dark:border-slate-800/90 bg-white/70 dark:bg-slate-900/50 backdrop-blur-sm shadow-xs group hover:border-brand-500/50 transition-colors"
              >
                <div className="flex items-baseline gap-1">
                  <span className="font-heading text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white group-hover:text-brand-500 dark:group-hover:text-brand-400 transition-colors">
                    {metric.value}
                  </span>
                </div>
                <p className="mt-1.5 text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-medium leading-snug">
                  {metric.label}
                </p>
                <div className="absolute top-2 right-2 opacity-10 group-hover:opacity-30 transition-opacity">
                  <TrendingUp className="w-4 h-4 text-brand-500" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
