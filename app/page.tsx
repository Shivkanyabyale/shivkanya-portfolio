import {
  getProfile,
  getKeyMetrics,
  getServices,
  getWorkSteps,
  getSkillGroups,
  getExperience,
  getEducation,
  getProjects,
  getCertifications,
  getTestimonials,
  getResumeFiles,
} from '@/lib/supabase/data-service';
import { PortfolioContainer } from '@/components/portfolio-container';

export const revalidate = 60; // Incremental Static Regeneration every 60 seconds

export default async function HomePage() {
  const [
    profile,
    keyMetrics,
    services,
    workSteps,
    skillGroups,
    experience,
    education,
    projects,
    certifications,
    testimonials,
    resumeFiles,
  ] = await Promise.all([
    getProfile(),
    getKeyMetrics(),
    getServices(),
    getWorkSteps(),
    getSkillGroups(),
    getExperience(),
    getEducation(),
    getProjects({ includeDrafts: false }),
    getCertifications(),
    getTestimonials(),
    getResumeFiles(),
  ]);

  return (
    <main className="min-h-screen">
      <PortfolioContainer
        profile={profile}
        keyMetrics={keyMetrics}
        services={services}
        workSteps={workSteps}
        skillGroups={skillGroups}
        experience={experience}
        education={education}
        projects={projects}
        certifications={certifications}
        testimonials={testimonials}
        resumeFiles={resumeFiles}
      />
    </main>
  );
}
