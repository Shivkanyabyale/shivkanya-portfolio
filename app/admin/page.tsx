'use client';

import * as React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  FolderKanban,
  Award,
  Cpu,
  Briefcase,
  TrendingUp,
  User,
  Quote,
  Eye,
  LogOut,
  ExternalLink,
  ShieldCheck,
  LayoutDashboard,
} from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { ProjectsManager } from '@/components/admin/projects-manager';
import { CertificationsManager } from '@/components/admin/certifications-manager';
import { SkillsManager } from '@/components/admin/skills-manager';
import { ExperienceManager } from '@/components/admin/experience-manager';
import { MetricsManager } from '@/components/admin/metrics-manager';
import { ProfileManager } from '@/components/admin/profile-manager';
import { TestimonialsManager } from '@/components/admin/testimonials-manager';

type AdminTab = 'projects' | 'certifications' | 'skills' | 'experience' | 'metrics' | 'profile' | 'testimonials';

export default function AdminDashboardPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = React.useState<AdminTab>('projects');
  const [sessionChecked, setSessionChecked] = React.useState(false);

  // Check auth
  React.useEffect(() => {
    async function checkAuth() {
      const supabase = createClient();
      if (!supabase) {
        // Local dev session fallback
        const devToken = sessionStorage.getItem('admin_dev_session');
        if (!devToken) {
          router.push('/admin/login');
          return;
        }
        setSessionChecked(true);
        return;
      }

      const { data } = await supabase.auth.getSession();
      if (!data.session) {
        router.push('/admin/login');
      } else {
        setSessionChecked(true);
      }
    }
    checkAuth();
  }, [router]);

  const handleLogout = async () => {
    const supabase = createClient();
    if (supabase) {
      await supabase.auth.signOut();
    }
    sessionStorage.removeItem('admin_dev_session');
    router.push('/admin/login');
  };

  if (!sessionChecked) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-slate-400 text-xs">
        Verifying administrator credentials...
      </div>
    );
  }

  const tabs = [
    { id: 'projects', label: 'Projects', icon: FolderKanban },
    { id: 'profile', label: 'Profile & Resumes', icon: User },
    { id: 'metrics', label: 'Key Numbers', icon: TrendingUp },
    { id: 'certifications', label: 'Certifications', icon: Award },
    { id: 'skills', label: 'Skills & Tools', icon: Cpu },
    { id: 'experience', label: 'Experience', icon: Briefcase },
    { id: 'testimonials', label: 'Testimonials', icon: Quote },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100">
      {/* Top Admin Header */}
      <header className="border-b border-slate-800 bg-slate-900/90 backdrop-blur px-4 sm:px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-500 to-sky-700 flex items-center justify-center text-white font-bold text-xs shadow-xs">
            SB
          </div>
          <div>
            <span className="font-heading font-bold text-sm text-white block">
              Portfolio Admin CMS
            </span>
            <span className="text-[10px] text-slate-400 flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-emerald-400" />
              Authenticated Session
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <Link
            href="/"
            target="_blank"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-700 bg-slate-800 text-slate-300 hover:text-white text-xs font-semibold transition-colors"
          >
            <span>Live Site</span>
            <ExternalLink className="w-3 h-3" />
          </Link>

          <button
            type="button"
            onClick={handleLogout}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-950/60 border border-red-900 text-red-300 hover:bg-red-900/80 text-xs font-semibold transition-colors"
          >
            <LogOut className="w-3 h-3" />
            <span>Sign Out</span>
          </button>
        </div>
      </header>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 flex-1 flex flex-col md:flex-row gap-8">
        {/* Left Sidebar Navigation */}
        <aside className="w-full md:w-60 shrink-0 space-y-1">
          <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider px-3 pb-2">
            Content Sections
          </div>
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as AdminTab)}
                className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-brand-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white hover:bg-slate-900'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </aside>

        {/* Right Active Panel */}
        <main className="flex-1 min-w-0">
          {activeTab === 'projects' && <ProjectsManager />}
          {activeTab === 'profile' && <ProfileManager />}
          {activeTab === 'metrics' && <MetricsManager />}
          {activeTab === 'certifications' && <CertificationsManager />}
          {activeTab === 'skills' && <SkillsManager />}
          {activeTab === 'experience' && <ExperienceManager />}
          {activeTab === 'testimonials' && <TestimonialsManager />}
        </main>
      </div>
    </div>
  );
}
