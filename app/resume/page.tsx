import { Metadata } from 'next';
import Link from 'next/link';
import {
  ArrowLeft,
  Mail,
  MapPin,
  Linkedin,
  Award,
  GraduationCap,
  Briefcase,
  CheckCircle,
} from 'lucide-react';
import {
  getProfile,
  getExperience,
  getSkillGroups,
  getProjects,
  getCertifications,
  getEducation,
} from '@/lib/supabase/data-service';
import { ResumeActions } from '@/components/resume-actions';

export const metadata: Metadata = {
  title: 'Resume | Shivkanya Byale - Power BI & Microsoft Fabric Consultant',
  description:
    'Print-friendly curriculum vitae of Shivkanya Byale, Power BI Developer, Power Platform Developer & Microsoft Fabric Consultant.',
};

export default async function ResumePage() {
  const profile = await getProfile();
  const experience = await getExperience();
  const skillGroups = await getSkillGroups();
  const projects = await getProjects({ includeDrafts: false });
  const certifications = await getCertifications();
  const education = await getEducation();

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 py-8 px-4 sm:px-6 lg:px-8">
      {/* Top Floating Control Bar (Hidden on print) */}
      <div className="max-w-4xl mx-auto mb-6 flex flex-wrap items-center justify-between gap-3 no-print">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-brand-600 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Portfolio</span>
        </Link>

        <ResumeActions />
      </div>

      {/* Printable Sheet (Standard A4 / Letter format feel) */}
      <main className="max-w-4xl mx-auto bg-white text-slate-900 rounded-2xl shadow-lg border border-slate-200/80 p-8 sm:p-12 print:shadow-none print:border-none print:p-0 print:m-0 print:max-w-full">
        {/* Header */}
        <header className="border-b border-slate-300 pb-6 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
            <div>
              <h1 className="font-heading text-3xl font-bold tracking-tight text-slate-900">
                {profile.fullName}
              </h1>
              <p className="text-base font-semibold text-brand-700 mt-1">
                {profile.headline}
              </p>
              <p className="text-xs text-slate-600 mt-2 max-w-xl leading-relaxed">
                {profile.valueStatement}
              </p>
            </div>

            {/* Contact details */}
            <div className="text-xs text-slate-600 space-y-1.5 sm:text-right shrink-0">
              <div className="flex items-center sm:justify-end gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-slate-500" />
                <span>{profile.location}</span>
              </div>
              <div className="flex items-center sm:justify-end gap-1.5">
                <Mail className="w-3.5 h-3.5 text-slate-500" />
                <span className="font-mono">{profile.email}</span>
              </div>
              <div className="flex items-center sm:justify-end gap-1.5">
                <Linkedin className="w-3.5 h-3.5 text-[#0077b5]" />
                <a
                  href={profile.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline text-brand-700 font-medium"
                >
                  linkedin.com/in/shivkanya-byale
                </a>
              </div>
            </div>
          </div>
        </header>

        {/* Executive Summary */}
        <section className="mb-6">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1 mb-2">
            Professional Summary
          </h2>
          <p className="text-xs text-slate-700 leading-relaxed mb-1.5">
            {profile.aboutP1}
          </p>
          <p className="text-xs text-slate-700 leading-relaxed">
            {profile.aboutP2}
          </p>
        </section>

        {/* Technical Competencies */}
        <section className="mb-6">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1 mb-3">
            Core Competencies & Toolset
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            {skillGroups.map((group) => (
              <div key={group.id} className="space-y-0.5">
                <span className="font-bold text-slate-900 block">{group.name}:</span>
                <span className="text-slate-600 leading-relaxed">
                  {group.skills.map((s) => s.name).join(', ')}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Professional Experience */}
        <section className="mb-6">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1 mb-3">
            Work Experience
          </h2>
          <div className="space-y-4">
            {experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex items-baseline justify-between">
                  <div className="font-bold text-xs text-slate-900">
                    {exp.role} <span className="font-normal text-slate-600">| {exp.company}</span>
                  </div>
                  <div className="text-[11px] font-semibold text-slate-500">
                    {exp.startYear} – {exp.endYear} • {exp.location}
                  </div>
                </div>
                <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">
                  {exp.description}
                </p>
                {exp.highlights && exp.highlights.length > 0 && (
                  <ul className="mt-1.5 space-y-1 text-[11px] text-slate-700 pl-3">
                    {exp.highlights.map((h, i) => (
                      <li key={i} className="list-disc leading-relaxed">
                        {h}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Featured Project Highlights */}
        <section className="mb-6">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1 mb-3">
            Key Architecture Projects
          </h2>
          <div className="space-y-3">
            {projects.map((proj) => (
              <div key={proj.id} className="text-xs">
                <div className="flex items-baseline justify-between font-bold text-slate-900">
                  <span>
                    {proj.title} <span className="font-normal text-slate-500 text-[11px]">({proj.domain})</span>
                  </span>
                </div>
                <p className="text-[11px] text-slate-600 mt-0.5 leading-relaxed">
                  {proj.summary}
                </p>
                {proj.keyFeatures && (
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    <span className="font-semibold text-slate-700">Capabilities:</span>{' '}
                    {proj.keyFeatures.slice(0, 3).join(' • ')}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Certifications & Education */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2 border-t border-slate-200">
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 pb-1 mb-2">
              Certifications
            </h2>
            <div className="space-y-2 text-xs">
              {certifications.map((c) => (
                <div key={c.id}>
                  <div className="font-semibold text-slate-900">{c.name}</div>
                  <div className="text-[11px] text-slate-500">
                    {c.issuer} • Issued {c.issueYear}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 pb-1 mb-2">
              Education
            </h2>
            <div className="space-y-2 text-xs">
              {education.map((edu) => (
                <div key={edu.id}>
                  <div className="font-semibold text-slate-900 flex justify-between">
                    <span>{edu.degree}</span>
                    <span className="text-[11px] font-bold text-brand-700">{edu.score}</span>
                  </div>
                  <div className="text-[11px] text-slate-500">
                    {edu.institution}, {edu.location}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
