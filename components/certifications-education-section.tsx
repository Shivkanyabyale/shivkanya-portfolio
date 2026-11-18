import { Award, GraduationCap, ExternalLink, CheckCircle } from 'lucide-react';
import { Certification, EducationItem } from '@/lib/types/portfolio';

interface CertificationsEducationSectionProps {
  certifications: Certification[];
  education: EducationItem[];
}

export function CertificationsEducationSection({
  certifications,
  education,
}: CertificationsEducationSectionProps) {
  const sortedCerts = [...certifications].sort((a, b) => a.sortOrder - b.sortOrder);
  const sortedEdu = [...education].sort((a, b) => a.sortOrder - b.sortOrder);

  return (
    <section className="py-20 md:py-28 relative border-t border-slate-200/80 dark:border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left Column: Certifications */}
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-brand-50 dark:bg-brand-950/40 text-brand-700 dark:text-brand-300 border border-brand-200 dark:border-brand-800/80">
                <Award className="w-3.5 h-3.5 text-brand-500" />
                <span>Verified Credentials</span>
              </div>
              <h2 className="font-heading text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
                Certifications
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                Industry-standard Microsoft certifications in analytics engineering and modern data platforms.
              </p>
            </div>

            <div className="space-y-4">
              {sortedCerts.map((cert) => (
                <div
                  key={cert.id}
                  className="p-5 sm:p-6 rounded-2xl border border-slate-200 dark:border-slate-800/90 bg-white dark:bg-slate-900/60 shadow-xs hover:border-brand-500/50 transition-all group flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                >
                  <div className="flex items-start gap-4">
                    {/* Badge Icon Frame */}
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-500/10 to-sky-500/20 border border-brand-200 dark:border-brand-800/80 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                      <Award className="w-6 h-6 text-brand-600 dark:text-brand-400" />
                    </div>

                    <div>
                      <h3 className="font-heading text-sm sm:text-base font-bold text-slate-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                        {cert.name}
                      </h3>
                      <div className="flex items-center gap-2 mt-1 text-xs text-slate-500 dark:text-slate-400">
                        <span className="font-medium text-slate-700 dark:text-slate-300">{cert.issuer}</span>
                        <span>•</span>
                        <span>Issued {cert.issueYear}</span>
                      </div>
                    </div>
                  </div>

                  {cert.credentialUrl && (
                    <a
                      href={cert.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 hover:bg-brand-50 dark:hover:bg-brand-950/40 hover:text-brand-600 dark:hover:text-brand-400 transition-colors shrink-0 self-end sm:self-auto"
                      aria-label={`Verify ${cert.name}`}
                    >
                      <span>Verify</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Education */}
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-brand-50 dark:bg-brand-950/40 text-brand-700 dark:text-brand-300 border border-brand-200 dark:border-brand-800/80">
                <GraduationCap className="w-3.5 h-3.5 text-brand-500" />
                <span>Academic Foundation</span>
              </div>
              <h2 className="font-heading text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
                Education
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                Academic training rooted in engineering, analytical problem solving, and quantitative rigor.
              </p>
            </div>

            <div className="space-y-4">
              {sortedEdu.map((edu) => (
                <div
                  key={edu.id}
                  className="p-5 sm:p-6 rounded-2xl border border-slate-200 dark:border-slate-800/90 bg-white dark:bg-slate-900/60 shadow-xs hover:border-slate-300 dark:hover:border-slate-700 transition-all"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="font-heading text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                        {edu.degree}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-0.5">
                        {edu.institution}
                      </p>
                    </div>

                    <div className="px-2.5 py-1 rounded-md bg-brand-50 dark:bg-brand-950/60 text-brand-700 dark:text-brand-300 border border-brand-200/60 dark:border-brand-800/60 text-xs font-bold shrink-0">
                      {edu.score}
                    </div>
                  </div>

                  {edu.details && (
                    <p className="mt-3 text-xs text-slate-500 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-800/70 pt-2.5">
                      {edu.details}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
