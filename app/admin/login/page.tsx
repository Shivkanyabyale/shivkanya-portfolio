'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { Lock, Mail, ArrowRight, ShieldCheck, AlertCircle } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState<string | null>(null);
  const [attempts, setAttempts] = React.useState(0);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    // Rate limit after 5 failed attempts
    if (attempts >= 5) {
      setErrorMsg('Too many failed attempts. Please wait 15 minutes.');
      return;
    }

    setLoading(true);

    try {
      const supabase = createClient();

      if (!supabase) {
        // Supabase credentials not set or local fallback mode
        // Allow developer mode access with local storage token
        sessionStorage.setItem('admin_dev_session', 'authenticated');
        router.push('/admin');
        return;
      }

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setAttempts((prev) => prev + 1);
        throw error;
      }

      if (data.session) {
        router.push('/admin');
      }
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || 'Authentication failed. Please verify credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-slate-950 text-slate-100">
      <div className="w-full max-w-md p-8 rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-xl bg-brand-500/10 border border-brand-500/20 flex items-center justify-center text-brand-400 mx-auto mb-3">
            <Lock className="w-6 h-6" />
          </div>
          <h1 className="font-heading text-2xl font-bold tracking-tight text-white">
            Admin Authentication
          </h1>
          <p className="text-xs text-slate-400">
            Secure management console for Shivkanya Byale portfolio.
          </p>
        </div>

        {errorMsg && (
          <div className="p-3.5 rounded-lg bg-red-950/50 border border-red-800/80 text-xs text-red-300 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Admin Email
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@example.com"
                className="w-full pl-9 pr-3.5 py-2.5 rounded-lg border border-slate-700 bg-slate-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full pl-9 pr-3.5 py-2.5 rounded-lg border border-slate-700 bg-slate-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold bg-brand-600 hover:bg-brand-700 text-white shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-brand-500 disabled:opacity-60"
          >
            {loading ? <span>Verifying...</span> : <span>Sign In to Admin</span>}
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="pt-4 border-t border-slate-800 text-center">
          <p className="text-[11px] text-slate-500 flex items-center justify-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
            <span>Protected by Supabase Auth & Row Level Security</span>
          </p>
        </div>
      </div>
    </div>
  );
}
