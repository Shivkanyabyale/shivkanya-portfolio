'use client';

import * as React from 'react';
import { Mail, Linkedin, MapPin, Send, CheckCircle2, AlertCircle, Sparkles } from 'lucide-react';
import { Profile } from '@/lib/types/portfolio';

interface ContactSectionProps {
  profile: Profile;
}

export function ContactSection({ profile }: ContactSectionProps) {
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    botField: '', // Honeypot field
  });

  const [status, setStatus] = React.useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 1. Honeypot spam check
    if (formData.botField) {
      console.warn('Spam submission filtered.');
      setStatus('success'); // Silently drop spam
      return;
    }

    if (!formData.name || !formData.email || !formData.message) {
      setErrorMessage('Please fill out all required fields.');
      setStatus('error');
      return;
    }

    setStatus('submitting');
    setErrorMessage(null);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
        }),
      });

      const json = await res.json();
      if (!res.ok) {
        throw new Error(json.error || 'Failed to send message.');
      }

      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '', botField: '' });
    } catch (err: any) {
      console.error(err);
      setStatus('error');
      setErrorMessage(err.message || 'An error occurred while sending your message.');
    }
  };

  const mailtoLink = `mailto:${
    profile.email && !profile.email.includes('[PLACEHOLDER') ? profile.email : 'contact@example.com'
  }?subject=Consulting%20Inquiry%20from%20Portfolio`;

  return (
    <section id="contact" className="py-20 md:py-28 relative border-t border-slate-200/80 dark:border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Column: Direct Links & Value Proposition */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-brand-50 dark:bg-brand-950/40 text-brand-700 dark:text-brand-300 border border-brand-200 dark:border-brand-800/80">
                <Mail className="w-3.5 h-3.5 text-brand-500" />
                <span>Get in Touch</span>
              </div>
              <h2 className="font-heading text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
                Let's Discuss Your Next Analytics Initiative
              </h2>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
                Whether you are looking to hire a seasoned Power BI Developer, Power Platform Specialist, or require end-to-end consulting for financial consolidation and Fabric Lakehouse architectures, I'd love to connect.
              </p>
            </div>

            {/* Direct Connect Details */}
            <div className="space-y-4 pt-2">
              <a
                href={profile.linkedinUrl || 'https://www.linkedin.com/in/shivkanya-byale/'}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3.5 p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 shadow-xs hover:border-brand-500/50 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all group"
              >
                <div className="w-10 h-10 rounded-lg bg-blue-50 dark:bg-blue-950/50 border border-blue-200/60 dark:border-blue-800/60 flex items-center justify-center text-[#0077b5] shrink-0 group-hover:scale-105 transition-transform">
                  <Linkedin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-heading text-sm font-bold text-slate-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                    LinkedIn Profile
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    linkedin.com/in/shivkanya-byale
                  </p>
                </div>
              </a>

              <div className="flex items-center gap-3.5 p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 shadow-xs">
                <div className="w-10 h-10 rounded-lg bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200/60 dark:border-emerald-800/60 flex items-center justify-center text-emerald-600 shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-heading text-sm font-bold text-slate-900 dark:text-white">
                    Location
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {profile.location || 'Pune, India'}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3.5 p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 shadow-xs">
                <div className="w-10 h-10 rounded-lg bg-purple-50 dark:bg-purple-950/50 border border-purple-200/60 dark:border-purple-800/60 flex items-center justify-center text-purple-600 shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-heading text-sm font-bold text-slate-900 dark:text-white">
                    Direct Email
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                    {profile.email || '[PLACEHOLDER]'}
                  </p>
                </div>
              </div>
            </div>

            {/* Exact Closing Line Requirement */}
            <div className="p-4 rounded-xl bg-brand-50/60 dark:bg-brand-950/30 border border-brand-200/60 dark:border-brand-900/50 text-xs sm:text-sm font-medium text-brand-900 dark:text-brand-200 leading-snug">
              {profile.closingStatement ||
                'Open to Power BI Developer, Power Platform Developer, Business Analyst, Fabric Analyst and Consulting roles.'}
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-slate-800/90 bg-white dark:bg-slate-900/70 shadow-sm relative">
              <h3 className="font-heading text-xl font-bold text-slate-900 dark:text-white mb-2">
                Send an Enquiry
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mb-6">
                Fill in the details below or use the{' '}
                <a href={mailtoLink} className="text-brand-600 dark:text-brand-400 underline font-medium">
                  mailto fallback link
                </a>{' '}
                if you prefer your own email client.
              </p>

              {status === 'success' ? (
                <div className="p-6 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 text-center space-y-3">
                  <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto" />
                  <h4 className="font-heading text-base font-bold text-emerald-900 dark:text-emerald-200">
                    Thank You! Message Received.
                  </h4>
                  <p className="text-xs sm:text-sm text-emerald-800 dark:text-emerald-300 max-w-md mx-auto">
                    Your inquiry has been successfully sent. I will review your requirements and respond shortly.
                  </p>
                  <button
                    type="button"
                    onClick={() => setStatus('idle')}
                    className="mt-3 px-4 py-2 rounded-lg text-xs font-semibold bg-emerald-600 text-white hover:bg-emerald-700 transition-colors"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Honeypot Field (Hidden from humans, traps bots) */}
                  <div className="hidden" aria-hidden="true">
                    <label htmlFor="botField">Leave this field blank</label>
                    <input
                      id="botField"
                      type="text"
                      name="botField"
                      value={formData.botField}
                      onChange={(e) => setFormData({ ...formData, botField: e.target.value })}
                      tabIndex={-1}
                      autoComplete="off"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5"
                      >
                        Your Name <span className="text-brand-500">*</span>
                      </label>
                      <input
                        id="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. John Doe"
                        className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800/80 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5"
                      >
                        Email Address <span className="text-brand-500">*</span>
                      </label>
                      <input
                        id="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="john@company.com"
                        className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800/80 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5"
                    >
                      Opportunity / Role Topic
                    </label>
                    <input
                      id="subject"
                      type="text"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="e.g. Power BI Developer Opportunity or Fabric Project"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800/80 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5"
                    >
                      Message Details <span className="text-brand-500">*</span>
                    </label>
                    <textarea
                      id="message"
                      rows={4}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Brief overview of your timeline, requirements, or role details..."
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800/80 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500 resize-y"
                    />
                  </div>

                  {status === 'error' && errorMessage && (
                    <div className="p-3 rounded-lg bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800/60 text-xs text-red-700 dark:text-red-300 flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold bg-brand-600 hover:bg-brand-700 disabled:opacity-70 text-white shadow-sm transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
                  >
                    {status === 'submitting' ? (
                      <span>Sending inquiry...</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
