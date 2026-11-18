import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { getResumeFiles } from '@/lib/supabase/data-service';
import { Analytics } from '@vercel/analytics/react';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://shivkanyabyale.com'),
  title: {
    default: 'Shivkanya Byale | Power BI Developer & Microsoft Fabric Consultant',
    template: '%s | Shivkanya Byale',
  },
  description:
    'Shivkanya Byale is a Power BI Developer, Power Platform Developer & Microsoft Fabric Consultant (DP-600 certified) with 3+ years experience turning complex enterprise data into executive dashboards, financial consolidation models, and automated business workflows.',
  keywords: [
    'Power BI Developer',
    'Microsoft Fabric Consultant',
    'Power Platform Developer',
    'Business Analyst',
    'Fabric Analyst',
    'DAX',
    'Power Automate RPA',
    'Pune',
    'DP-600',
    'Financial Consolidation Dashboards',
  ],
  authors: [{ name: 'Shivkanya Byale' }],
  creator: 'Shivkanya Byale',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://shivkanyabyale.com',
    siteName: 'Shivkanya Byale Portfolio',
    title: 'Shivkanya Byale | Power BI Developer & Microsoft Fabric Consultant',
    description:
      'I turn complex business data into dashboards, automation and decisions leaders can act on. Microsoft Certified: Fabric Analytics Engineer Associate (DP-600).',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Shivkanya Byale - Power BI & Microsoft Fabric Consultant',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Shivkanya Byale | Power BI Developer & Microsoft Fabric Consultant',
    description:
      'I turn complex business data into dashboards, automation and decisions leaders can act on.',
  },
  icons: {
    icon: '/favicon.ico',
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const resumeFiles = await getResumeFiles();

  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen flex flex-col font-sans">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <Navbar resumeFiles={resumeFiles} />
          <div className="flex-1">{children}</div>
          <Footer />
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
