export type SkillCategory = 'Programming' | 'Database' | 'Tools';

export interface SkillItem {
  id: string;
  name: string;
  category: SkillCategory;
  /** Null means the user has not set a proficiency percentage yet (never fabricated). */
  level: number | null;
  note?: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  categoryLabel: string;
  statusLabel: string;
  githubUrl: string;
  imageUrl?: string;
  isEditableTemplate?: boolean;
  highlights?: string[];
}

export interface EducationEntry {
  id: string;
  degree: string;
  institution: string;
  status: string;
  graduationYear: string;
  notes: string;
}

export type AchievementCategory =
  | 'Technical Certifications'
  | 'Workshops'
  | 'Hackathons'
  | 'Research Paper Publications'
  | 'Academic Achievements';

export interface AchievementItem {
  id: string;
  category: AchievementCategory;
  title: string;
  issuer: string;
  date: string;
  description: string;
  isPlaceholder?: boolean;
}

export interface ContactInfo {
  email: string;
  linkedinUrl: string;
  githubUrl: string;
  location: string;
}

export interface ProfileInfo {
  name: string;
  role: string;
  headline: string;
  intro: string;
  typingRoles: string[];
  portraitUrl: string;
  aboutParagraphs: string[];
  aboutFocusAreas: { title: string; detail: string }[];
}

export interface PortfolioData {
  profile: ProfileInfo;
  skills: SkillItem[];
  projects: ProjectItem[];
  education: EducationEntry[];
  achievements: AchievementItem[];
  contact: ContactInfo;
}
