import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  CheckCircle2,
  AlertTriangle,
  FolderKanban,
  Layers,
  Sparkles,
  BarChart,
  ShieldAlert,
} from 'lucide-react';
import { getProjects, getProjectBySlug } from '@/lib/supabase/data-service';
import { ImageLightbox } from '@/components/image-lightbox';
import { Project } from '@/lib/types/portfolio';

interface ProjectPageProps {
  params: { slug: string };
  searchParams?: { preview?: string };
}

export async function generateMetadata({
  params,
  searchParams,
}: ProjectPageProps): Promise<Metadata> {
  const isPreview = searchParams?.preview === 'true';
  const project = await getProjectBySlug(params.slug, { includeDrafts: isPreview });

  if (!project) {
    return {
      title: 'Project Not Found | Shivkanya Byale',
    };
  }

  return {
    title: `${project.title} | Case Study | Shivkanya Byale`,
    description: project.summary,
    openGraph: {
      title: `${project.title} - Shivkanya Byale`,
      description: project.summary,
      type: 'article',
    },
  };
}

export default async function ProjectDetailPage({
  params,
  searchParams,
}: ProjectPageProps) {
  const isPreview = searchParams?.preview === 'true';
  const project = await getProjectBySlug(params.slug, { includeDrafts: isPreview });

  if (!project) {
    notFound();
  }

  // Get all projects for prev / next navigation
  const allProjects = await getProjects({ includeDrafts: isPreview });
  const currentIndex = allProjects.findIndex((p) => p.slug === project.slug);
  const prevProject = currentIndex > 0 ? allProjects[currentIndex - 1] : null;
  const nextProject = currentIndex < allProjects.length - 1 ? allProjects[currentIndex + 1] : null;

  // Grouped Tech Stack helper
  const renderTechGroup = (label: string, items?: string[]) => {
    if (!items || items.length === 0) return null;
    return (
      <div className="space-y-2">
        <h4 className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
          {label}
        </h4>
        <div className="flex flex-wrap gap-1.5">
          {items.map((tech, i) => (
            <span
              key={i}
              className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200/60 dark:border-slate-700/60"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    );
  };

  const isStructuredTech = typeof project.techStack === 'object' && !Array.isArray(project.techStack);
  const flatTechList = Array.isArray(project.techStack)
    ? project.techStack
    : isStructuredTech
    ? (project.techStack as any).all || []
    : [];

  return (
    <article className="min-h-screen pt-28 pb-24 relative">
      {/* Background data grid */}
      <div className="absolute inset-0 data-grid-bg pointer-events-none opacity-40" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation Breadcrumb / Back Link */}
        <div className="flex items-center justify-between mb-8">
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to All Projects</span>
          </Link>

          {project.status === 'draft' && (
            <div className="px-2.5 py-1 rounded-md text-xs font-mono font-bold bg-amber-500/20 text-amber-700 dark:text-amber-300 border border-amber-500/40">
              DRAFT PREVIEW
            </div>
          )}
        </div>

        {/* Section 1: Title and Domain Tag */}
        <header className="space-y-4 mb-10 pb-8 border-b border-slate-200 dark:border-slate-800">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-brand-50 dark:bg-brand-950/40 text-brand-700 dark:text-brand-300 border border-brand-200 dark:border-brand-800/80">
            <FolderKanban className="w-3.5 h-3.5 text-brand-500" />
            <span>{project.domain}</span>
          </div>

          <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
            {project.title}
          </h1>

          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 font-medium leading-relaxed">
            {project.summary}
          </p>
        </header>

        {/* Section 2: Overview */}
        <section className="mb-12">
          <h2 className="text-xs font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400 mb-3">
            Overview
          </h2>
          <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 shadow-xs">
            <p className="text-sm sm:text-base text-slate-700 dark:text-slate-200 leading-relaxed">
              {project.overview}
            </p>
          </div>
        </section>

        {/* Section 3 & 4: Problem and Solution */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {/* Section 3: Problem / Business Challenge */}
          <section className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 shadow-xs space-y-3">
            <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400">
              <AlertTriangle className="w-4 h-4" />
              <h2 className="text-xs font-bold uppercase tracking-wider">
                The Business Challenge
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {project.problem}
            </p>
          </section>

          {/* Section 4: Solution / What I Built */}
          <section className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 shadow-xs space-y-3">
            <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
              <CheckCircle2 className="w-4 h-4" />
              <h2 className="text-xs font-bold uppercase tracking-wider">
                The Solution & Architecture
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {project.solution}
            </p>
          </section>
        </div>

        {/* Section 5: Key Features (Bulleted) */}
        {project.keyFeatures && project.keyFeatures.length > 0 && (
          <section className="mb-12">
            <h2 className="text-xs font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400 mb-4">
              Key Features & Capabilities
            </h2>
            <div className="p-6 sm:p-7 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 shadow-xs">
              <ul className="space-y-3">
                {project.keyFeatures.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-500 shrink-0 mt-2" />
                    <span className="leading-relaxed">
                      {feature.includes('[PLACEHOLDER') ? (
                        <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-600 dark:text-amber-400 font-mono text-xs border border-amber-500/20">
                          {feature}
                        </span>
                      ) : (
                        feature
                      )}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        {/* Section 6: My Role & Responsibilities (Bulleted) */}
        {project.responsibilities && project.responsibilities.length > 0 && (
          <section className="mb-12">
            <h2 className="text-xs font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400 mb-4">
              My Role & Responsibilities
            </h2>
            <div className="p-6 sm:p-7 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 shadow-xs">
              <ul className="space-y-3">
                {project.responsibilities.map((resp, i) => (
                  <li key={i} className="flex items-start gap-3 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-sky-500 shrink-0 mt-2" />
                    <span className="leading-relaxed">
                      {resp.includes('[PLACEHOLDER') ? (
                        <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-600 dark:text-amber-400 font-mono text-xs border border-amber-500/20">
                          {resp}
                        </span>
                      ) : (
                        resp
                      )}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        {/* Section 7: Tech Stack (Grouped Chips: BI, Data, Automation, Tools) */}
        <section className="mb-12">
          <h2 className="text-xs font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400 mb-4">
            Tech Stack
          </h2>
          <div className="p-6 sm:p-7 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 shadow-xs">
            {isStructuredTech ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {renderTechGroup('Business Intelligence', (project.techStack as any).bi)}
                {renderTechGroup('Data Engineering & Modeling', (project.techStack as any).data)}
                {renderTechGroup('Automation & RPA', (project.techStack as any).automation)}
                {renderTechGroup('Tools & Environment', (project.techStack as any).tools)}
              </div>
            ) : (
              <div className="flex flex-wrap gap-2">
                {flatTechList.map((t: string, idx: number) => (
                  <span
                    key={idx}
                    className="inline-flex items-center px-3 py-1 rounded-lg text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200/60 dark:border-slate-700/60"
                  >
                    {t}
                  </span>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Section 8: Outcome / Impact (Only if provided; hide if empty) */}
        {project.outcome && project.outcome.length > 0 && (
          <section className="mb-12">
            <h2 className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 mb-4">
              Outcome & Impact
            </h2>
            <div className="p-6 sm:p-7 rounded-2xl border border-emerald-200/60 dark:border-emerald-900/40 bg-emerald-50/20 dark:bg-emerald-950/10 shadow-xs">
              <ul className="space-y-3">
                {project.outcome.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span className="leading-relaxed">
                      {item.includes('[PLACEHOLDER') ? (
                        <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-600 dark:text-amber-400 font-mono text-xs border border-amber-500/20">
                          {item}
                        </span>
                      ) : (
                        item
                      )}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        {/* Section 9: Live Demo (Optional embed or link, only on public sample data) */}
        {project.liveDemoUrl && (
          <section className="mb-12">
            <h2 className="text-xs font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400 mb-4">
              Interactive Public Demo
            </h2>
            <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-500 dark:text-slate-400 italic">
                  Note: Built exclusively with public, sanitized sample datasets. Client proprietary data is never shown.
                </span>
                <a
                  href={project.liveDemoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold bg-brand-600 text-white hover:bg-brand-700 transition-colors"
                >
                  <span>Open Live Demo</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </section>
        )}

        {/* Section 10: Screenshots / Gallery (Optional with lightbox) */}
        <section className="mb-14">
          <h2 className="text-xs font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400 mb-4">
            Visual Architecture & Dashboards
          </h2>
          {project.galleryImages && project.galleryImages.length > 0 ? (
            <ImageLightbox images={project.galleryImages} />
          ) : (
            <div className="p-8 sm:p-12 rounded-2xl border border-dashed border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/30 text-center">
              <div className="w-14 h-14 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-brand-500 mx-auto mb-3 shadow-xs">
                <BarChart className="w-7 h-7" />
              </div>
              <h3 className="font-heading font-semibold text-sm text-slate-800 dark:text-slate-200">
                Dashboard screenshot (anonymised)
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto mt-1">
                Visual assets are securely anonymized to safeguard client data confidentiality. Demonstrations available on public sample data upon request.
              </p>
            </div>
          )}
        </section>

        {/* Previous / Next Project Navigation */}
        <nav className="pt-8 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between gap-4">
          {prevProject ? (
            <Link
              href={`/projects/${prevProject.slug}`}
              className="group flex flex-col items-start text-left max-w-[45%]"
            >
              <span className="flex items-center gap-1 text-[11px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider group-hover:text-brand-500">
                <ArrowLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" />
                Previous Project
              </span>
              <span className="mt-1 font-heading text-sm font-bold text-slate-900 dark:text-white truncate w-full group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                {prevProject.title}
              </span>
            </Link>
          ) : (
            <div />
          )}

          {nextProject && (
            <Link
              href={`/projects/${nextProject.slug}`}
              className="group flex flex-col items-end text-right max-w-[45%]"
            >
              <span className="flex items-center gap-1 text-[11px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider group-hover:text-brand-500">
                Next Project
                <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </span>
              <span className="mt-1 font-heading text-sm font-bold text-slate-900 dark:text-white truncate w-full group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                {nextProject.title}
              </span>
            </Link>
          )}
        </nav>
      </div>
    </article>
  );
}
