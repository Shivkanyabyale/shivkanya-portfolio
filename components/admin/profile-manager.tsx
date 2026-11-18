'use client';

import * as React from 'react';
import { User, Save, CheckCircle, FileText, Plus, Trash2, ExternalLink } from 'lucide-react';
import { Profile, ResumeFile } from '@/lib/types/portfolio';
import { fallbackProfile, fallbackResumeFiles } from '@/lib/data/fallback-data';
import { createClient } from '@/lib/supabase/client';

export function ProfileManager() {
  const [profile, setProfile] = React.useState<Profile>(fallbackProfile);
  const [resumes, setResumes] = React.useState<ResumeFile[]>(fallbackResumeFiles);
  const [savedMsg, setSavedMsg] = React.useState(false);

  const handleSaveProfile = async () => {
    const supabase = createClient();
    if (supabase) {
      await supabase
        .from('profiles')
        .update({
          full_name: profile.fullName,
          headline: profile.headline,
          value_statement: profile.valueStatement,
          about_p1: profile.aboutP1,
          about_p2: profile.aboutP2,
          currently_learning: profile.currentlyLearning,
          email: profile.email,
          location: profile.location,
          linkedin_url: profile.linkedinUrl,
          closing_statement: profile.closingStatement,
          updated_at: new Date().toISOString(),
        })
        .eq('id', profile.id);
    }
    setSavedMsg(true);
    setTimeout(() => setSavedMsg(false), 3000);
  };

  const handleAddResume = async () => {
    const newResume: ResumeFile = {
      id: 'rf-' + Date.now(),
      title: 'Specialized Resume',
      label: 'New Focus Area',
      fileUrl: '/resume.pdf',
      isPrimary: false,
      sortOrder: resumes.length + 1,
    };
    setResumes([...resumes, newResume]);
  };

  const handleRemoveResume = (id: string) => {
    setResumes(resumes.filter((r) => r.id !== id));
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-heading text-xl font-bold text-white">Profile & Resumes Manager</h2>
          <p className="text-xs text-slate-400">
            Edit candidate biographical copy, contact placeholders, and multi-version resume files.
          </p>
        </div>
        <button
          type="button"
          onClick={handleSaveProfile}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold bg-brand-600 text-white hover:bg-brand-700 shadow-xs"
        >
          <Save className="w-4 h-4" /> Save Profile Changes
        </button>
      </div>

      {savedMsg && (
        <div className="p-3 rounded-lg bg-emerald-950/60 border border-emerald-800 text-xs text-emerald-300 flex items-center gap-2">
          <CheckCircle className="w-4 h-4" />
          <span>Profile configuration saved successfully.</span>
        </div>
      )}

      {/* Main Bio Copy */}
      <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/80 space-y-4 text-xs">
        <h3 className="font-heading font-bold text-sm text-white">Public Bio & Statements</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold text-slate-300 mb-1">Full Name</label>
            <input
              type="text"
              value={profile.fullName}
              onChange={(e) => setProfile({ ...profile, fullName: e.target.value })}
              className="w-full px-3 py-2 rounded-lg border border-slate-700 bg-slate-800 text-white"
            />
          </div>
          <div>
            <label className="block font-semibold text-slate-300 mb-1">Professional Headline</label>
            <input
              type="text"
              value={profile.headline}
              onChange={(e) => setProfile({ ...profile, headline: e.target.value })}
              className="w-full px-3 py-2 rounded-lg border border-slate-700 bg-slate-800 text-white"
            />
          </div>
        </div>

        <div>
          <label className="block font-semibold text-slate-300 mb-1">One-line Value Statement</label>
          <input
            type="text"
            value={profile.valueStatement}
            onChange={(e) => setProfile({ ...profile, valueStatement: e.target.value })}
            className="w-full px-3 py-2 rounded-lg border border-slate-700 bg-slate-800 text-white"
          />
        </div>

        <div>
          <label className="block font-semibold text-slate-300 mb-1">About Paragraph 1</label>
          <textarea
            rows={2}
            value={profile.aboutP1}
            onChange={(e) => setProfile({ ...profile, aboutP1: e.target.value })}
            className="w-full px-3 py-2 rounded-lg border border-slate-700 bg-slate-800 text-white"
          />
        </div>

        <div>
          <label className="block font-semibold text-slate-300 mb-1">About Paragraph 2</label>
          <textarea
            rows={2}
            value={profile.aboutP2}
            onChange={(e) => setProfile({ ...profile, aboutP2: e.target.value })}
            className="w-full px-3 py-2 rounded-lg border border-slate-700 bg-slate-800 text-white"
          />
        </div>

        <div>
          <label className="block font-semibold text-slate-300 mb-1">
            Currently Learning / Building Strip
          </label>
          <input
            type="text"
            value={profile.currentlyLearning}
            onChange={(e) => setProfile({ ...profile, currentlyLearning: e.target.value })}
            className="w-full px-3 py-2 rounded-lg border border-slate-700 bg-slate-800 text-white font-mono"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block font-semibold text-slate-300 mb-1">Contact Email</label>
            <input
              type="text"
              value={profile.email}
              onChange={(e) => setProfile({ ...profile, email: e.target.value })}
              className="w-full px-3 py-2 rounded-lg border border-slate-700 bg-slate-800 text-white font-mono"
            />
          </div>
          <div>
            <label className="block font-semibold text-slate-300 mb-1">Location</label>
            <input
              type="text"
              value={profile.location}
              onChange={(e) => setProfile({ ...profile, location: e.target.value })}
              className="w-full px-3 py-2 rounded-lg border border-slate-700 bg-slate-800 text-white"
            />
          </div>
          <div>
            <label className="block font-semibold text-slate-300 mb-1">LinkedIn URL</label>
            <input
              type="url"
              value={profile.linkedinUrl}
              onChange={(e) => setProfile({ ...profile, linkedinUrl: e.target.value })}
              className="w-full px-3 py-2 rounded-lg border border-slate-700 bg-slate-800 text-white"
            />
          </div>
        </div>

        <div>
          <label className="block font-semibold text-slate-300 mb-1">Closing Statement (Contact)</label>
          <input
            type="text"
            value={profile.closingStatement}
            onChange={(e) => setProfile({ ...profile, closingStatement: e.target.value })}
            className="w-full px-3 py-2 rounded-lg border border-slate-700 bg-slate-800 text-white"
          />
        </div>
      </div>

      {/* Multiple Resume Versions Manager */}
      <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/80 space-y-4 text-xs">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-heading font-bold text-sm text-white">Multi-Version Resumes</h3>
            <p className="text-[11px] text-slate-400">
              Users clicking "Download Resume" in the hero see this menu of versions.
            </p>
          </div>
          <button
            type="button"
            onClick={handleAddResume}
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-800 text-slate-200 hover:text-white font-semibold"
          >
            <Plus className="w-3.5 h-3.5" /> Add Version
          </button>
        </div>

        <div className="space-y-3">
          {resumes.map((r, i) => (
            <div
              key={r.id || i}
              className="p-3.5 rounded-xl border border-slate-800 bg-slate-800/50 flex items-center justify-between gap-4"
            >
              <div className="flex items-center gap-3 flex-1">
                <FileText className="w-4 h-4 text-brand-400 shrink-0" />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 flex-1">
                  <input
                    type="text"
                    value={r.label}
                    onChange={(e) => {
                      const updated = [...resumes];
                      updated[i].label = e.target.value;
                      setResumes(updated);
                    }}
                    placeholder="Menu Label (e.g. Power BI Focus)"
                    className="px-2.5 py-1 rounded border border-slate-700 bg-slate-800 text-white"
                  />
                  <input
                    type="text"
                    value={r.fileUrl}
                    onChange={(e) => {
                      const updated = [...resumes];
                      updated[i].fileUrl = e.target.value;
                      setResumes(updated);
                    }}
                    placeholder="PDF File URL (/resume.pdf or Supabase storage link)"
                    className="px-2.5 py-1 rounded border border-slate-700 bg-slate-800 text-white font-mono"
                  />
                </div>
              </div>

              <button
                type="button"
                onClick={() => handleRemoveResume(r.id)}
                className="p-1.5 rounded text-slate-500 hover:text-red-400"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
