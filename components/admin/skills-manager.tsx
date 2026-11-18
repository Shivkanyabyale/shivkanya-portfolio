'use client';

import * as React from 'react';
import { Cpu, Plus, Trash2, Save, X } from 'lucide-react';
import { SkillGroup, Skill } from '@/lib/types/portfolio';
import { fallbackSkillGroups } from '@/lib/data/fallback-data';
import { createClient } from '@/lib/supabase/client';

export function SkillsManager() {
  const [groups, setGroups] = React.useState<SkillGroup[]>(fallbackSkillGroups);
  const [activeGroupId, setActiveGroupId] = React.useState<string>(fallbackSkillGroups[0]?.id || '');
  const [newSkillName, setNewSkillName] = React.useState('');
  const [newFilterKey, setNewFilterKey] = React.useState('');

  const activeGroup = groups.find((g) => g.id === activeGroupId) || groups[0];

  const handleAddSkill = async () => {
    if (!newSkillName.trim() || !activeGroup) return;

    const newSkill: Skill = {
      id: 's-' + Date.now(),
      groupId: activeGroup.id,
      name: newSkillName.trim(),
      filterKey: newFilterKey.trim() || newSkillName.trim(),
      sortOrder: (activeGroup.skills?.length || 0) + 1,
    };

    const updatedGroups = groups.map((g) => {
      if (g.id === activeGroup.id) {
        return { ...g, skills: [...g.skills, newSkill] };
      }
      return g;
    });

    setGroups(updatedGroups);
    setNewSkillName('');
    setNewFilterKey('');

    const supabase = createClient();
    if (supabase) {
      await supabase.from('skills').insert([
        {
          id: newSkill.id,
          group_id: newSkill.groupId,
          name: newSkill.name,
          filter_key: newSkill.filterKey,
          sort_order: newSkill.sortOrder,
        },
      ]);
    }
  };

  const handleDeleteSkill = async (skillId: string) => {
    const updatedGroups = groups.map((g) => ({
      ...g,
      skills: g.skills.filter((s) => s.id !== skillId),
    }));
    setGroups(updatedGroups);

    const supabase = createClient();
    if (supabase) {
      await supabase.from('skills').delete().eq('id', skillId);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-heading text-xl font-bold text-white">Skills & Toolset Manager</h2>
        <p className="text-xs text-slate-400">
          Organize skills into groups. Each skill chip links to and filters projects.
        </p>
      </div>

      {/* Group selector tabs */}
      <div className="flex flex-wrap gap-2 pb-2 border-b border-slate-800">
        {groups.map((g) => (
          <button
            key={g.id}
            type="button"
            onClick={() => setActiveGroupId(g.id)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              activeGroup?.id === g.id
                ? 'bg-brand-600 text-white'
                : 'bg-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            {g.name} ({g.skills?.length || 0})
          </button>
        ))}
      </div>

      {/* Active Group Content */}
      {activeGroup && (
        <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/80 space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <h3 className="font-heading font-bold text-base text-white">
              Skills in "{activeGroup.name}"
            </h3>

            {/* Quick add form */}
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={newSkillName}
                onChange={(e) => setNewSkillName(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleAddSkill();
                }}
                placeholder="New skill (e.g. Fabric Lakehouse)"
                className="px-3 py-1.5 rounded-lg border border-slate-700 bg-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
              <button
                type="button"
                onClick={handleAddSkill}
                className="px-3 py-1.5 rounded-lg bg-brand-600 hover:bg-brand-700 text-xs font-semibold text-white flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" /> Add
              </button>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 pt-2">
            {activeGroup.skills.map((skill) => (
              <div
                key={skill.id}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800 text-slate-200 border border-slate-700"
              >
                <span>{skill.name}</span>
                <button
                  type="button"
                  onClick={() => handleDeleteSkill(skill.id)}
                  className="text-slate-500 hover:text-red-400 transition-colors"
                  title="Remove skill"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
