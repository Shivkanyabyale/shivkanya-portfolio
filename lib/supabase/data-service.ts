import { createServerSupabaseClient } from './server';
import {
  fallbackProfile,
  fallbackKeyMetrics,
  fallbackServices,
  fallbackWorkSteps,
  fallbackSkillGroups,
  fallbackExperience,
  fallbackEducation,
  fallbackCertifications,
  fallbackProjects,
  fallbackTestimonials,
  fallbackResumeFiles,
} from '../data/fallback-data';
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
  ResumeFile,
  ContactMessage,
} from '../types/portfolio';

export async function getProfile(): Promise<Profile> {
  try {
    const supabase = createServerSupabaseClient();
    if (supabase) {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .limit(1)
        .maybeSingle();

      if (data && !error) {
        return {
          id: data.id,
          fullName: data.full_name,
          headline: data.headline,
          valueStatement: data.value_statement,
          aboutP1: data.about_p1,
          aboutP2: data.about_p2,
          currentlyLearning: data.currently_learning,
          email: data.email,
          location: data.location,
          linkedinUrl: data.linkedin_url,
          closingStatement: data.closing_statement,
          primaryResumeUrl: data.primary_resume_url || fallbackProfile.primaryResumeUrl,
          updatedAt: data.updated_at,
        };
      }
    }
  } catch (err) {
    console.warn('Using fallback profile data:', err);
  }
  return fallbackProfile;
}

export async function getKeyMetrics(): Promise<KeyMetric[]> {
  try {
    const supabase = createServerSupabaseClient();
    if (supabase) {
      const { data, error } = await supabase
        .from('key_metrics')
        .select('*')
        .order('sort_order', { ascending: true });

      if (data && !error && data.length > 0) {
        return data.map((item) => ({
          id: item.id,
          value: item.metric_value,
          label: item.metric_label,
          sortOrder: item.sort_order,
        }));
      }
    }
  } catch (err) {
    console.warn('Using fallback key metrics:', err);
  }
  return fallbackKeyMetrics;
}

export async function getServices(): Promise<ServiceItem[]> {
  try {
    const supabase = createServerSupabaseClient();
    if (supabase) {
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .order('sort_order', { ascending: true });

      if (data && !error && data.length > 0) {
        return data.map((item) => ({
          id: item.id,
          title: item.title,
          description: item.description,
          icon: item.icon,
          sortOrder: item.sort_order,
        }));
      }
    }
  } catch (err) {
    console.warn('Using fallback services:', err);
  }
  return fallbackServices;
}

export async function getWorkSteps(): Promise<WorkStep[]> {
  try {
    const supabase = createServerSupabaseClient();
    if (supabase) {
      const { data, error } = await supabase
        .from('work_steps')
        .select('*')
        .order('sort_order', { ascending: true });

      if (data && !error && data.length > 0) {
        return data.map((item) => ({
          id: item.id,
          stepNumber: item.step_number,
          title: item.title,
          description: item.description,
          sortOrder: item.sort_order,
        }));
      }
    }
  } catch (err) {
    console.warn('Using fallback work steps:', err);
  }
  return fallbackWorkSteps;
}

export async function getSkillGroups(): Promise<SkillGroup[]> {
  try {
    const supabase = createServerSupabaseClient();
    if (supabase) {
      const { data: groups, error: grpError } = await supabase
        .from('skill_groups')
        .select('*, skills(*)')
        .order('sort_order', { ascending: true });

      if (groups && !grpError && groups.length > 0) {
        return groups.map((g: any) => ({
          id: g.id,
          name: g.name,
          sortOrder: g.sort_order,
          skills: (g.skills || [])
            .sort((a: any, b: any) => a.sort_order - b.sort_order)
            .map((s: any) => ({
              id: s.id,
              groupId: s.group_id,
              name: s.name,
              filterKey: s.filter_key || s.name,
              sortOrder: s.sort_order,
            })),
        }));
      }
    }
  } catch (err) {
    console.warn('Using fallback skill groups:', err);
  }
  return fallbackSkillGroups;
}

export async function getExperience(): Promise<ExperienceItem[]> {
  try {
    const supabase = createServerSupabaseClient();
    if (supabase) {
      const { data, error } = await supabase
        .from('experience')
        .select('*')
        .order('sort_order', { ascending: true });

      if (data && !error && data.length > 0) {
        return data.map((item) => ({
          id: item.id,
          role: item.role,
          company: item.company,
          location: item.location,
          startYear: item.start_year,
          endYear: item.end_year,
          isCurrent: item.is_current,
          description: item.description,
          highlights: Array.isArray(item.highlights) ? item.highlights : [],
          sortOrder: item.sort_order,
        }));
      }
    }
  } catch (err) {
    console.warn('Using fallback experience:', err);
  }
  return fallbackExperience;
}

export async function getEducation(): Promise<EducationItem[]> {
  try {
    const supabase = createServerSupabaseClient();
    if (supabase) {
      const { data, error } = await supabase
        .from('education')
        .select('*')
        .order('sort_order', { ascending: true });

      if (data && !error && data.length > 0) {
        return data.map((item) => ({
          id: item.id,
          degree: item.degree,
          institution: item.institution,
          location: item.location,
          score: item.score,
          details: item.details,
          sortOrder: item.sort_order,
        }));
      }
    }
  } catch (err) {
    console.warn('Using fallback education:', err);
  }
  return fallbackEducation;
}

export async function getCertifications(): Promise<Certification[]> {
  try {
    const supabase = createServerSupabaseClient();
    if (supabase) {
      const { data, error } = await supabase
        .from('certifications')
        .select('*')
        .eq('is_published', true)
        .order('sort_order', { ascending: true });

      if (data && !error && data.length > 0) {
        return data.map((item) => ({
          id: item.id,
          name: item.name,
          issuer: item.issuer,
          issueYear: item.issue_year,
          credentialUrl: item.credential_url,
          badgeImage: item.badge_image,
          isPublished: item.is_published,
          sortOrder: item.sort_order,
        }));
      }
    }
  } catch (err) {
    console.warn('Using fallback certifications:', err);
  }
  return fallbackCertifications;
}

export async function getProjects(options: { includeDrafts?: boolean } = {}): Promise<Project[]> {
  const { includeDrafts = false } = options;
  try {
    const supabase = createServerSupabaseClient();
    if (supabase) {
      let query = supabase.from('projects').select('*').order('sort_order', { ascending: true });

      if (!includeDrafts) {
        query = query.eq('status', 'published');
      }

      const { data, error } = await query;
      if (data && !error && data.length > 0) {
        return data.map((item) => ({
          id: item.id,
          title: item.title,
          slug: item.slug,
          domain: item.domain,
          summary: item.summary,
          overview: item.overview,
          problem: item.problem,
          solution: item.solution,
          keyFeatures: Array.isArray(item.key_features) ? item.key_features : [],
          responsibilities: Array.isArray(item.responsibilities) ? item.responsibilities : [],
          techStack: item.tech_stack || [],
          outcome: Array.isArray(item.outcome) ? item.outcome : [],
          liveDemoUrl: item.live_demo_url,
          coverImage: item.cover_image,
          galleryImages: Array.isArray(item.gallery_images) ? item.gallery_images : [],
          status: item.status,
          isFeatured: item.is_featured,
          sortOrder: item.sort_order,
          viewsCount: item.views_count || 0,
          createdAt: item.created_at,
          updatedAt: item.updated_at,
        }));
      }
    }
  } catch (err) {
    console.warn('Using fallback projects:', err);
  }

  if (includeDrafts) {
    return fallbackProjects;
  }
  return fallbackProjects.filter((p) => p.status === 'published');
}

export async function getProjectBySlug(slug: string, options: { includeDrafts?: boolean } = {}): Promise<Project | null> {
  const { includeDrafts = false } = options;
  try {
    const supabase = createServerSupabaseClient();
    if (supabase) {
      let query = supabase.from('projects').select('*').eq('slug', slug);
      if (!includeDrafts) {
        query = query.eq('status', 'published');
      }
      const { data, error } = await query.maybeSingle();
      if (data && !error) {
        return {
          id: data.id,
          title: data.title,
          slug: data.slug,
          domain: data.domain,
          summary: data.summary,
          overview: data.overview,
          problem: data.problem,
          solution: data.solution,
          keyFeatures: Array.isArray(data.key_features) ? data.key_features : [],
          responsibilities: Array.isArray(data.responsibilities) ? data.responsibilities : [],
          techStack: data.tech_stack || [],
          outcome: Array.isArray(data.outcome) ? data.outcome : [],
          liveDemoUrl: data.live_demo_url,
          coverImage: data.cover_image,
          galleryImages: Array.isArray(data.gallery_images) ? data.gallery_images : [],
          status: data.status,
          isFeatured: data.is_featured,
          sortOrder: data.sort_order,
          viewsCount: data.views_count || 0,
          createdAt: data.created_at,
          updatedAt: data.updated_at,
        };
      }
    }
  } catch (err) {
    console.warn(`Using fallback for project slug ${slug}:`, err);
  }

  const project = fallbackProjects.find((p) => p.slug === slug);
  if (!project) return null;
  if (!includeDrafts && project.status !== 'published') return null;
  return project;
}

export async function getTestimonials(): Promise<Testimonial[]> {
  try {
    const supabase = createServerSupabaseClient();
    if (supabase) {
      const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .eq('is_published', true)
        .order('sort_order', { ascending: true });

      if (data && !error && data.length > 0) {
        return data.map((item) => ({
          id: item.id,
          clientName: item.client_name,
          clientRole: item.client_role,
          company: item.company,
          quote: item.quote,
          isPublished: item.is_published,
          sortOrder: item.sort_order,
        }));
      }
    }
  } catch (err) {
    console.warn('Using fallback testimonials:', err);
  }
  return fallbackTestimonials;
}

export async function getResumeFiles(): Promise<ResumeFile[]> {
  try {
    const supabase = createServerSupabaseClient();
    if (supabase) {
      const { data, error } = await supabase
        .from('resume_files')
        .select('*')
        .order('sort_order', { ascending: true });

      if (data && !error && data.length > 0) {
        return data.map((item) => ({
          id: item.id,
          title: item.title,
          label: item.label,
          fileUrl: item.file_url,
          isPrimary: item.is_primary,
          sortOrder: item.sort_order,
        }));
      }
    }
  } catch (err) {
    console.warn('Using fallback resume files:', err);
  }
  return fallbackResumeFiles;
}

export async function submitContactMessage(message: ContactMessage): Promise<{ success: boolean; error?: string }> {
  try {
    const supabase = createServerSupabaseClient();
    if (supabase) {
      const { error } = await supabase.from('contact_messages').insert([
        {
          sender_name: message.senderName,
          sender_email: message.senderEmail,
          subject: message.subject || 'Portfolio Inquiry',
          message: message.message,
        },
      ]);
      if (error) throw error;
      return { success: true };
    }
  } catch (err: any) {
    console.error('Failed to submit contact message to Supabase:', err);
    return { success: false, error: err.message || 'Submission error' };
  }
  return { success: true };
}
