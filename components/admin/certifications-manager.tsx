'use client';

import * as React from 'react';
import { Award, Plus, Edit2, Trash2, CheckCircle, ExternalLink, Save, X } from 'lucide-react';
import { Certification } from '@/lib/types/portfolio';
import { fallbackCertifications } from '@/lib/data/fallback-data';
import { createClient } from '@/lib/supabase/client';

export function CertificationsManager() {
  const [certs, setCerts] = React.useState<Certification[]>(fallbackCertifications);
  const [editingCert, setEditingCert] = React.useState<Certification | null>(null);

  React.useEffect(() => {
    async function loadData() {
      const supabase = createClient();
      if (supabase) {
        const { data, error } = await supabase.from('certifications').select('*').order('sort_order');
        if (data && !error && data.length > 0) {
          setCerts(
            data.map((c) => ({
              id: c.id,
              name: c.name,
              issuer: c.issuer,
              issueYear: c.issue_year,
              credentialUrl: c.credential_url,
              badgeImage: c.badge_image,
              isPublished: c.is_published,
              sortOrder: c.sort_order,
            }))
          );
        }
      }
    }
    loadData();
  }, []);

  const handleTogglePublish = async (cert: Certification) => {
    const nextVal = !cert.isPublished;
    setCerts(certs.map((c) => (c.id === cert.id ? { ...c, isPublished: nextVal } : c)));
    const supabase = createClient();
    if (supabase) {
      await supabase.from('certifications').update({ is_published: nextVal }).eq('id', cert.id);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Delete this certification?')) return;
    setCerts(certs.filter((c) => c.id !== id));
    const supabase = createClient();
    if (supabase) {
      await supabase.from('certifications').delete().eq('id', id);
    }
  };

  const handleSave = async (item: Certification) => {
    const isNew = !certs.some((c) => c.id === item.id);
    const next = isNew ? [...certs, item] : certs.map((c) => (c.id === item.id ? item : c));
    setCerts(next);

    const supabase = createClient();
    if (supabase) {
      const payload = {
        id: item.id,
        name: item.name,
        issuer: item.issuer,
        issue_year: item.issueYear,
        credential_url: item.credentialUrl,
        badge_image: item.badgeImage,
        is_published: item.isPublished,
        sort_order: item.sortOrder,
      };
      if (isNew) {
        await supabase.from('certifications').insert([payload]);
      } else {
        await supabase.from('certifications').update(payload).eq('id', item.id);
      }
    }
    setEditingCert(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-heading text-xl font-bold text-white">Certifications Manager</h2>
          <p className="text-xs text-slate-400">Manage credentials and Microsoft badges.</p>
        </div>
        <button
          type="button"
          onClick={() =>
            setEditingCert({
              id: 'c-' + Date.now(),
              name: '',
              issuer: 'Microsoft',
              issueYear: new Date().getFullYear().toString(),
              credentialUrl: '',
              badgeImage: '',
              isPublished: true,
              sortOrder: certs.length + 1,
            })
          }
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold bg-brand-600 text-white hover:bg-brand-700"
        >
          <Plus className="w-4 h-4" /> Add Certification
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {certs.map((c) => (
          <div
            key={c.id}
            className="p-5 rounded-xl border border-slate-800 bg-slate-900/80 flex items-start justify-between gap-4"
          >
            <div className="flex items-start gap-3">
              <Award className="w-6 h-6 text-brand-400 shrink-0 mt-0.5" />
              <div>
                <h3 className="font-heading text-sm font-bold text-white">{c.name}</h3>
                <p className="text-xs text-slate-400">
                  {c.issuer} • {c.issueYear}
                </p>
                {c.credentialUrl && (
                  <a
                    href={c.credentialUrl}
                    target="_blank"
                    className="inline-flex items-center gap-1 text-[11px] text-brand-400 hover:underline mt-1"
                  >
                    <span>Verify Link</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => handleTogglePublish(c)}
                className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                  c.isPublished ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-700 text-slate-400'
                }`}
              >
                {c.isPublished ? 'Published' : 'Hidden'}
              </button>
              <button
                type="button"
                onClick={() => setEditingCert(c)}
                className="p-1 rounded bg-slate-800 text-slate-300 hover:text-white"
              >
                <Edit2 className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => handleDelete(c.id)}
                className="p-1 rounded bg-slate-800 text-slate-300 hover:text-red-400"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {editingCert && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="w-full max-w-md rounded-2xl border border-slate-700 bg-slate-900 p-6 space-y-4 text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="font-heading font-bold text-sm text-white">Certification Details</h3>
              <button onClick={() => setEditingCert(null)} className="text-slate-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Certification Name</label>
              <input
                type="text"
                value={editingCert.name}
                onChange={(e) => setEditingCert({ ...editingCert, name: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-slate-700 bg-slate-800 text-white"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Issuer</label>
                <input
                  type="text"
                  value={editingCert.issuer}
                  onChange={(e) => setEditingCert({ ...editingCert, issuer: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-slate-700 bg-slate-800 text-white"
                />
              </div>
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Year (Year only)</label>
                <input
                  type="text"
                  value={editingCert.issueYear}
                  onChange={(e) => setEditingCert({ ...editingCert, issueYear: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-slate-700 bg-slate-800 text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Credential URL</label>
              <input
                type="url"
                value={editingCert.credentialUrl || ''}
                onChange={(e) => setEditingCert({ ...editingCert, credentialUrl: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-slate-700 bg-slate-800 text-white"
              />
            </div>

            <div className="pt-3 border-t border-slate-800 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setEditingCert(null)}
                className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => handleSave(editingCert)}
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
