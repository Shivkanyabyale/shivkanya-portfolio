'use client';

import * as React from 'react';
import { TrendingUp, Save, CheckCircle } from 'lucide-react';
import { KeyMetric } from '@/lib/types/portfolio';
import { fallbackKeyMetrics } from '@/lib/data/fallback-data';
import { createClient } from '@/lib/supabase/client';

export function MetricsManager() {
  const [metrics, setMetrics] = React.useState<KeyMetric[]>(fallbackKeyMetrics);
  const [savedMsg, setSavedMsg] = React.useState(false);

  const handleUpdate = (id: string, field: 'value' | 'label', val: string) => {
    setMetrics(metrics.map((m) => (m.id === id ? { ...m, [field]: val } : m)));
  };

  const handleSaveAll = async () => {
    const supabase = createClient();
    if (supabase) {
      for (const m of metrics) {
        await supabase
          .from('key_metrics')
          .update({
            metric_value: m.value,
            metric_label: m.label,
            updated_at: new Date().toISOString(),
          })
          .eq('id', m.id);
      }
    }
    setSavedMsg(true);
    setTimeout(() => setSavedMsg(false), 3000);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-heading text-xl font-bold text-white">Key Numbers Strip Manager</h2>
          <p className="text-xs text-slate-400">
            Strictly manage the 4 verified facts displayed directly below the hero section.
          </p>
        </div>
        <button
          type="button"
          onClick={handleSaveAll}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold bg-brand-600 text-white hover:bg-brand-700 shadow-xs"
        >
          <Save className="w-4 h-4" /> Save Metrics
        </button>
      </div>

      {savedMsg && (
        <div className="p-3 rounded-lg bg-emerald-950/60 border border-emerald-800 text-xs text-emerald-300 flex items-center gap-2">
          <CheckCircle className="w-4 h-4" />
          <span>Key metrics updated successfully.</span>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {metrics.map((m) => (
          <div
            key={m.id}
            className="p-5 rounded-xl border border-slate-800 bg-slate-900/80 space-y-3"
          >
            <div>
              <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                Value (e.g. 3+, 5+, DP-600)
              </label>
              <input
                type="text"
                value={m.value}
                onChange={(e) => handleUpdate(m.id, 'value', e.target.value)}
                className="w-full px-3 py-1.5 rounded-lg border border-slate-700 bg-slate-800 text-sm font-bold text-white"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                Metric Label
              </label>
              <input
                type="text"
                value={m.label}
                onChange={(e) => handleUpdate(m.id, 'label', e.target.value)}
                className="w-full px-3 py-1.5 rounded-lg border border-slate-700 bg-slate-800 text-xs text-slate-200"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
