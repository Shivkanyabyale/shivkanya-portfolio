import Link from 'next/link';
import { Linkedin, Mail, MapPin, Award } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-[#070b14]/50 backdrop-blur-sm no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">
          {/* Column 1: Monogram & Bio snippet */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-500 to-sky-700 flex items-center justify-center text-white font-bold text-sm shadow-sm">
                SB
              </div>
              <span className="font-heading font-semibold text-base text-slate-900 dark:text-white">
                Shivkanya Byale
              </span>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400 max-w-md leading-relaxed">
              Power BI Developer | Power Platform Developer | Microsoft Fabric Consultant. Turning complex enterprise
              data into actionable executive dashboards, scalable data models, and automated business workflows.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium bg-brand-50 dark:bg-brand-950/40 text-brand-700 dark:text-brand-300 border border-brand-200 dark:border-brand-800">
              <Award className="w-3.5 h-3.5 text-brand-500" />
              <span>Microsoft Certified: Fabric Analytics Engineer Associate (DP-600)</span>
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div>
            <h4 className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-4">
              Explore
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/#about" className="text-slate-600 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/#services" className="text-slate-600 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/#skills" className="text-slate-600 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
                  Skills
                </Link>
              </li>
              <li>
                <Link href="/#experience" className="text-slate-600 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
                  Experience
                </Link>
              </li>
              <li>
                <Link href="/#projects" className="text-slate-600 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
                  Projects
                </Link>
              </li>
              <li>
                <Link href="/resume" className="text-slate-600 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
                  Printable Resume
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact & Location */}
          <div>
            <h4 className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-4">
              Connect
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                <MapPin className="w-4 h-4 text-brand-500 shrink-0" />
                <span>Pune, India</span>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/shivkanya-byale/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
                >
                  <Linkedin className="w-4 h-4 text-brand-500 shrink-0" />
                  <span>LinkedIn Profile</span>
                </a>
              </li>
              <li>
                <Link
                  href="/#contact"
                  className="flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
                >
                  <Mail className="w-4 h-4 text-brand-500 shrink-0" />
                  <span>Send a Message</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
          <p>© {currentYear} Shivkanya Byale. All rights reserved.</p>
          <p className="text-center sm:text-right">
            Clean, privacy-first analytics • Built with Next.js & Supabase
          </p>
        </div>
      </div>
    </footer>
  );
}
