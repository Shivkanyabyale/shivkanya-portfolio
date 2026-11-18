'use client';

import * as React from 'react';
import { Briefcase, Plus, Edit2, Trash2, Save, X } from 'lucide-react';
import { ExperienceItem } from '@/lib/types/portfolio';
import { fallbackExperience } from '@/lib/data/fallback-data';
import { createClient } from '@/lib/supabase/client';

export function ExperienceManager() {
  const [items, setItems] = React.useState<ExperienceItem[]>(fallbackExperience);
  const [editingItem, setEditingItem] = React.useState<ExperienceItem | null>(null);

  const handleDelete = async (id: string) => {
    if (!window.confirm('Delete this experience entry?')) return;
    setItems(items.filter((i) => i.id !== id));
    const supabase = createClient();
    if (supabase) {
      await supabase.from('experience').delete().eq('id', id);
    }
  };

  const handleSave = async (entry: ExperienceItem) => {
    const isNew = !items.some((i) => i.id === entry.id);
    const next = isNew ? [...items, entry] : items.map((i) => (i.id === entry.id ? entry : i));
    setItems(next);

    const supabase = createClient();
    if (supabase) {
      const payload = {
        id: entry.id,
        role: entry.role,
        company: entry.company,
        location: entry.location,
        start_year: entry.startYear,
        end_year: entry.endYear,
        is_current: entry.isCurrent,
        description: entry.description,
        highlights: entry.highlights,
        sort_order: entry.sortOrder,
        updated_at: new Date().toISOString(),
      };
      if (isNew) {
        await supabase.from('experience').insert([payload]);
      } else {
        await supabase.from('experience').update(payload).eq('id', entry.id);
      }
    }
    setEditingItem(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-heading text-xl font-bold text-white">Experience Timeline Manager</h2>
          <p className="text-xs text-slate-400">Manage career milestones (strictly years only, no months).</p>
        </div>
        <button
          type="button"
          onClick={() =>
            setEditingItem({
              id: 'exp-' + Date.now(),
              role: '',
              company: '',
              location: 'Pune',
              startYear: '2026',
              endYear: 'Present',
              isCurrent: true,
              description: '',
              highlights: [''],
              sortOrder: items.length + 1,
            })
          }
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold bg-brand-600 text-white hover:bg-brand-700"
        >
          <Plus className="w-4 h-4" /> Add Experience Entry
        </button>
      </div>

      <div className="space-y-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="p-5 rounded-xl border border-slate-800 bg-slate-900/80 flex items-start justify-between gap-4"
          >
            <div>
              <div className="flex items-baseline gap-2">
                <h3 className="font-heading font-bold text-sm text-white">{item.role}</h3>
                <span className="text-xs text-brand-400 font-semibold">{item.company}</span>
                <span className="text-xs text-slate-500 font-mono">
                  ({item.startYear} – {item.endYear})
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1">{item.description}</p>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setEditingItem(item)}
                className="p-1 rounded bg-slate-800 text-slate-300 hover:text-white"
              >
                <Edit2 className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => handleDelete(item.id)}
                className="p-1 rounded bg-slate-800 text-slate-300 hover:text-red-400"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {editingItem && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 overflow-y-auto">
          <div className="w-full max-w-lg my-8 rounded-2xl border border-slate-700 bg-slate-900 p-6 space-y-4 text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="font-heading font-bold text-sm text-white">Edit Experience Entry</h3>
              <button onClick={() => setEditingItem(null)} className="text-slate-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Role *</label>
                <input
                  type="text"
                  value={editingItem.role}
                  onChange={(e) => setEditingItem({ ...editingItem, role: e.target.value })}
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-700 bg-slate-800 text-white"
                />
              </div>
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Company *</label>
                <input
                  type="text"
                  value={editingItem.company}
                  onChange={(e) => setEditingItem({ ...editingItem, company: e.target.value })}
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-700 bg-slate-800 text-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Start Year</label>
                <input
                  type="text"
                  value={editingItem.startYear}
                  onChange={(e) => setEditingItem({ ...editingItem, startYear: e.target.value })}
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-700 bg-slate-800 text-white"
                />
              </div>
              <div>
                <label className="block text-slate-300 font-semibold mb-1">End Year</label>
                <input
                  type="text"
                  value={editingItem.endYear}
                  onChange={(e) => setEditingItem({ ...editingItem, endYear: e.target.value })}
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-700 bg-slate-800 text-white"
                />
              </div>
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Location</label>
                <input
                  type="text"
                  value={editingItem.location}
                  onChange={(e) => setEditingItem({ ...editingItem, location: e.target.value })}
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-700 bg-slate-800 text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Description</label>
              <textarea
                rows={2}
                value={editingItem.description}
                onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })}
                className="w-full px-3 py-1.5 rounded-lg border border-slate-700 bg-slate-800 text-white"
              />
            </div>

            <div className="pt-3 border-t border-slate-800 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setEditingItem(null)}
                className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => handleSave(editingItem)}
                className="px-4 py-1.5 rounded-lg bg-brand-600 text-white font-semibold"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
