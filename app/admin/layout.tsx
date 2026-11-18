import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin CMS | Shivkanya Byale Portfolio',
  description: 'Content Management System for Shivkanya Byale Portfolio',
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col">
      {children}
    </div>
  );
}
