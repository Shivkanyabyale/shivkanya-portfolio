'use client';

import * as React from 'react';
import Link from 'next/link';
import {
  FolderKanban,
  ArrowRight,
  Sparkles,
  ExternalLink,
  Layers,
  Filter,
  BarChart,
  Eye,
} from 'lucide-react';
import { Project } from '@/lib/types/portfolio';

interface ProjectsSectionProps {
  projects: Project[];
  activeSkillFilter?: string | null;
  onClearSkillFilter?: () => void;
}

export function ProjectsSection({
  projects,
  activeSkillFilter = null,
  onClearSkillFilter,
}: ProjectsSectionProps) {
  const [selectedDomain, setSelectedDomain] = React.useState<string>('All');
  const [selectedTech, setSelectedTech] = React.useState<string>('All');

  // Sync external skill filter if passed
  React.useEffect(() => {
    if (activeSkillFilter) {
      setSelectedTech(activeSkillFilter);
    }
  }, [activeSkillFilter]);

  // Extract unique domains
  const domains = ['All', ...Array.from(new Set(projects.map((p) => p.domain)))];

  // Key tech filters
  const techFilters = ['All', 'Power BI', 'DAX', 'Power Automate', 'Python', 'Microsoft Fabric', 'APIs'];

  // Helper to extract tech stack flat list
  const getTechList = (project: Project): string[] => {
    if (Array.isArray(project.techStack)) {
      return project.techStack;
    }
    if (typeof project.techStack === 'object' && project.techStack !== null) {
      if (Array.isArray(project.techStack.all) && project.techStack.all.length > 0) {
        return project.techStack.all;
      }
      return [
        ...(project.techStack.bi || []),
        ...(project.techStack.data || []),
        ...(project.techStack.automation || []),
        ...(project.techStack.tools || []),
      ];
    }
    return [];
  };

  // Filter projects
  const filteredProjects = projects.filter((project) => {
    // 1. Domain match
    if (selectedDomain !== 'All' && project.domain !== selectedDomain) {
      return false;
    }

    // 2. Tech match
    if (selectedTech !== 'All') {
      const techList = getTechList(project).map((t) => t.toLowerCase());
      const query = selectedTech.toLowerCase();
      const hasMatch = techList.some(
        (t) => t.includes(query) || query.includes(t)
      );
      if (!hasMatch) return false;
    }

    return true;
  });

  return (
    <section id="projects" className="py-20 md:py-28 relative border-t border-slate-200/80 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-950/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-brand-50 dark:bg-brand-950/40 text-brand-700 dark:text-brand-300 border border-brand-200 dark:border-brand-800/80">
              <FolderKanban className="w-3.5 h-3.5 text-brand-500" />
              <span>Verified Case Studies</span>
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
              Featured Analytics & Automation Work
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl">
              Anonymized enterprise architectures, financial consolidation models, and automated bots built on verified client problem statements.
            </p>
          </div>

          {(selectedDomain !== 'All' || selectedTech !== 'All') && (
            <button
              type="button"
              onClick={() => {
                setSelectedDomain('All');
                setSelectedTech('All');
                if (onClearSkillFilter) onClearSkillFilter();
              }}
              className="text-xs font-semibold text-brand-600 dark:text-brand-400 hover:underline flex items-center gap-1 self-start md:self-auto"
            >
              <span>Reset Filters</span>
            </button>
          )}
        </div>

        {/* Filter Controls: Domain & Tech */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-8 mb-8 border-b border-slate-200 dark:border-slate-800/80">
          {/* Domain Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 sm:pb-0 scrollbar-none">
            <span className="text-xs font-semibold text-slate-400 dark:text-slate-500 mr-1 hidden lg:inline">
              Domain:
            </span>
            {domains.map((domain) => (
              <button
                key={domain}
                type="button"
                onClick={() => setSelectedDomain(domain)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 ${
                  selectedDomain === domain
                    ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-xs'
                    : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200/80 dark:border-slate-800'
                }`}
              >
                {domain}
              </button>
            ))}
          </div>

          {/* Quick Tech Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 sm:pb-0 scrollbar-none">
            <span className="text-xs font-semibold text-slate-400 dark:text-slate-500 mr-1 hidden lg:inline">
              Tech:
            </span>
            {techFilters.map((tech) => (
              <button
                key={tech}
                type="button"
                onClick={() => {
                  setSelectedTech(tech);
                  if (tech === 'All' && onClearSkillFilter) onClearSkillFilter();
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 ${
                  selectedTech === tech
                    ? 'bg-brand-600 text-white shadow-xs'
                    : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200/80 dark:border-slate-800'
                }`}
              >
                {tech}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        {filteredProjects.length === 0 ? (
          <div className="text-center py-16 px-4 rounded-2xl border border-dashed border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/40">
            <Filter className="w-8 h-8 text-slate-400 mx-auto mb-3" />
            <h3 className="font-heading font-semibold text-slate-800 dark:text-slate-200 text-base">
              No matching projects found
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              Try choosing another domain or clearing the active technology filter.
            </p>
            <button
              type="button"
              onClick={() => {
                setSelectedDomain('All');
                setSelectedTech('All');
                if (onClearSkillFilter) onClearSkillFilter();
              }}
              className="mt-4 px-4 py-2 rounded-lg text-xs font-semibold bg-brand-600 text-white hover:bg-brand-700 transition-colors"
            >
              Show All Projects
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredProjects.map((project) => {
              const techList = getTechList(project);

              return (
                <div
                  key={project.id}
                  className="rounded-2xl border border-slate-200 dark:border-slate-800/90 bg-white dark:bg-slate-900/70 shadow-xs hover:border-brand-500/50 hover:shadow-lg transition-all group flex flex-col justify-between overflow-hidden"
                >
                  <div>
                    {/* Cover Frame / Anonymized Screenshot Placeholder */}
                    <Link
                      href={`/projects/${project.slug}`}
                      className="block relative aspect-video bg-gradient-to-br from-slate-100 via-slate-50 to-slate-200 dark:from-slate-800/80 dark:via-slate-900 dark:to-[#070b14] border-b border-slate-200 dark:border-slate-800 overflow-hidden group-hover:opacity-95 transition-opacity"
                    >
                      {/* Subtle Data-Grid Canvas */}
                      <div className="absolute inset-0 data-grid-bg opacity-40" />

                      {/* Featured Badge */}
                      {project.isFeatured && (
                        <div className="absolute top-3 left-3 z-10 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-semibold bg-brand-600 text-white shadow-xs">
                          <Sparkles className="w-3 h-3" />
                          <span>Featured</span>
                        </div>
                      )}

                      {/* Status Badge (if draft) */}
                      {project.status === 'draft' && (
                        <div className="absolute top-3 right-3 z-10 px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-amber-500/20 text-amber-700 dark:text-amber-300 border border-amber-500/30">
                          Draft Preview
                        </div>
                      )}

                      {/* Mock Dashboard Illustration / Anonymized Placeholder Frame */}
                      <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                        <div className="w-12 h-12 rounded-xl bg-white/80 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 shadow-xs flex items-center justify-center text-brand-600 dark:text-brand-400 mb-2.5 group-hover:scale-110 transition-transform">
                          <BarChart className="w-6 h-6" />
                        </div>
                        <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 tracking-tight">
                          Dashboard screenshot (anonymised)
                        </span>
                        <span className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 max-w-[220px] truncate">
                          Enterprise Data Architecture
                        </span>
                      </div>
                    </Link>

                    {/* Card Content */}
                    <div className="p-6">
                      {/* Domain Tag */}
                      <div className="inline-block px-2.5 py-0.5 rounded text-[11px] font-semibold uppercase tracking-wider bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 mb-3">
                        {project.domain}
                      </div>

                      {/* Project Title */}
                      <h3 className="font-heading text-lg font-bold text-slate-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors leading-snug">
                        <Link href={`/projects/${project.slug}`}>
                          {project.title}
                        </Link>
                      </h3>

                      {/* Summary */}
                      <p className="mt-2.5 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-3">
                        {project.summary}
                      </p>

                      {/* Tech Stack Chips */}
                      <div className="mt-4 flex flex-wrap gap-1.5">
                        {techList.slice(0, 5).map((tech, i) => (
                          <span
                            key={i}
                            className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium bg-slate-100 dark:bg-slate-800/60 text-slate-600 dark:text-slate-400 border border-slate-200/50 dark:border-slate-700/50"
                          >
                            {tech}
                          </span>
                        ))}
                        {techList.length > 5 && (
                          <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[11px] font-medium text-slate-400 dark:text-slate-500">
                            +{techList.length - 5}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Card Footer: View Details CTA */}
                  <div className="px-6 py-4 border-t border-slate-100 dark:border-slate-800/70 bg-slate-50/50 dark:bg-slate-900/30 flex items-center justify-between">
                    <span className="text-xs font-semibold text-brand-600 dark:text-brand-400 group-hover:underline">
                      Explore Case Study
                    </span>
                    <ArrowRight className="w-4 h-4 text-brand-600 dark:text-brand-400 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
