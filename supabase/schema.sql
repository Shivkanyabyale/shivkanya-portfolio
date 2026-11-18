-- ==============================================================================
-- SHIVKANYA BYALE PORTFOLIO DATABASE SCHEMA & RLS POLICIES
-- Target: Supabase (PostgreSQL 15+)
-- Description: Dynamic personal portfolio schema, RLS policies, storage config,
--              and seed data with verified facts and draft placeholders.
-- ==============================================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. TABLES

-- 2.1 Profiles / Bio Configuration
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name TEXT NOT NULL DEFAULT 'Shivkanya Byale',
    headline TEXT NOT NULL DEFAULT 'Power BI Developer | Power Platform Developer | Microsoft Fabric Consultant',
    value_statement TEXT NOT NULL DEFAULT 'I turn complex business data into dashboards, automation and decisions leaders can act on.',
    about_p1 TEXT NOT NULL DEFAULT 'About 3 years of experience across finance, procurement, sales, B2B supply chain, logistics, transportation, manufacturing, banking and reconciliation.',
    about_p2 TEXT NOT NULL DEFAULT 'Started as a Business Analyst and Power BI Developer, now a Consultant building Power BI solutions plus Power Platform solutions (Power Automate cloud and Desktop, Power Apps, Copilot Studio) and RPA with Python. Data modeling is my favourite part of the work.',
    currently_learning TEXT NOT NULL DEFAULT '[PLACEHOLDER: Microsoft Fabric Lakehouse pipelines & Copilot Studio agents]',
    email TEXT NOT NULL DEFAULT '[PLACEHOLDER]',
    location TEXT NOT NULL DEFAULT 'Pune, India',
    linkedin_url TEXT NOT NULL DEFAULT 'https://www.linkedin.com/in/shivkanya-byale/',
    closing_statement TEXT NOT NULL DEFAULT 'Open to Power BI Developer, Power Platform Developer, Business Analyst, Fabric Analyst and Consulting roles.',
    primary_resume_url TEXT,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2.2 Key Numbers Strip (Strictly 4 verified facts)
CREATE TABLE IF NOT EXISTS public.key_metrics (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    metric_value TEXT NOT NULL,
    metric_label TEXT NOT NULL,
    sort_order INT NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2.3 Services Cards
CREATE TABLE IF NOT EXISTS public.services (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    icon TEXT NOT NULL DEFAULT 'BarChart3',
    sort_order INT NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2.4 How I Work (5-step strip)
CREATE TABLE IF NOT EXISTS public.work_steps (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    step_number INT NOT NULL,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    sort_order INT NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2.5 Skill Groups & Skills
CREATE TABLE IF NOT EXISTS public.skill_groups (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL UNIQUE,
    sort_order INT NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.skills (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    group_id UUID NOT NULL REFERENCES public.skill_groups(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    filter_key TEXT,
    sort_order INT NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2.6 Experience Timeline (Years only, no months)
CREATE TABLE IF NOT EXISTS public.experience (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    role TEXT NOT NULL,
    company TEXT NOT NULL,
    location TEXT NOT NULL,
    start_year TEXT NOT NULL,
    end_year TEXT NOT NULL,
    is_current BOOLEAN DEFAULT FALSE,
    description TEXT NOT NULL,
    highlights JSONB DEFAULT '[]'::jsonb,
    sort_order INT NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2.7 Education
CREATE TABLE IF NOT EXISTS public.education (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    degree TEXT NOT NULL,
    institution TEXT NOT NULL,
    location TEXT NOT NULL,
    score TEXT NOT NULL,
    details TEXT,
    sort_order INT NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2.8 Projects (Dynamic CRUD with 10 sections)
CREATE TABLE IF NOT EXISTS public.projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    domain TEXT NOT NULL,
    summary TEXT NOT NULL,
    overview TEXT NOT NULL,
    problem TEXT NOT NULL,
    solution TEXT NOT NULL,
    key_features JSONB NOT NULL DEFAULT '[]'::jsonb,
    responsibilities JSONB NOT NULL DEFAULT '[]'::jsonb,
    tech_stack JSONB NOT NULL DEFAULT '[]'::jsonb,
    outcome JSONB DEFAULT '[]'::jsonb,
    live_demo_url TEXT,
    cover_image TEXT,
    gallery_images JSONB DEFAULT '[]'::jsonb,
    status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('published', 'draft')),
    is_featured BOOLEAN NOT NULL DEFAULT FALSE,
    sort_order INT NOT NULL DEFAULT 0,
    views_count INT NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2.9 Certifications
CREATE TABLE IF NOT EXISTS public.certifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    issuer TEXT NOT NULL,
    issue_year TEXT NOT NULL,
    credential_url TEXT,
    badge_image TEXT,
    is_published BOOLEAN NOT NULL DEFAULT TRUE,
    sort_order INT NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2.10 Testimonials (Hidden by default until published)
CREATE TABLE IF NOT EXISTS public.testimonials (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    client_name TEXT NOT NULL,
    client_role TEXT NOT NULL,
    company TEXT,
    quote TEXT NOT NULL,
    is_published BOOLEAN NOT NULL DEFAULT FALSE,
    sort_order INT NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2.11 Resume Files (Multi-version resume management)
CREATE TABLE IF NOT EXISTS public.resume_files (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    label TEXT NOT NULL,
    file_url TEXT NOT NULL,
    is_primary BOOLEAN NOT NULL DEFAULT FALSE,
    sort_order INT NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2.12 Contact Messages / Inquiries
CREATE TABLE IF NOT EXISTS public.contact_messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    sender_name TEXT NOT NULL,
    sender_email TEXT NOT NULL,
    subject TEXT,
    message TEXT NOT NULL,
    is_read BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==============================================================================
-- 3. ROW LEVEL SECURITY (RLS) POLICIES
-- Rule: Public can only READ published rows; authenticated admin has full access.
-- ==============================================================================

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.key_metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.work_steps ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skill_groups ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.experience ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.education ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.certifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.resume_files ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

-- 3.1 Profiles RLS
CREATE POLICY "Public profiles read" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Admin profiles update" ON public.profiles FOR ALL USING (auth.role() = 'authenticated');

-- 3.2 Key Metrics RLS
CREATE POLICY "Public key_metrics read" ON public.key_metrics FOR SELECT USING (true);
CREATE POLICY "Admin key_metrics modify" ON public.key_metrics FOR ALL USING (auth.role() = 'authenticated');

-- 3.3 Services RLS
CREATE POLICY "Public services read" ON public.services FOR SELECT USING (true);
CREATE POLICY "Admin services modify" ON public.services FOR ALL USING (auth.role() = 'authenticated');

-- 3.4 Work Steps RLS
CREATE POLICY "Public work_steps read" ON public.work_steps FOR SELECT USING (true);
CREATE POLICY "Admin work_steps modify" ON public.work_steps FOR ALL USING (auth.role() = 'authenticated');

-- 3.5 Skills & Groups RLS
CREATE POLICY "Public skill_groups read" ON public.skill_groups FOR SELECT USING (true);
CREATE POLICY "Admin skill_groups modify" ON public.skill_groups FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Public skills read" ON public.skills FOR SELECT USING (true);
CREATE POLICY "Admin skills modify" ON public.skills FOR ALL USING (auth.role() = 'authenticated');

-- 3.6 Experience & Education RLS
CREATE POLICY "Public experience read" ON public.experience FOR SELECT USING (true);
CREATE POLICY "Admin experience modify" ON public.experience FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Public education read" ON public.education FOR SELECT USING (true);
CREATE POLICY "Admin education modify" ON public.education FOR ALL USING (auth.role() = 'authenticated');

-- 3.7 Projects RLS
-- Public can only view published projects. Authenticated admin can view and modify all.
CREATE POLICY "Public projects read published" ON public.projects FOR SELECT
    USING (status = 'published' OR auth.role() = 'authenticated');
CREATE POLICY "Admin projects modify" ON public.projects FOR ALL
    USING (auth.role() = 'authenticated');

-- 3.8 Certifications RLS
CREATE POLICY "Public certifications read" ON public.certifications FOR SELECT
    USING (is_published = true OR auth.role() = 'authenticated');
CREATE POLICY "Admin certifications modify" ON public.certifications FOR ALL
    USING (auth.role() = 'authenticated');

-- 3.9 Testimonials RLS
-- Hidden by default; only published items are viewable by public
CREATE POLICY "Public testimonials read published" ON public.testimonials FOR SELECT
    USING (is_published = true OR auth.role() = 'authenticated');
CREATE POLICY "Admin testimonials modify" ON public.testimonials FOR ALL
    USING (auth.role() = 'authenticated');

-- 3.10 Resume Files RLS
CREATE POLICY "Public resume_files read" ON public.resume_files FOR SELECT USING (true);
CREATE POLICY "Admin resume_files modify" ON public.resume_files FOR ALL USING (auth.role() = 'authenticated');

-- 3.11 Contact Messages RLS
-- Public can INSERT contact messages (submission); only authenticated admin can view/manage
CREATE POLICY "Public contact insert" ON public.contact_messages FOR INSERT WITH CHECK (true);
CREATE POLICY "Admin contact read and manage" ON public.contact_messages FOR ALL USING (auth.role() = 'authenticated');

-- ==============================================================================
-- 4. STORAGE BUCKETS (portfolio-media, resumes)
-- ==============================================================================
INSERT INTO storage.buckets (id, name, public)
VALUES ('portfolio-media', 'portfolio-media', true)
ON CONFLICT (id) DO NOTHING;

INSERT INTO storage.buckets (id, name, public)
VALUES ('resumes', 'resumes', true)
ON CONFLICT (id) DO NOTHING;

-- Storage Policies: Public can read, authenticated admin can upload/delete
CREATE POLICY "Public media bucket read" ON storage.objects FOR SELECT
    USING (bucket_id IN ('portfolio-media', 'resumes'));

CREATE POLICY "Admin media bucket insert" ON storage.objects FOR INSERT
    WITH CHECK (bucket_id IN ('portfolio-media', 'resumes') AND auth.role() = 'authenticated');

CREATE POLICY "Admin media bucket update" ON storage.objects FOR UPDATE
    USING (bucket_id IN ('portfolio-media', 'resumes') AND auth.role() = 'authenticated');

CREATE POLICY "Admin media bucket delete" ON storage.objects FOR DELETE
    USING (bucket_id IN ('portfolio-media', 'resumes') AND auth.role() = 'authenticated');

-- ==============================================================================
-- 5. SEED DATA (Only verified facts & exact seed records)
-- ==============================================================================

-- 5.1 Profile
INSERT INTO public.profiles (
    id, full_name, headline, value_statement, about_p1, about_p2, currently_learning, email, location, linkedin_url, closing_statement
) VALUES (
    '00000000-0000-0000-0000-000000000001',
    'Shivkanya Byale',
    'Power BI Developer | Power Platform Developer | Microsoft Fabric Consultant',
    'I turn complex business data into dashboards, automation and decisions leaders can act on.',
    'About 3 years of experience across finance, procurement, sales, B2B supply chain, logistics, transportation, manufacturing, banking and reconciliation.',
    'Started as a Business Analyst and Power BI Developer, now a Consultant building Power BI solutions plus Power Platform solutions (Power Automate cloud and Desktop, Power Apps, Copilot Studio) and RPA with Python. Data modeling is my favourite part of the work.',
    '[PLACEHOLDER: Microsoft Fabric & Copilot Studio]',
    '[PLACEHOLDER]',
    'Pune, India',
    'https://www.linkedin.com/in/shivkanya-byale/',
    'Open to Power BI Developer, Power Platform Developer, Business Analyst, Fabric Analyst and Consulting roles.'
) ON CONFLICT (id) DO NOTHING;

-- 5.2 Key Numbers Strip (Strictly these 4 verified facts)
INSERT INTO public.key_metrics (metric_value, metric_label, sort_order) VALUES
('3+', 'Years Experience', 1),
('5+', 'Entities Consolidated in One Finance Solution', 2),
('10+', 'Finance Reports Unified', 3),
('DP-600', 'Microsoft Fabric Certified', 4);

-- 5.3 Services (6 cards)
INSERT INTO public.services (title, description, icon, sort_order) VALUES
('Power BI Dashboards & Reporting', 'Interactive executive dashboards and operational reports engineered for clarity, speed, and actionable business insight.', 'BarChart3', 1),
('Data Modeling & Semantic Models', 'Robust Star and Snowflake schemas, high-performance DAX calculations, Row-Level Security (RLS), and scalable semantic models.', 'Database', 2),
('Microsoft Fabric Analytics', 'Modern unified analytics utilizing OneLake, Lakehouse architecture, and end-to-end Data Factory ETL pipelines.', 'Layers', 3),
('Power Automate & RPA', 'Automated cloud and desktop workflows combined with Python scripts to replace repetitive manual processes and extract core system data.', 'Workflow', 4),
('Power Apps & Copilot Studio', 'Custom business applications and intelligent conversational Copilot Studio agents integrated seamlessly into Microsoft 365.', 'Bot', 5),
('Business Analysis & Requirements', 'Bridging the gap between business stakeholders and technical execution with structured BRD/FSD, KPI definition, and gap analysis.', 'FileSpreadsheet', 6);

-- 5.4 How I Work (5 steps)
INSERT INTO public.work_steps (step_number, title, description, sort_order) VALUES
(1, 'Understand the business', 'Deep-dive into business context, stakeholder expectations, pain points, and current workflow bottlenecks.', 1),
(2, 'Define KPIs', 'Formulate clear, measurable indicators aligned with business goals and formalize requirement documentation (BRD/FSD).', 2),
(3, 'Model the data', 'Architect clean Star/Snowflake schemas, build resilient semantic models, and optimize relationships for lightning-fast queries.', 3),
(4, 'Build and automate', 'Develop intuitive interactive dashboards, configure DAX measures, and implement automated data pipelines and RPA workflows.', 4),
(5, 'Train and hand over', 'Deliver user training, document models, and provide smooth knowledge transfer for sustained adoption and self-service analytics.', 5);

-- 5.5 Skill Groups & Skills
DO $$
DECLARE
    bi_id UUID := gen_random_uuid();
    pp_id UUID := gen_random_uuid();
    de_id UUID := gen_random_uuid();
    dm_id UUID := gen_random_uuid();
    pt_id UUID := gen_random_uuid();
    ba_id UUID := gen_random_uuid();
BEGIN
    INSERT INTO public.skill_groups (id, name, sort_order) VALUES
    (bi_id, 'Business Intelligence', 1),
    (pp_id, 'Power Platform', 2),
    (de_id, 'Data Engineering', 3),
    (dm_id, 'Data Modeling', 4),
    (pt_id, 'Programming & Tools', 5),
    (ba_id, 'Business Analysis', 6);

    -- BI
    INSERT INTO public.skills (group_id, name, filter_key, sort_order) VALUES
    (bi_id, 'Power BI Desktop & Service', 'Power BI', 1),
    (bi_id, 'DAX', 'DAX', 2),
    (bi_id, 'Power Query (M)', 'Power Query', 3),
    (bi_id, 'KPIs', 'KPIs', 4),
    (bi_id, 'Executive Dashboards', 'Executive Dashboards', 5),
    (bi_id, 'Dataflows', 'Dataflows', 6),
    (bi_id, 'Semantic Models', 'Semantic Models', 7),
    (bi_id, 'RLS', 'RLS', 8),
    (bi_id, 'Incremental Refresh', 'Incremental Refresh', 9),
    (bi_id, 'Import & Direct Query', 'Direct Query', 10);

    -- Power Platform
    INSERT INTO public.skills (group_id, name, filter_key, sort_order) VALUES
    (pp_id, 'Power Automate (Cloud & Desktop)', 'Power Automate', 1),
    (pp_id, 'Power Apps', 'Power Apps', 2),
    (pp_id, 'Copilot Studio', 'Copilot Studio', 3),
    (pp_id, 'SharePoint', 'SharePoint', 4),
    (pp_id, 'API Integration', 'APIs', 5),
    (pp_id, 'RPA', 'RPA', 6);

    -- Data Engineering
    INSERT INTO public.skills (group_id, name, filter_key, sort_order) VALUES
    (de_id, 'Microsoft Fabric (Lakehouse, OneLake)', 'Microsoft Fabric', 1),
    (de_id, 'Data Pipelines', 'Data Pipelines', 2),
    (de_id, 'Data Factory', 'Data Factory', 3),
    (de_id, 'ETL', 'ETL', 4),
    (de_id, 'Data Quality', 'Data Quality', 5);

    -- Data Modeling
    INSERT INTO public.skills (group_id, name, filter_key, sort_order) VALUES
    (dm_id, 'Star Schema', 'Star Schema', 1),
    (dm_id, 'Snowflake Schema', 'Snowflake', 2),
    (dm_id, 'Fact/Dimension Modeling', 'Data Modeling', 3),
    (dm_id, 'Performance Optimization', 'Performance Optimization', 4);

    -- Programming & Tools
    INSERT INTO public.skills (group_id, name, filter_key, sort_order) VALUES
    (pt_id, 'SQL', 'SQL', 1),
    (pt_id, 'Python', 'Python', 2),
    (pt_id, 'PostgreSQL', 'PostgreSQL', 3),
    (pt_id, 'SQL Server', 'SQL Server', 4),
    (pt_id, 'SSMS', 'SSMS', 5),
    (pt_id, 'SAP', 'SAP', 6),
    (pt_id, 'Excel', 'Excel', 7);

    -- Business Analysis
    INSERT INTO public.skills (group_id, name, filter_key, sort_order) VALUES
    (ba_id, 'Requirement Gathering', 'Requirements', 1),
    (ba_id, 'BRD/FSD Documentation', 'BRD/FSD', 2),
    (ba_id, 'KPI Definition', 'KPI Definition', 3),
    (ba_id, 'Gap Analysis', 'Gap Analysis', 4),
    (ba_id, 'Stakeholder Management', 'Stakeholder Management', 5);
END $$;

-- 5.6 Experience Timeline (Years only, no months)
INSERT INTO public.experience (role, company, location, start_year, end_year, is_current, description, highlights, sort_order) VALUES
(
    'Consultant',
    'Techknomatic Services Pvt Ltd',
    'Pune',
    '2026',
    'Present',
    true,
    'Power BI and Power Platform consultant delivering analytics and automation for enterprise clients, including banking.',
    '["Built RPA bots with Power Automate Desktop, cloud flows and Python, including an automated workflow that extracts data from a core banking system, processes it with Python and batch scripts, and sends condition-based email alerts.", "Integrated third-party and internal APIs with Power Platform.", "Developed Copilot Studio agents integrated across Microsoft platforms.", "[PLACEHOLDER: time saved / number of bots]"]'::jsonb,
    1
),
(
    'Business Analyst | Power BI Lead',
    'JHS & Associates LLP',
    'Pune',
    '2024',
    '2026',
    false,
    'Led analytics and automation initiatives across multiple client domains including B2B sales, reconciliation, delivery apps, finance, and procurement analytics.',
    '["Led projects and a team delivering end-to-end Power BI solutions across B2B sales, reconciliation, delivery apps, finance, and procurement analytics.", "Received Certificate of Appreciation for exemplary project leadership and client delivery excellence."]'::jsonb,
    2
),
(
    'Business Analyst',
    'Dhaval D Thakkar & Co.',
    'Pune',
    '2023',
    '2024',
    false,
    'Delivered sales analytics, reconciliation pipelines, and business productivity automations.',
    '["Developed executive sales dashboards in Power BI.", "Engineered Python-based reconciliations across e-commerce marketplaces.", "Created Power Automate flows and Power Apps for automated business workflows.", "Built and deployed SharePoint-based CRM modules."]'::jsonb,
    3
);

-- 5.7 Education
INSERT INTO public.education (degree, institution, location, score, details, sort_order) VALUES
(
    'B.E. in Engineering',
    'Modern Education Society''s College of Engineering',
    'Pune',
    'CGPA 8.9',
    'Undergraduate engineering degree with strong foundation in analytical problem-solving, computing, and quantitative analysis.',
    1
),
(
    'HSC (Higher Secondary Certificate)',
    'Maharashtra State Board',
    'Maharashtra',
    '69.7%',
    'Science stream coursework in Mathematics, Physics, and Chemistry.',
    2
),
(
    'SSC (Secondary School Certificate)',
    'Maharashtra State Board',
    'Maharashtra',
    '94.3%',
    'Secondary education completed with distinction.',
    3
);

-- 5.8 Certifications
INSERT INTO public.certifications (name, issuer, issue_year, credential_url, badge_image, is_published, sort_order) VALUES
(
    'Microsoft Certified: Fabric Analytics Engineer Associate (DP-600)',
    'Microsoft',
    '2024',
    'https://learn.microsoft.com/en-us/users/shivkanyabyale/credentials',
    '/images/badges/dp-600.png',
    true,
    1
);

-- 5.9 Projects (4 Seed Projects: 3 Published, 1 Draft)
-- Project A: Business Performance Analytics Dashboard
INSERT INTO public.projects (
    title, slug, domain, summary, overview, problem, solution,
    key_features, responsibilities, tech_stack, outcome, live_demo_url, status, is_featured, sort_order
) VALUES (
    'Business Performance Analytics Dashboard',
    'business-performance-analytics-dashboard',
    'Quick-Commerce / Logistics',
    'End-to-end performance intelligence dashboard tracking revenue, customer retention, partner delivery times, and peak-hour ordering dynamics.',
    'A unified analytics solution designed for a fast-paced quick-commerce and logistics operator to monitor sales velocity, customer lifecycle drop-offs, and operational bottlenecks across dense urban hubs.',
    'The operational leadership lacked real-time visibility into peak-hour order surges, rider fulfillment delays, and cohort-level customer retention patterns, causing missed SLA targets and sub-optimal fleet allocation.',
    'Architected a multi-page Power BI dashboard connected to PostgreSQL data pipelines, implementing advanced DAX calculations for period-over-period comparisons, customer churn analysis, and fleet utilization matrices.',
    '["Revenue and order trends with dynamic period-over-period (PoP) comparison", "Customer growth, retention cohorts, and drop-off funnel analytics", "Partner delivery performance tracking and pick-hour density heatmaps", "Interactive drill-through by geographic territory and fulfillment hub"]'::jsonb,
    '["Requirement gathering and stakeholder alignment with operations heads", "KPI identification and metric governance", "Data modeling in Star schema from normalized PostgreSQL tables", "Complex DAX measures for period-over-period calculations and retention metrics", "Deployment to Power BI Service with scheduled refresh and stakeholder enablement"]'::jsonb,
    '["Power BI", "PostgreSQL", "DAX", "Power Query", "Star Schema"]'::jsonb,
    '["Empowered operational leadership with clear visibility into pick-hour volume spikes", "Enabled targeted retention strategies by isolating customer drop-off milestones", "Reduced manual reporting overhead across territory operations teams"]'::jsonb,
    NULL,
    'published',
    true,
    1
);

-- Project B: Multi-Entity Consolidated Finance Analytics
INSERT INTO public.projects (
    title, slug, domain, summary, overview, problem, solution,
    key_features, responsibilities, tech_stack, outcome, live_demo_url, status, is_featured, sort_order
) VALUES (
    'Multi-Entity Consolidated Finance Analytics',
    'multi-entity-consolidated-finance-analytics',
    'Finance',
    'Unified global financial reporting suite consolidating 5+ international entities into multi-currency P&L, Balance Sheet, and Trial Balance analytics.',
    'A comprehensive financial consolidation analytics solution unifying 10+ financial reports across a group of 5+ corporate entities operating in multiple countries.',
    'Financial statements were fragmented across disparate ERP systems and spreadsheet templates. Consolidating cross-border intercompany transactions, local currencies, and audit-ready trial balances required days of high-risk manual reconciliation each month.',
    'Engineered an enterprise financial semantic model ingesting data from SAP and Excel workbooks, automating intercompany eliminations and multi-currency conversion to consolidated INR, with drill-down from executive summary to transaction vouchers.',
    '["Multi-layer P&L from high-level board summary down to voucher-level transactions", "Balance Sheet, General Ledger (GL), and Trial Balance interactive drill-down", "Revenue segmentation by customer, intercompany transactions, and operating entity", "Vendor-level purchase and expense analysis separating domestic vs. international vendors", "Dual-currency views with local operating currency toggle and consolidated INR reporting", "Automated intercompany transaction handling and elimination logic"]'::jsonb,
    '["Mapped financial chart of accounts across 5+ international entities", "Designed resilient data model integrating SAP extracts and structured Excel sources", "Authored robust DAX logic for intercompany eliminations and currency conversions", "Implemented strict Row-Level Security (RLS) according to entity access boundaries", "Conducted comprehensive training sessions for finance and leadership teams"]'::jsonb,
    '["Power BI", "SAP", "Excel", "DAX", "Power Query", "Financial Modeling", "RLS"]'::jsonb,
    '["Successfully unified 10+ standalone finance reports into a single trusted source of truth", "Consolidated 5+ international entities with automated INR conversion and intercompany eliminations", "Significantly streamlined the month-end financial reporting and reconciliation lifecycle"]'::jsonb,
    NULL,
    'published',
    true,
    2
);

-- Project C: Procurement Performance & Spend Analytics
INSERT INTO public.projects (
    title, slug, domain, summary, overview, problem, solution,
    key_features, responsibilities, tech_stack, outcome, live_demo_url, status, is_featured, sort_order
) VALUES (
    'Procurement Performance & Spend Analytics',
    'procurement-performance-spend-analytics',
    'Procurement & Supply Chain',
    'Full-lifecycle procurement intelligence tracking Purchase Indents through GRN, vendor reliability, spend variance, and PO aging.',
    'An end-to-end procurement and supply chain analytics solution monitoring the complete purchase lifecycle from initial requirement generation to goods receipt and payment processing.',
    'The supply chain team struggled with visibility across disconnected stages (Indents, POs, GRN, Invoices, Inventory). Lack of vendor performance benchmarks and untracked aging purchase orders resulted in material stockouts and unplanned cost variations.',
    'Developed a centralized Power BI analytics dashboard integrated with REST APIs and inventory registers, providing real-time visibility into requirement-to-procurement gaps, vendor lead times, and open PO aging brackets.',
    '["Full lifecycle visibility across Purchase Indents, POs, Goods Receipt Notes (GRN), Invoices, and Inventory registers", "Requirement vs. procurement gap analysis preventing stockouts and over-ordering", "Period-over-period inventory holding and turnover analysis", "Vendor scorecards evaluating on-time delivery rate, lead time, rejection percentage, average pricing, and overall reliability", "Open PO monitoring categorized by aging brackets"]'::jsonb,
    '["Conducted detailed stakeholder requirement sessions with procurement leads", "Connected Power BI to internal procurement APIs and structured registers", "Architected dimensional model connecting supply chain stages", "Formulated custom DAX measures for vendor scorecard metrics and lead time variance", "Trained buyers and supply chain managers on self-service drill-downs"]'::jsonb,
    '["Power BI", "APIs", "Excel", "DAX", "Power Query", "Supply Chain Analytics"]'::jsonb,
    '["Provided end-to-end transparency across the entire purchasing and fulfillment cycle", "Enabled data-backed vendor contract negotiations using objective performance scorecards", "Surfaced aging open POs early to avoid delivery disruptions and production downtime"]'::jsonb,
    NULL,
    'published',
    true,
    3
);

-- Project D: Banking Process Automation (RPA) - SEEDED AS DRAFT
INSERT INTO public.projects (
    title, slug, domain, summary, overview, problem, solution,
    key_features, responsibilities, tech_stack, outcome, live_demo_url, status, is_featured, sort_order
) VALUES (
    'Banking Process Automation (RPA)',
    'banking-process-automation-rpa',
    'Banking',
    'Automated extraction, processing, and alerting pipeline connecting core banking systems with Python, batch scripts, and Power Automate.',
    'An enterprise robotic process automation workflow developed for a banking client to eliminate high-volume manual data extraction from legacy core banking software and streamline alert dispatch.',
    '[PLACEHOLDER: Detailed description of the specific manual operational bottlenecks, core banking extraction hurdles, and reconciliation time constraints]',
    '[PLACEHOLDER: Detailed architecture of the Power Automate Desktop extraction sequence, Python transformation scripts, batch scheduling, and condition-based email dispatch]',
    '["Automated extraction sequence from a core banking system using Power Automate Desktop", "Intermediate data processing and validation powered by Python scripts and batch automation", "Condition-based trigger logic evaluating rules for real-time email alerting", "Multi-stage error logging and fallback notification mechanism", "[PLACEHOLDER: additional automation feature]"]'::jsonb,
    '["Automated workflow development combining Power Automate Desktop, Cloud Flows, and Python", "Batch script integration for scheduled unattended execution", "API integrations and secure credential handling", "[PLACEHOLDER: additional responsibilities]"]'::jsonb,
    '["Power Automate Desktop", "Power Automate", "Python", "Batch Scripts", "API Integration", "RPA"]'::jsonb,
    '["[PLACEHOLDER: Quantified metric, e.g. hours saved per week or percentage reduction in turnaround time]", "[PLACEHOLDER: Quantified volume, e.g. number of daily transactions or reports processed]", "[PLACEHOLDER: Accuracy improvement or SLA metric]"]'::jsonb,
    NULL,
    'draft', -- DRAFT: Kept hidden on public site until edited and published from admin
    false,
    4
);

-- 5.10 Resume Files Seed (Initial version labels)
INSERT INTO public.resume_files (title, label, file_url, is_primary, sort_order) VALUES
('Power BI Specialist Resume', 'Power BI Focus', '/resume.pdf', true, 1),
('Power Platform & RPA Resume', 'Power Platform Focus', '/resume.pdf', false, 2),
('Business Analyst & Consulting Resume', 'Business Analyst Focus', '/resume.pdf', false, 3),
('Complete Comprehensive CV', 'Complete CV', '/resume.pdf', false, 4);
