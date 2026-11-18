# Shivkanya Byale - Portfolio Website

> Dynamic personal portfolio website for **Shivkanya Byale**, Power BI Developer, Power Platform Developer & Microsoft Fabric Consultant. Designed specifically for recruiters, hiring managers, and prospective enterprise consulting clients.

---

## 🚀 Tech Stack

- **Framework**: [Next.js 14 (App Router)](https://nextjs.org/) + TypeScript
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) + `@tailwindcss/typography`
- **Database & Auth**: [Supabase](https://supabase.com/) (PostgreSQL with Row-Level Security, Auth, and Storage)
- **Theme**: `next-themes` (light/dark mode toggle, defaulting to system preference)
- **Icons**: [Lucide React](https://lucide.dev/)
- **SEO & Social**: Next.js Metadata API, dynamic Open Graph cards, sitemap (`/sitemap.xml`), and robots (`/robots.txt`)
- **Analytics**: Privacy-friendly Vercel Analytics (zero cookie banners required)
- **Deployment**: [Vercel](https://vercel.com/) with custom domain support

---

## 📋 Verified Facts & Architecture Standards

1. **Strict Content Compliance**: All metrics and facts are strictly sourced from verified career history:
   - **Certification**: Microsoft Certified: Fabric Analytics Engineer Associate (DP-600)
   - **Experience**: 3+ years experience
   - **Consolidated Solutions**: 5+ entities consolidated in one finance solution
   - **Unified Reports**: 10+ finance reports unified
2. **Strict Anonymization**: No client names or proprietary internal software names appear anywhere. Anonymized placeholders are used (e.g., *"a banking client"*, *"a core banking software"*).
3. **Dual-Mode Data Layer**: Built with a zero-configuration fallback layer (`lib/data/fallback-data.ts`). The website runs instantly out of the box even before connecting Supabase, and switches to live Supabase PostgreSQL as soon as environment variables are added.

---

## 🛠️ Local Development Quickstart

### Option A: One-Click Batch Scripts (Windows)
We provide simple `.bat` scripts in the root folder for instant setup and execution:
- **`setup.bat`**: Detects Node.js, sets up `.env.local` if needed, and installs all dependencies (`npm install`).
- **`start.bat`**: Launches the local Next.js development server and opens `http://localhost:3000` automatically in your default browser.
- **`stop.bat`**: Safely finds and stops the dev server process running on port 3000.

---

### Option B: Command Line (All Platforms)

#### Prerequisites
- Node.js 18.17+ or 20+ (tested on Node 20.18.0 LTS)
- npm or pnpm

#### 1. Clone & Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables
Copy the sample environment file:
```bash
cp .env.example .env.local
```

If you don't have Supabase credentials yet, you can leave them blank in `.env.local`. The site will run in local fallback mode with complete seeded data!

### 3. Start the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🗄️ Supabase Setup Guide (Free Tier)

### Step 1: Create a Free Supabase Project
1. Go to [Supabase.com](https://supabase.com/) and create a free account.
2. Click **"New project"**, name it (e.g. `shivkanya-portfolio`), set a secure database password, and choose your preferred region.

### Step 2: Execute the Database Schema & RLS Policies
1. In your Supabase dashboard, click on the **SQL Editor** tab on the left sidebar.
2. Click **"New Query"**.
3. Open [`supabase/schema.sql`](./supabase/schema.sql) in this repository, copy its entire contents, paste it into the SQL Editor, and click **"Run"**.
4. This script automatically sets up:
   - All 12 tables (`profiles`, `key_metrics`, `services`, `work_steps`, `skill_groups`, `skills`, `experience`, `education`, `projects`, `certifications`, `testimonials`, `resume_files`, `contact_messages`)
   - Strict **Row Level Security (RLS)** policies: Public visitors can only READ published rows; only authenticated admins can insert/update/delete.
   - Storage buckets (`portfolio-media`, `resumes`) with public read access and authenticated write access.
   - Verified seed data for all sections and the 4 projects (3 published + 1 draft for Banking RPA).

### Step 3: Create the Admin User in Supabase Auth
1. Go to **Authentication** -> **Users** in your Supabase dashboard.
2. Click **"Add user"** -> **"Create user"**.
3. Enter your email (e.g., `shivkanya.byale@gmail.com`) and choose a strong password.
4. Toggle **"Auto Confirm User?"** to `ON` and click **"Create user"**.
5. You can now use these credentials to log in at `/admin`.

### Step 4: Add Supabase API Keys to Environment Variables
In your Supabase project:
1. Go to **Project Settings** -> **API**.
2. Copy the **Project URL** and the **anon (public)** key.
3. Update your `.env.local` (and Vercel environment variables):
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

---

## 🚀 Deploying to Vercel

1. Push your repository to **GitHub** / GitLab.
2. Sign in to [Vercel](https://vercel.com/) and click **"Add New..."** -> **"Project"**.
3. Import your GitHub repository.
4. In the **Environment Variables** section, add:
   - `NEXT_PUBLIC_SITE_URL`: `https://yourdomain.com` (or your Vercel preview domain)
   - `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your Supabase anon key
   - `RESEND_API_KEY`: *(Optional)* If you wish to receive contact form emails directly
   - `CONTACT_NOTIFICATION_EMAIL`: *(Optional)* Your recipient email address
5. Click **"Deploy"**. Your site will build and be live in under 60 seconds!

---

## 🌐 Connecting a Custom Domain

1. In your Vercel Project Dashboard, go to **Settings** -> **Domains**.
2. Enter your custom domain (e.g., `shivkanyabyale.com` or `portfolio.shivkanyabyale.com`) and click **Add**.
3. Add the suggested DNS records to your domain registrar (GoDaddy, Namecheap, Cloudflare, etc.):
   - **For Apex Domain (`shivkanyabyale.com`)**:
     - Type: `A`
     - Name: `@`
     - Value: `76.76.21.21`
   - **For Subdomain (`www` or `portfolio`)**:
     - Type: `CNAME`
     - Name: `www`
     - Value: `cname.vercel-dns.com`
4. Vercel automatically provisions free, auto-renewing SSL/TLS certificates.

---

## 📖 Guides & Documentation

- **[DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)**: **First-time deployment guide** with step-by-step instructions for creating your free Supabase database, pushing to GitHub, deploying on Vercel, and connecting a custom domain.
- **[ADMIN_GUIDE.md](./ADMIN_GUIDE.md)**: Visual walkthrough for managing content from the admin panel (`/admin`), adding/editing case studies, previewing drafts, and updating profile information.
- **[PLACEHOLDERS.md](./PLACEHOLDERS.md)**: Checklist of all remaining placeholder items (contact email, Banking RPA draft details, Techknomatic time-saved metric) to complete before public launch.

---

## 📄 License
Private Personal Portfolio © Shivkanya Byale. All rights reserved.
