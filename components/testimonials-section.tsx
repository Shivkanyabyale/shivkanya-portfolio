import { Quote } from 'lucide-react';
import { Testimonial } from '@/lib/types/portfolio';

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
}

export function TestimonialsSection({ testimonials }: TestimonialsSectionProps) {
  const publishedTestimonials = testimonials.filter((t) => t.isPublished);

  // Hidden completely if zero published testimonials exist
  if (!publishedTestimonials || publishedTestimonials.length === 0) {
    return null;
  }

  return (
    <section id="testimonials" className="py-20 md:py-28 relative border-t border-slate-200/80 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-950/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-brand-50 dark:bg-brand-950/40 text-brand-700 dark:text-brand-300 border border-brand-200 dark:border-brand-800/80">
            <Quote className="w-3.5 h-3.5 text-brand-500" />
            <span>Endorsements</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
            Client & Stakeholder Feedback
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {publishedTestimonials.map((item) => (
            <div
              key={item.id}
              className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800/90 bg-white dark:bg-slate-900/60 shadow-xs flex flex-col justify-between"
            >
              <div>
                <Quote className="w-8 h-8 text-brand-500/30 mb-4" />
                <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed italic">
                  "{item.quote}"
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800/70">
                <h4 className="font-heading text-sm font-bold text-slate-900 dark:text-white">
                  {item.clientName}
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {item.clientRole}
                  {item.company ? ` • ${item.company}` : ''}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
