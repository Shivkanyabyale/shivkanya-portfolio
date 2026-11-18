import Link from 'next/link';
import {
  BarChart3,
  Database,
  Layers,
  Workflow,
  Bot,
  FileSpreadsheet,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { ServiceItem } from '@/lib/types/portfolio';

interface ServicesSectionProps {
  services: ServiceItem[];
}

export function ServicesSection({ services }: ServicesSectionProps) {
  const getIcon = (iconName: string) => {
    switch (iconName?.toLowerCase()) {
      case 'barchart3':
      case 'barchart':
      case 'chart':
        return <BarChart3 className="w-6 h-6 text-brand-500" />;
      case 'database':
      case 'data':
        return <Database className="w-6 h-6 text-brand-500" />;
      case 'layers':
      case 'fabric':
        return <Layers className="w-6 h-6 text-brand-500" />;
      case 'workflow':
      case 'automate':
      case 'rpa':
        return <Workflow className="w-6 h-6 text-brand-500" />;
      case 'bot':
      case 'copilot':
      case 'apps':
        return <Bot className="w-6 h-6 text-brand-500" />;
      case 'filespreadsheet':
      case 'ba':
      case 'requirements':
      default:
        return <FileSpreadsheet className="w-6 h-6 text-brand-500" />;
    }
  };

  return (
    <section id="services" className="py-20 md:py-28 relative border-t border-slate-200/80 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-950/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-brand-50 dark:bg-brand-950/40 text-brand-700 dark:text-brand-300 border border-brand-200 dark:border-brand-800/80">
              <Sparkles className="w-3.5 h-3.5 text-brand-500" />
              <span>Services & Expertise</span>
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
              How I Can Help Your Team
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base max-w-2xl">
              From requirement definition and data engineering to interactive Power BI dashboards, Copilot Studio agents, and RPA workflows.
            </p>
          </div>

          <Link
            href="#contact"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold bg-brand-600 hover:bg-brand-700 text-white shadow-sm transition-all self-start md:self-auto group focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
          >
            <span>Let's Talk</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        {/* 6 Services Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div
              key={service.id || index}
              className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800/90 bg-white dark:bg-slate-900/60 shadow-xs hover:border-brand-500/50 hover:shadow-md transition-all group flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-brand-50 dark:bg-brand-950/60 border border-brand-200/60 dark:border-brand-900/60 flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
                  {getIcon(service.icon)}
                </div>
                <h3 className="font-heading text-lg font-bold text-slate-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                  {service.title}
                </h3>
                <p className="mt-2.5 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {service.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800/60 flex items-center justify-between text-xs font-medium text-slate-500 dark:text-slate-400">
                <span>0{index + 1}</span>
                <Link
                  href="#contact"
                  className="inline-flex items-center gap-1 text-brand-600 dark:text-brand-400 hover:underline group-hover:translate-x-0.5 transition-transform"
                >
                  <span>Inquire</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
