'use client';

import * as React from 'react';
import { Cpu, Filter, Sparkles, Layers } from 'lucide-react';
import { SkillGroup } from '@/lib/types/portfolio';

interface SkillsSectionProps {
  skillGroups: SkillGroup[];
  selectedSkill?: string | null;
  onSkillSelect?: (skillName: string) => void;
}

export function SkillsSection({
  skillGroups,
  selectedSkill = null,
  onSkillSelect,
}: SkillsSectionProps) {
  const handleChipClick = (skillName: string) => {
    if (onSkillSelect) {
      onSkillSelect(skillName);
    }
    // Also scroll down to projects section
    const projectsElem = document.getElementById('projects');
    if (projectsElem) {
      projectsElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="skills" className="py-20 md:py-28 relative border-t border-slate-200/80 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-950/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-brand-50 dark:bg-brand-950/40 text-brand-700 dark:text-brand-300 border border-brand-200 dark:border-brand-800/80">
            <Cpu className="w-3.5 h-3.5 text-brand-500" />
            <span>Technical Capabilities</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
            Skills & Enterprise Toolset
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
            Click any skill chip below to filter and inspect the real-world projects that implemented it.
          </p>
        </div>

        {/* Grouped Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillGroups.map((group) => (
            <div
              key={group.id}
              className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800/90 bg-white dark:bg-slate-900/60 shadow-xs hover:border-slate-300 dark:hover:border-slate-700 transition-all flex flex-col"
            >
              <div className="flex items-center gap-2.5 pb-4 mb-4 border-b border-slate-100 dark:border-slate-800/80">
                <div className="w-2 h-2 rounded-full bg-brand-500" />
                <h3 className="font-heading text-sm font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200">
                  {group.name}
                </h3>
              </div>

              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill) => {
                  const isSelected = selectedSkill === (skill.filterKey || skill.name);
                  return (
                    <button
                      key={skill.id}
                      type="button"
                      onClick={() => handleChipClick(skill.filterKey || skill.name)}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 cursor-pointer ${
                        isSelected
                          ? 'bg-brand-600 text-white shadow-sm ring-2 ring-brand-500/50 scale-105'
                          : 'bg-slate-100/80 dark:bg-slate-800/70 text-slate-700 dark:text-slate-300 hover:bg-brand-50 dark:hover:bg-brand-950/60 hover:text-brand-600 dark:hover:text-brand-400 border border-slate-200/50 dark:border-slate-700/50'
                      }`}
                      title={`Filter projects using ${skill.name}`}
                    >
                      <span>{skill.name}</span>
                      <Filter className="w-2.5 h-2.5 opacity-40 hover:opacity-100" />
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
