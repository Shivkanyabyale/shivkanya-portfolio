import {
  Profile,
  KeyMetric,
  ServiceItem,
  WorkStep,
  SkillGroup,
  ExperienceItem,
  EducationItem,
  Project,
  Certification,
  Testimonial,
  ResumeFile
} from '../types/portfolio';

export const fallbackProfile: Profile = {
  id: '00000000-0000-0000-0000-000000000001',
  fullName: 'Shivkanya Byale',
  headline: 'Power BI Developer | Power Platform Developer | Microsoft Fabric Consultant',
  valueStatement: 'I turn complex business data into dashboards, automation and decisions leaders can act on.',
  aboutP1: 'About 3 years of experience across finance, procurement, sales, B2B supply chain, logistics, transportation, manufacturing, banking and reconciliation.',
  aboutP2: 'Started as a Business Analyst and Power BI Developer, now a Consultant building Power BI solutions plus Power Platform solutions (Power Automate cloud and Desktop, Power Apps, Copilot Studio) and RPA with Python. Data modeling is my favourite part of the work.',
  currentlyLearning: '[PLACEHOLDER: Microsoft Fabric Lakehouse pipelines & Copilot Studio agents]',
  email: '[PLACEHOLDER]',
  location: 'Pune, India',
  linkedinUrl: 'https://www.linkedin.com/in/shivkanya-byale/',
  closingStatement: 'Open to Power BI Developer, Power Platform Developer, Business Analyst, Fabric Analyst and Consulting roles.',
  primaryResumeUrl: '/resume.pdf'
};

export const fallbackKeyMetrics: KeyMetric[] = [
  { id: 'km-1', value: '3+', label: 'Years Experience', sortOrder: 1 },
  { id: 'km-2', value: '5+', label: 'Entities Consolidated in One Finance Solution', sortOrder: 2 },
  { id: 'km-3', value: '10+', label: 'Finance Reports Unified', sortOrder: 3 },
  { id: 'km-4', value: 'DP-600', label: 'Microsoft Fabric Certified', sortOrder: 4 }
];

export const fallbackServices: ServiceItem[] = [
  {
    id: 'srv-1',
    title: 'Power BI Dashboards & Reporting',
    description: 'Interactive executive dashboards and operational reports engineered for clarity, speed, and actionable business insight.',
    icon: 'BarChart3',
    sortOrder: 1
  },
  {
    id: 'srv-2',
    title: 'Data Modeling & Semantic Models',
    description: 'Robust Star and Snowflake schemas, high-performance DAX calculations, Row-Level Security (RLS), and scalable semantic models.',
    icon: 'Database',
    sortOrder: 2
  },
  {
    id: 'srv-3',
    title: 'Microsoft Fabric Analytics',
    description: 'Modern unified analytics utilizing OneLake, Lakehouse architecture, and end-to-end Data Factory ETL pipelines.',
    icon: 'Layers',
    sortOrder: 3
  },
  {
    id: 'srv-4',
    title: 'Power Automate & RPA',
    description: 'Automated cloud and desktop workflows combined with Python scripts to replace repetitive manual processes and extract core system data.',
    icon: 'Workflow',
    sortOrder: 4
  },
  {
    id: 'srv-5',
    title: 'Power Apps & Copilot Studio',
    description: 'Custom business applications and intelligent conversational Copilot Studio agents integrated seamlessly into Microsoft 365.',
    icon: 'Bot',
    sortOrder: 5
  },
  {
    id: 'srv-6',
    title: 'Business Analysis & Requirements',
    description: 'Bridging the gap between business stakeholders and technical execution with structured BRD/FSD, KPI definition, and gap analysis.',
    icon: 'FileSpreadsheet',
    sortOrder: 6
  }
];

export const fallbackWorkSteps: WorkStep[] = [
  {
    id: 'step-1',
    stepNumber: 1,
    title: 'Understand the business',
    description: 'Deep-dive into business context, stakeholder expectations, pain points, and current workflow bottlenecks.',
    sortOrder: 1
  },
  {
    id: 'step-2',
    stepNumber: 2,
    title: 'Define KPIs',
    description: 'Formulate clear, measurable indicators aligned with business goals and formalize requirement documentation (BRD/FSD).',
    sortOrder: 2
  },
  {
    id: 'step-3',
    stepNumber: 3,
    title: 'Model the data',
    description: 'Architect clean Star/Snowflake schemas, build resilient semantic models, and optimize relationships for lightning-fast queries.',
    sortOrder: 3
  },
  {
    id: 'step-4',
    stepNumber: 4,
    title: 'Build and automate',
    description: 'Develop intuitive interactive dashboards, configure DAX measures, and implement automated data pipelines and RPA workflows.',
    sortOrder: 4
  },
  {
    id: 'step-5',
    stepNumber: 5,
    title: 'Train and hand over',
    description: 'Deliver user training, document models, and provide smooth knowledge transfer for sustained adoption and self-service analytics.',
    sortOrder: 5
  }
];

export const fallbackSkillGroups: SkillGroup[] = [
  {
    id: 'grp-bi',
    name: 'Business Intelligence',
    sortOrder: 1,
    skills: [
      { id: 's-1', groupId: 'grp-bi', name: 'Power BI Desktop & Service', filterKey: 'Power BI', sortOrder: 1 },
      { id: 's-2', groupId: 'grp-bi', name: 'DAX', filterKey: 'DAX', sortOrder: 2 },
      { id: 's-3', groupId: 'grp-bi', name: 'Power Query (M)', filterKey: 'Power Query', sortOrder: 3 },
      { id: 's-4', groupId: 'grp-bi', name: 'KPIs', filterKey: 'KPIs', sortOrder: 4 },
      { id: 's-5', groupId: 'grp-bi', name: 'Executive Dashboards', filterKey: 'Executive Dashboards', sortOrder: 5 },
      { id: 's-6', groupId: 'grp-bi', name: 'Dataflows', filterKey: 'Dataflows', sortOrder: 6 },
      { id: 's-7', groupId: 'grp-bi', name: 'Semantic Models', filterKey: 'Semantic Models', sortOrder: 7 },
      { id: 's-8', groupId: 'grp-bi', name: 'RLS', filterKey: 'RLS', sortOrder: 8 },
      { id: 's-9', groupId: 'grp-bi', name: 'Incremental Refresh', filterKey: 'Incremental Refresh', sortOrder: 9 },
      { id: 's-10', groupId: 'grp-bi', name: 'Import & Direct Query', filterKey: 'Direct Query', sortOrder: 10 }
    ]
  },
  {
    id: 'grp-pp',
    name: 'Power Platform',
    sortOrder: 2,
    skills: [
      { id: 's-11', groupId: 'grp-pp', name: 'Power Automate (Cloud & Desktop)', filterKey: 'Power Automate', sortOrder: 1 },
      { id: 's-12', groupId: 'grp-pp', name: 'Power Apps', filterKey: 'Power Apps', sortOrder: 2 },
      { id: 's-13', groupId: 'grp-pp', name: 'Copilot Studio', filterKey: 'Copilot Studio', sortOrder: 3 },
      { id: 's-14', groupId: 'grp-pp', name: 'SharePoint', filterKey: 'SharePoint', sortOrder: 4 },
      { id: 's-15', groupId: 'grp-pp', name: 'API Integration', filterKey: 'APIs', sortOrder: 5 },
      { id: 's-16', groupId: 'grp-pp', name: 'RPA', filterKey: 'RPA', sortOrder: 6 }
    ]
  },
  {
    id: 'grp-de',
    name: 'Data Engineering',
    sortOrder: 3,
    skills: [
      { id: 's-17', groupId: 'grp-de', name: 'Microsoft Fabric (Lakehouse, OneLake)', filterKey: 'Microsoft Fabric', sortOrder: 1 },
      { id: 's-18', groupId: 'grp-de', name: 'Data Pipelines', filterKey: 'Data Pipelines', sortOrder: 2 },
      { id: 's-19', groupId: 'grp-de', name: 'Data Factory', filterKey: 'Data Factory', sortOrder: 3 },
      { id: 's-20', groupId: 'grp-de', name: 'ETL', filterKey: 'ETL', sortOrder: 4 },
      { id: 's-21', groupId: 'grp-de', name: 'Data Quality', filterKey: 'Data Quality', sortOrder: 5 }
    ]
  },
  {
    id: 'grp-dm',
    name: 'Data Modeling',
    sortOrder: 4,
    skills: [
      { id: 's-22', groupId: 'grp-dm', name: 'Star Schema', filterKey: 'Star Schema', sortOrder: 1 },
      { id: 's-23', groupId: 'grp-dm', name: 'Snowflake Schema', filterKey: 'Snowflake', sortOrder: 2 },
      { id: 's-24', groupId: 'grp-dm', name: 'Fact/Dimension Modeling', filterKey: 'Data Modeling', sortOrder: 3 },
      { id: 's-25', groupId: 'grp-dm', name: 'Performance Optimization', filterKey: 'Performance Optimization', sortOrder: 4 }
    ]
  },
  {
    id: 'grp-pt',
    name: 'Programming & Tools',
    sortOrder: 5,
    skills: [
      { id: 's-26', groupId: 'grp-pt', name: 'SQL', filterKey: 'SQL', sortOrder: 1 },
      { id: 's-27', groupId: 'grp-pt', name: 'Python', filterKey: 'Python', sortOrder: 2 },
      { id: 's-28', groupId: 'grp-pt', name: 'PostgreSQL', filterKey: 'PostgreSQL', sortOrder: 3 },
      { id: 's-29', groupId: 'grp-pt', name: 'SQL Server', filterKey: 'SQL Server', sortOrder: 4 },
      { id: 's-30', groupId: 'grp-pt', name: 'SSMS', filterKey: 'SSMS', sortOrder: 5 },
      { id: 's-31', groupId: 'grp-pt', name: 'SAP', filterKey: 'SAP', sortOrder: 6 },
      { id: 's-32', groupId: 'grp-pt', name: 'Excel', filterKey: 'Excel', sortOrder: 7 }
    ]
  },
  {
    id: 'grp-ba',
    name: 'Business Analysis',
    sortOrder: 6,
    skills: [
      { id: 's-33', groupId: 'grp-ba', name: 'Requirement Gathering', filterKey: 'Requirements', sortOrder: 1 },
      { id: 's-34', groupId: 'grp-ba', name: 'BRD/FSD Documentation', filterKey: 'BRD/FSD', sortOrder: 2 },
      { id: 's-35', groupId: 'grp-ba', name: 'KPI Definition', filterKey: 'KPI Definition', sortOrder: 3 },
      { id: 's-36', groupId: 'grp-ba', name: 'Gap Analysis', filterKey: 'Gap Analysis', sortOrder: 4 },
      { id: 's-37', groupId: 'grp-ba', name: 'Stakeholder Management', filterKey: 'Stakeholder Management', sortOrder: 5 }
    ]
  }
];

export const fallbackExperience: ExperienceItem[] = [
  {
    id: 'exp-1',
    role: 'Consultant',
    company: 'Techknomatic Services Pvt Ltd',
    location: 'Pune',
    startYear: '2026',
    endYear: 'Present',
    isCurrent: true,
    description: 'Power BI and Power Platform consultant delivering analytics and automation for enterprise clients, including banking.',
    highlights: [
      'Built RPA bots with Power Automate Desktop, cloud flows and Python, including an automated workflow that extracts data from a core banking system, processes it with Python and batch scripts, and sends condition-based email alerts.',
      'Integrated third-party and internal APIs with Power Platform.',
      'Developed Copilot Studio agents integrated across Microsoft platforms.',
      '[PLACEHOLDER: time saved / number of bots]'
    ],
    sortOrder: 1
  },
  {
    id: 'exp-2',
    role: 'Business Analyst | Power BI Lead',
    company: 'JHS & Associates LLP',
    location: 'Pune',
    startYear: '2024',
    endYear: '2026',
    isCurrent: false,
    description: 'Led analytics and automation initiatives across multiple client domains including B2B sales, reconciliation, delivery apps, finance, and procurement analytics.',
    highlights: [
      'Led projects and a team delivering end-to-end Power BI solutions across B2B sales, reconciliation, delivery apps, finance, and procurement analytics.',
      'Received Certificate of Appreciation for exemplary project leadership and client delivery excellence.'
    ],
    sortOrder: 2
  },
  {
    id: 'exp-3',
    role: 'Business Analyst',
    company: 'Dhaval D Thakkar & Co.',
    location: 'Pune',
    startYear: '2023',
    endYear: '2024',
    isCurrent: false,
    description: 'Delivered sales analytics, reconciliation pipelines, and business productivity automations.',
    highlights: [
      'Developed executive sales dashboards in Power BI.',
      'Engineered Python-based reconciliations across e-commerce marketplaces.',
      'Created Power Automate flows and Power Apps for automated business workflows.',
      'Built and deployed SharePoint-based CRM modules.'
    ],
    sortOrder: 3
  }
];

export const fallbackEducation: EducationItem[] = [
  {
    id: 'edu-1',
    degree: 'B.E. in Engineering',
    institution: "Modern Education Society's College of Engineering",
    location: 'Pune',
    score: 'CGPA 8.9',
    details: 'Undergraduate engineering degree with strong foundation in analytical problem-solving, computing, and quantitative analysis.',
    sortOrder: 1
  },
  {
    id: 'edu-2',
    degree: 'HSC (Higher Secondary Certificate)',
    institution: 'Maharashtra State Board',
    location: 'Maharashtra',
    score: '69.7%',
    details: 'Science stream coursework in Mathematics, Physics, and Chemistry.',
    sortOrder: 2
  },
  {
    id: 'edu-3',
    degree: 'SSC (Secondary School Certificate)',
    institution: 'Maharashtra State Board',
    location: 'Maharashtra',
    score: '94.3%',
    details: 'Secondary education completed with distinction.',
    sortOrder: 3
  }
];

export const fallbackCertifications: Certification[] = [
  {
    id: 'cert-1',
    name: 'Microsoft Certified: Fabric Analytics Engineer Associate (DP-600)',
    issuer: 'Microsoft',
    issueYear: '2024',
    credentialUrl: 'https://learn.microsoft.com/en-us/users/shivkanyabyale/credentials',
    badgeImage: '/images/badges/dp-600.svg',
    isPublished: true,
    sortOrder: 1
  }
];

export const fallbackTestimonials: Testimonial[] = [];

export const fallbackProjects: Project[] = [
  {
    id: 'proj-1',
    title: 'Business Performance Analytics Dashboard',
    slug: 'business-performance-analytics-dashboard',
    domain: 'Quick-Commerce / Logistics',
    summary: 'End-to-end performance intelligence dashboard tracking revenue, customer retention, partner delivery times, and peak-hour ordering dynamics.',
    overview: 'A unified analytics solution designed for a fast-paced quick-commerce and logistics operator to monitor sales velocity, customer lifecycle drop-offs, and operational bottlenecks across dense urban hubs.',
    problem: 'The operational leadership lacked real-time visibility into peak-hour order surges, rider fulfillment delays, and cohort-level customer retention patterns, causing missed SLA targets and sub-optimal fleet allocation.',
    solution: 'Architected a multi-page Power BI dashboard connected to PostgreSQL data pipelines, implementing advanced DAX calculations for period-over-period comparisons, customer churn analysis, and fleet utilization matrices.',
    keyFeatures: [
      'Revenue and order trends with dynamic period-over-period (PoP) comparison',
      'Customer growth, retention cohorts, and drop-off funnel analytics',
      'Partner delivery performance tracking and pick-hour density heatmaps',
      'Interactive drill-through by geographic territory and fulfillment hub'
    ],
    responsibilities: [
      'Requirement gathering and stakeholder alignment with operations heads',
      'KPI identification and metric governance',
      'Data modeling in Star schema from normalized PostgreSQL tables',
      'Complex DAX measures for period-over-period calculations and retention metrics',
      'Deployment to Power BI Service with scheduled refresh and stakeholder enablement'
    ],
    techStack: {
      bi: ['Power BI', 'DAX', 'Power Query'],
      data: ['PostgreSQL', 'Star Schema'],
      automation: [],
      tools: ['SSMS', 'Excel'],
      all: ['Power BI', 'PostgreSQL', 'DAX', 'Power Query', 'Star Schema']
    },
    outcome: [
      'Empowered operational leadership with clear visibility into pick-hour volume spikes',
      'Enabled targeted retention strategies by isolating customer drop-off milestones',
      'Reduced manual reporting overhead across territory operations teams'
    ],
    liveDemoUrl: null,
    coverImage: null,
    galleryImages: [],
    status: 'published',
    isFeatured: true,
    sortOrder: 1,
    viewsCount: 142
  },
  {
    id: 'proj-2',
    title: 'Multi-Entity Consolidated Finance Analytics',
    slug: 'multi-entity-consolidated-finance-analytics',
    domain: 'Finance',
    summary: 'Unified global financial reporting suite consolidating 5+ international entities into multi-currency P&L, Balance Sheet, and Trial Balance analytics.',
    overview: 'A comprehensive financial consolidation analytics solution unifying 10+ financial reports across a group of 5+ corporate entities operating in multiple countries.',
    problem: 'Financial statements were fragmented across disparate ERP systems and spreadsheet templates. Consolidating cross-border intercompany transactions, local currencies, and audit-ready trial balances required days of high-risk manual reconciliation each month.',
    solution: 'Engineered an enterprise financial semantic model ingesting data from SAP and Excel workbooks, automating intercompany eliminations and multi-currency conversion to consolidated INR, with drill-down from executive summary to transaction vouchers.',
    keyFeatures: [
      'Multi-layer P&L from high-level board summary down to voucher-level transactions',
      'Balance Sheet, General Ledger (GL), and Trial Balance interactive drill-down',
      'Revenue segmentation by customer, intercompany transactions, and operating entity',
      'Vendor-level purchase and expense analysis separating domestic vs. international vendors',
      'Dual-currency views with local operating currency toggle and consolidated INR reporting',
      'Automated intercompany transaction handling and elimination logic'
    ],
    responsibilities: [
      'Mapped financial chart of accounts across 5+ international entities',
      'Designed resilient data model integrating SAP extracts and structured Excel sources',
      'Authored robust DAX logic for intercompany eliminations and currency conversions',
      'Implemented strict Row-Level Security (RLS) according to entity access boundaries',
      'Conducted comprehensive training sessions for finance and leadership teams'
    ],
    techStack: {
      bi: ['Power BI', 'DAX', 'Power Query', 'RLS'],
      data: ['SAP', 'Financial Semantic Model'],
      automation: [],
      tools: ['Excel', 'DAX Studio'],
      all: ['Power BI', 'SAP', 'Excel', 'DAX', 'Power Query', 'Financial Modeling', 'RLS']
    },
    outcome: [
      'Successfully unified 10+ standalone finance reports into a single trusted source of truth',
      'Consolidated 5+ international entities with automated INR conversion and intercompany eliminations',
      'Significantly streamlined the month-end financial reporting and reconciliation lifecycle'
    ],
    liveDemoUrl: null,
    coverImage: null,
    galleryImages: [],
    status: 'published',
    isFeatured: true,
    sortOrder: 2,
    viewsCount: 218
  },
  {
    id: 'proj-3',
    title: 'Procurement Performance & Spend Analytics',
    slug: 'procurement-performance-spend-analytics',
    domain: 'Procurement & Supply Chain',
    summary: 'Full-lifecycle procurement intelligence tracking Purchase Indents through GRN, vendor reliability, spend variance, and PO aging.',
    overview: 'An end-to-end procurement and supply chain analytics solution monitoring the complete purchase lifecycle from initial requirement generation to goods receipt and payment processing.',
    problem: 'The supply chain team struggled with visibility across disconnected stages (Indents, POs, GRN, Invoices, Inventory). Lack of vendor performance benchmarks and untracked aging purchase orders resulted in material stockouts and unplanned cost variations.',
    solution: 'Developed a centralized Power BI analytics dashboard integrated with REST APIs and inventory registers, providing real-time visibility into requirement-to-procurement gaps, vendor lead times, and open PO aging brackets.',
    keyFeatures: [
      'Full lifecycle visibility across Purchase Indents, POs, Goods Receipt Notes (GRN), Invoices, and Inventory registers',
      'Requirement vs. procurement gap analysis preventing stockouts and over-ordering',
      'Period-over-period inventory holding and turnover analysis',
      'Vendor scorecards evaluating on-time delivery rate, lead time, rejection percentage, average pricing, and overall reliability',
      'Open PO monitoring categorized by aging brackets'
    ],
    responsibilities: [
      'Conducted detailed stakeholder requirement sessions with procurement leads',
      'Connected Power BI to internal procurement APIs and structured registers',
      'Architected dimensional model connecting supply chain stages',
      'Formulated custom DAX measures for vendor scorecard metrics and lead time variance',
      'Trained buyers and supply chain managers on self-service drill-downs'
    ],
    techStack: {
      bi: ['Power BI', 'DAX', 'Power Query'],
      data: ['APIs', 'Inventory Registers'],
      automation: [],
      tools: ['Excel', 'Postman'],
      all: ['Power BI', 'APIs', 'Excel', 'DAX', 'Power Query', 'Supply Chain Analytics']
    },
    outcome: [
      'Provided end-to-end transparency across the entire purchasing and fulfillment cycle',
      'Enabled data-backed vendor contract negotiations using objective performance scorecards',
      'Surfaced aging open POs early to avoid delivery disruptions and production downtime'
    ],
    liveDemoUrl: null,
    coverImage: null,
    galleryImages: [],
    status: 'published',
    isFeatured: true,
    sortOrder: 3,
    viewsCount: 165
  },
  {
    id: 'proj-4',
    title: 'Banking Process Automation (RPA)',
    slug: 'banking-process-automation-rpa',
    domain: 'Banking',
    summary: 'Automated extraction, processing, and alerting pipeline connecting core banking systems with Python, batch scripts, and Power Automate.',
    overview: 'An enterprise robotic process automation workflow developed for a banking client to eliminate high-volume manual data extraction from legacy core banking software and streamline alert dispatch.',
    problem: '[PLACEHOLDER: Detailed description of the specific manual operational bottlenecks, core banking extraction hurdles, and reconciliation time constraints]',
    solution: '[PLACEHOLDER: Detailed architecture of the Power Automate Desktop extraction sequence, Python transformation scripts, batch scheduling, and condition-based email dispatch]',
    keyFeatures: [
      'Automated extraction sequence from a core banking system using Power Automate Desktop',
      'Intermediate data processing and validation powered by Python scripts and batch automation',
      'Condition-based trigger logic evaluating rules for real-time email alerting',
      'Multi-stage error logging and fallback notification mechanism',
      '[PLACEHOLDER: additional automation feature]'
    ],
    responsibilities: [
      'Automated workflow development combining Power Automate Desktop, Cloud Flows, and Python',
      'Batch script integration for scheduled unattended execution',
      'API integrations and secure credential handling',
      '[PLACEHOLDER: additional responsibilities]'
    ],
    techStack: {
      bi: [],
      data: ['Batch Scripts', 'Core Banking Data'],
      automation: ['Power Automate Desktop', 'Power Automate', 'Python', 'RPA'],
      tools: ['Power Automate', 'Python 3', 'Windows Batch'],
      all: ['Power Automate Desktop', 'Power Automate', 'Python', 'Batch Scripts', 'API Integration', 'RPA']
    },
    outcome: [
      '[PLACEHOLDER: Quantified metric, e.g. hours saved per week or percentage reduction in turnaround time]',
      '[PLACEHOLDER: Quantified volume, e.g. number of daily transactions or reports processed]',
      '[PLACEHOLDER: Accuracy improvement or SLA metric]'
    ],
    liveDemoUrl: null,
    coverImage: null,
    galleryImages: [],
    status: 'draft', // DRAFT: Seeded as draft, not shown on public site until published
    isFeatured: false,
    sortOrder: 4,
    viewsCount: 12
  }
];

export const fallbackResumeFiles: ResumeFile[] = [
  {
    id: 'rf-1',
    title: 'Power BI Specialist Resume',
    label: 'Power BI Focus',
    fileUrl: '/resume.pdf',
    isPrimary: true,
    sortOrder: 1
  },
  {
    id: 'rf-2',
    title: 'Power Platform & RPA Resume',
    label: 'Power Platform Focus',
    fileUrl: '/resume.pdf',
    isPrimary: false,
    sortOrder: 2
  },
  {
    id: 'rf-3',
    title: 'Business Analyst & Consulting Resume',
    label: 'Business Analyst Focus',
    fileUrl: '/resume.pdf',
    isPrimary: false,
    sortOrder: 3
  },
  {
    id: 'rf-4',
    title: 'Complete Comprehensive CV',
    label: 'Complete CV',
    fileUrl: '/resume.pdf',
    isPrimary: false,
    sortOrder: 4
  }
];
