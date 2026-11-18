export interface Profile {
  id: string;
  fullName: string;
  headline: string;
  valueStatement: string;
  aboutP1: string;
  aboutP2: string;
  currentlyLearning: string;
  email: string;
  location: string;
  linkedinUrl: string;
  closingStatement: string;
  primaryResumeUrl?: string;
  updatedAt?: string;
}

export interface KeyMetric {
  id: string;
  value: string;
  label: string;
  sortOrder: number;
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  sortOrder: number;
}

export interface WorkStep {
  id: string;
  stepNumber: number;
  title: string;
  description: string;
  sortOrder: number;
}

export interface Skill {
  id: string;
  groupId: string;
  name: string;
  filterKey?: string;
  sortOrder: number;
}

export interface SkillGroup {
  id: string;
  name: string;
  sortOrder: number;
  skills: Skill[];
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  location: string;
  startYear: string;
  endYear: string;
  isCurrent: boolean;
  description: string;
  highlights: string[];
  sortOrder: number;
}

export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  location: string;
  score: string;
  details?: string;
  sortOrder: number;
}

export interface Project {
  id: string;
  title: string;
  slug: string;
  domain: string;
  summary: string;
  overview: string;
  problem: string;
  solution: string;
  keyFeatures: string[];
  responsibilities: string[];
  techStack: {
    bi?: string[];
    data?: string[];
    automation?: string[];
    tools?: string[];
    all?: string[];
  } | string[];
  outcome?: string[];
  liveDemoUrl?: string | null;
  coverImage?: string | null;
  galleryImages?: string[];
  status: 'published' | 'draft';
  isFeatured: boolean;
  sortOrder: number;
  viewsCount?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  issueYear: string;
  credentialUrl?: string;
  badgeImage?: string;
  isPublished: boolean;
  sortOrder: number;
}

export interface Testimonial {
  id: string;
  clientName: string;
  clientRole: string;
  company?: string;
  quote: string;
  isPublished: boolean;
  sortOrder: number;
}

export interface ResumeFile {
  id: string;
  title: string;
  label: string;
  fileUrl: string;
  isPrimary: boolean;
  sortOrder: number;
}

export interface ContactMessage {
  id?: string;
  senderName: string;
  senderEmail: string;
  subject?: string;
  message: string;
  createdAt?: string;
}
