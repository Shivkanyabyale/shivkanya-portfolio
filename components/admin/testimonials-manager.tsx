'use client';

import * as React from 'react';
import { Quote, Plus, Edit2, Trash2, CheckCircle, Eye, EyeOff, Save, X } from 'lucide-react';
import { Testimonial } from '@/lib/types/portfolio';
import { fallbackTestimonials } from '@/lib/data/fallback-data';
import { createClient } from '@/lib/supabase/client';

export function TestimonialsManager() {
  const [items, setItems] = React.useState<Testimonial[]>(fallbackTestimonials);
  const [editingItem, setEditingItem] = React.useState<Testimonial | null>(null);

  React.useEffect(() => {
    async function loadData() {
      const supabase = createClient();
      if (supabase) {
        const { data, error } = await supabase.from('testimonials').select('*').order('sort_order');
        if (data && !error) {
          setItems(
            data.map((t) => ({
              id: t.id,
              clientName: t.client_name,
              clientRole: t.client_role,
              company: t.company,
              quote: t.quote,
              isPublished: t.is_published,
              sortOrder: t.sort_order,
            }))
          );
        }
      }
    }
    loadData();
  }, []);

  const handleTogglePublish = async (item: Testimonial) => {
    const nextVal = !item.isPublished;
    setItems(items.map((t) => (t.id === item.id ? { ...t, isPublished: nextVal } : t)));

    const supabase = createClient();
    if (supabase) {
      await supabase.from('testimonials').update({ is_published: nextVal }).eq('id', item.id);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Delete this testimonial?')) return;
    setItems(items.filter((t) => t.id !== id));
    const supabase = createClient();
    if (supabase) {
      await supabase.from('testimonials').delete().eq('id', id);
    }
  };

  const handleSave = async (entry: Testimonial) => {
    const isNew = !items.some((t) => t.id === entry.id);
    const next = isNew ? [...items, entry] : items.map((t) => (t.id === entry.id ? entry : t));
    setItems(next);

    const supabase = createClient();
    if (supabase) {
      const payload = {
        id: entry.id,
        client_name: entry.clientName,
        client_role: entry.clientRole,
        company: entry.company,
        quote: entry.quote,
        is_published: entry.isPublished,
        sort_order: entry.sortOrder,
        updated_at: new Date().toISOString(),
      };
      if (isNew) {
        await supabase.from('testimonials').insert([payload]);
      } else {
        await supabase.from('testimonials').update(payload).eq('id', entry.id);
      }
    }
    setEditingItem(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-heading text-xl font-bold text-white">Testimonials Manager</h2>
          <p className="text-xs text-slate-400">
            Section is completely hidden on public site until at least 1 testimonial is published.
          </p>
        </div>
        <button
          type="button"
          onClick={() =>
            setEditingItem({
              id: 't-' + Date.now(),
              clientName: '',
              clientRole: '',
              company: '',
              quote: '',
              isPublished: false,
              sortOrder: items.length + 1,
            })
          }
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold bg-brand-600 text-white hover:bg-brand-700"
        >
          <Plus className="w-4 h-4" /> Add Testimonial
        </button>
      </div>

      {items.length === 0 ? (
        <div className="p-8 rounded-xl border border-dashed border-slate-800 text-center text-slate-500 text-xs">
          Zero testimonials currently recorded. The public testimonials section remains safely hidden.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="p-5 rounded-xl border border-slate-800 bg-slate-900/80 flex flex-col justify-between gap-3"
            >
              <div>
                <p className="text-xs text-slate-300 italic">"{item.quote}"</p>
                <div className="mt-3 font-semibold text-xs text-white">
                  {item.clientName} • <span className="text-slate-400 font-normal">{item.clientRole}</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-slate-800/80">
                <button
                  type="button"
                  onClick={() => handleTogglePublish(item)}
                  className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                    item.isPublished
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                      : 'bg-slate-700 text-slate-400'
                  }`}
                >
                  {item.isPublished ? 'Published' : 'Draft'}
                </button>

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
            </div>
          ))}
        </div>
      )}

      {editingItem && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="w-full max-w-md rounded-2xl border border-slate-700 bg-slate-900 p-6 space-y-4 text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="font-heading font-bold text-sm text-white">Testimonial Entry</h3>
              <button onClick={() => setEditingItem(null)} className="text-slate-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Client / Colleague Name</label>
              <input
                type="text"
                value={editingItem.clientName}
                onChange={(e) => setEditingItem({ ...editingItem, clientName: e.target.value })}
                className="w-full px-3 py-1.5 rounded-lg border border-slate-700 bg-slate-800 text-white"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Role / Title</label>
                <input
                  type="text"
                  value={editingItem.clientRole}
                  onChange={(e) => setEditingItem({ ...editingItem, clientRole: e.target.value })}
                  placeholder="e.g. Finance Director"
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-700 bg-slate-800 text-white"
                />
              </div>
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Company (can be generic)</label>
                <input
                  type="text"
                  value={editingItem.company || ''}
                  onChange={(e) => setEditingItem({ ...editingItem, company: e.target.value })}
                  placeholder="e.g. Enterprise Logistics"
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-700 bg-slate-800 text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Quote</label>
              <textarea
                rows={3}
                value={editingItem.quote}
                onChange={(e) => setEditingItem({ ...editingItem, quote: e.target.value })}
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
