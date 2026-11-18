'use client';

import * as React from 'react';
import { HeroSection } from './hero-section';
import { AboutSection } from './about-section';
import { ServicesSection } from './services-section';
import { HowIWorkSection } from './how-i-work-section';
import { SkillsSection } from './skills-section';
import { ExperienceSection } from './experience-section';
import { ProjectsSection } from './projects-section';
import { CertificationsEducationSection } from './certifications-education-section';
import { TestimonialsSection } from './testimonials-section';
import { ContactSection } from './contact-section';
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
} from '@/lib/types/portfolio';

interface PortfolioContainerProps {
  profile: Profile;
  keyMetrics: KeyMetric[];
  services: ServiceItem[];
  workSteps: WorkStep[];
  skillGroups: SkillGroup[];
  experience: ExperienceItem[];
  education: EducationItem[];
  projects: Project[];
  certifications: Certification[];
  testimonials: Testimonial[];
  resumeFiles: ResumeFile[];
}

export function PortfolioContainer({
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
}: PortfolioContainerProps) {
  const [selectedSkillFilter, setSelectedSkillFilter] = React.useState<string | null>(null);

  const handleSkillSelect = (skillName: string) => {
    setSelectedSkillFilter(skillName);
  };

  const handleClearSkillFilter = () => {
    setSelectedSkillFilter(null);
  };

  return (
    <div className="space-y-0">
      {/* 1. Hero Section */}
      <HeroSection
        profile={profile}
        keyMetrics={keyMetrics}
        resumeFiles={resumeFiles}
      />

      {/* 2. About Section */}
      <AboutSection profile={profile} />

      {/* 3. Services / How I Can Help */}
      <ServicesSection services={services} />

      {/* 4. How I Work (5-Step Horizontal Progression) */}
      <HowIWorkSection steps={workSteps} />

      {/* 5. Skills Section (Grouped chips, filters projects) */}
      <SkillsSection
        skillGroups={skillGroups}
        selectedSkill={selectedSkillFilter}
        onSkillSelect={handleSkillSelect}
      />

      {/* 6. Experience Timeline (Years only, no months) */}
      <ExperienceSection experience={experience} />

      {/* 7. Projects Grid (Dynamic) */}
      <ProjectsSection
        projects={projects}
        activeSkillFilter={selectedSkillFilter}
        onClearSkillFilter={handleClearSkillFilter}
      />

      {/* 8. Certifications & Education */}
      <CertificationsEducationSection
        certifications={certifications}
        education={education}
      />

      {/* 9. Testimonials (Hidden if empty) */}
      <TestimonialsSection testimonials={testimonials} />

      {/* 10. Contact Section */}
      <ContactSection profile={profile} />
    </div>
  );
}
