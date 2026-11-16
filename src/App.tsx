/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { usePersistentPortfolio } from './hooks/usePersistentPortfolio';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { SkillsSection } from './components/SkillsSection';
import { ProjectsSection } from './components/ProjectsSection';
import { EducationSection } from './components/EducationSection';
import { CertificationsSection } from './components/CertificationsSection';
import { ContactSection } from './components/ContactSection';
import { ResumeModal } from './components/ResumeModal';
import { Footer } from './components/Footer';
import { RevealSection } from './components/RevealSection';
import type {
  AchievementItem,
  ContactInfo,
  EducationEntry,
  ProjectItem,
  SkillItem,
} from './types/portfolio';

export default function App() {
  const { data, setData, theme, toggleTheme, resetPortfolio } =
    usePersistentPortfolio();
  const [isEditMode, setIsEditMode] = useState(false);
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  const handleUpdatePortrait = (portraitUrl: string) => {
    setData((prev) => ({
      ...prev,
      profile: { ...prev.profile, portraitUrl },
    }));
  };

  const handleUpdateAbout = (aboutParagraphs: string[]) => {
    setData((prev) => ({
      ...prev,
      profile: { ...prev.profile, aboutParagraphs },
    }));
  };

  const handleUpdateSkillLevel = (id: string, level: number | null) => {
    setData((prev) => ({
      ...prev,
      skills: prev.skills.map((skill) =>
        skill.id === id ? { ...skill, level } : skill
      ),
    }));
  };

  const handleAddSkill = (skill: Omit<SkillItem, 'id'>) => {
    setData((prev) => ({
      ...prev,
      skills: [
        ...prev.skills,
        { ...skill, id: `skill-${Date.now()}` },
      ],
    }));
  };

  const handleRemoveSkill = (id: string) => {
    setData((prev) => ({
      ...prev,
      skills: prev.skills.filter((skill) => skill.id !== id),
    }));
  };

  const handleUpdateProject = (updated: ProjectItem) => {
    setData((prev) => ({
      ...prev,
      projects: prev.projects.map((p) => (p.id === updated.id ? updated : p)),
    }));
  };

  const handleAddProject = (project: Omit<ProjectItem, 'id'>) => {
    setData((prev) => ({
      ...prev,
      projects: [
        ...prev.projects,
        { ...project, id: `proj-${Date.now()}` },
      ],
    }));
  };

  const handleUpdateEducation = (updated: EducationEntry) => {
    setData((prev) => ({
      ...prev,
      education: prev.education.map((e) => (e.id === updated.id ? updated : e)),
    }));
  };

  const handleAddEducation = (entry: Omit<EducationEntry, 'id'>) => {
    setData((prev) => ({
      ...prev,
      education: [
        ...prev.education,
        { ...entry, id: `edu-${Date.now()}` },
      ],
    }));
  };

  const handleUpdateAchievement = (updated: AchievementItem) => {
    setData((prev) => ({
      ...prev,
      achievements: prev.achievements.map((a) =>
        a.id === updated.id ? updated : a
      ),
    }));
  };

  const handleAddAchievement = (item: Omit<AchievementItem, 'id'>) => {
    setData((prev) => ({
      ...prev,
      achievements: [
        ...prev.achievements,
        { ...item, id: `ach-${Date.now()}` },
      ],
    }));
  };

  const handleDeleteAchievement = (id: string) => {
    setData((prev) => ({
      ...prev,
      achievements: prev.achievements.filter((a) => a.id !== id),
    }));
  };

  const handleUpdateContact = (contact: ContactInfo) => {
    setData((prev) => ({
      ...prev,
      contact,
    }));
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 dark:bg-[#07080D] dark:text-slate-100">
      <Navbar
        name={data.profile.name}
        theme={theme}
        onToggleTheme={toggleTheme}
      />

      <main className="flex-1">
        <HeroSection
          profile={data.profile}
          contact={data.contact}
          theme={theme}
          isEditMode={isEditMode}
          onToggleTheme={toggleTheme}
          onToggleEditMode={() => setIsEditMode((prev) => !prev)}
          onOpenResume={() => setIsResumeOpen(true)}
          onUpdatePortrait={handleUpdatePortrait}
        />

        <RevealSection>
          <AboutSection
            profile={data.profile}
            isEditMode={isEditMode}
            onUpdateAbout={handleUpdateAbout}
          />
        </RevealSection>

        <RevealSection>
          <SkillsSection
            skills={data.skills}
            isEditMode={isEditMode}
            onUpdateSkillLevel={handleUpdateSkillLevel}
            onAddSkill={handleAddSkill}
            onRemoveSkill={handleRemoveSkill}
          />
        </RevealSection>

        <RevealSection>
          <ProjectsSection
            projects={data.projects}
            isEditMode={isEditMode}
            onUpdateProject={handleUpdateProject}
            onAddProject={handleAddProject}
          />
        </RevealSection>

        <RevealSection>
          <EducationSection
            education={data.education}
            isEditMode={isEditMode}
            onUpdateEducation={handleUpdateEducation}
            onAddEducation={handleAddEducation}
          />
        </RevealSection>

        <RevealSection>
          <CertificationsSection
            achievements={data.achievements}
            isEditMode={isEditMode}
            onUpdateAchievement={handleUpdateAchievement}
            onAddAchievement={handleAddAchievement}
            onDeleteAchievement={handleDeleteAchievement}
          />
        </RevealSection>

        <RevealSection>
          <ContactSection
            contact={data.contact}
            onUpdateContact={handleUpdateContact}
          />
        </RevealSection>
      </main>

      <Footer name={data.profile.name} onResetPortfolio={resetPortfolio} />

      {isResumeOpen && (
        <ResumeModal data={data} onClose={() => setIsResumeOpen(false)} />
      )}
    </div>
  );
}
