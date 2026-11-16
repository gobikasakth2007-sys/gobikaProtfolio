import { useRef, type ChangeEvent } from 'react';
import {
  ArrowRight,
  Download,
  Github,
  Linkedin,
  Moon,
  Sun,
  SlidersHorizontal,
  Upload,
  User,
} from 'lucide-react';
import type { ContactInfo, ProfileInfo } from '../types/portfolio';
import { TypingText } from './TypingText';
import { SafeImage } from './SafeImage';

interface HeroSectionProps {
  profile: ProfileInfo;
  contact: ContactInfo;
  theme: 'dark' | 'light';
  isEditMode: boolean;
  onToggleTheme: () => void;
  onToggleEditMode: () => void;
  onOpenResume: () => void;
  onUpdatePortrait: (dataUrl: string) => void;
}

function isValidExternalUrl(value: string): boolean {
  const trimmed = value.trim();
  return (
    trimmed.length > 0 &&
    !trimmed.startsWith('[') &&
    (trimmed.startsWith('http://') || trimmed.startsWith('https://'))
  );
}

export function HeroSection({
  profile,
  contact,
  theme,
  isEditMode,
  onToggleTheme,
  onToggleEditMode,
  onOpenResume,
  onUpdatePortrait,
}: HeroSectionProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handlePhotoUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        onUpdatePortrait(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const githubValid = isValidExternalUrl(contact.githubUrl);
  const linkedinValid = isValidExternalUrl(contact.linkedinUrl);

  return (
    <section
      id="home"
      className="relative overflow-hidden border-b border-slate-200/80 dark:border-white/10 bg-slate-50 dark:bg-[#07080D]"
    >
      {/* Subtle ambient violet/electric-blue radial accents */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 left-1/4 h-96 w-96 rounded-full bg-violet-600/10 dark:bg-violet-600/15 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 right-1/6 h-80 w-80 rounded-full bg-blue-600/10 dark:bg-blue-600/15 blur-3xl"
      />

      <div className="relative mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8 pt-6 pb-16 sm:pb-24">
        {/* Workspace Utility Toolbar (below header, above fold) */}
        <div className="mb-10 flex flex-wrap items-center justify-between gap-4 border-b border-slate-200/70 dark:border-white/10 pb-4">
          <p className="text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-400">
            Gobika S. <span aria-hidden="true" className="mx-1.5 text-slate-400 dark:text-slate-600">·</span> Data Science &amp; Software Portfolio
          </p>

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={onToggleEditMode}
              aria-pressed={isEditMode}
              className={`inline-flex items-center gap-2 rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 ${
                isEditMode
                  ? 'border-violet-500 bg-violet-600 text-white'
                  : 'border-slate-200 dark:border-white/10 bg-white dark:bg-[#11131C] text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/5'
              }`}
            >
              <SlidersHorizontal className="h-3.5 w-3.5" />
              <span>{isEditMode ? 'Done Editing' : 'Customize Portfolio'}</span>
            </button>

            <button
              type="button"
              onClick={onToggleTheme}
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
              className="inline-flex items-center gap-2 rounded-lg border border-slate-200 dark:border-white/10 bg-white dark:bg-[#11131C] px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/5 transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500"
            >
              {theme === 'dark' ? (
                <>
                  <Sun className="h-3.5 w-3.5 text-amber-400" />
                  <span>Light</span>
                </>
              ) : (
                <>
                  <Moon className="h-3.5 w-3.5 text-violet-600" />
                  <span>Dark</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Two-column Split Hero */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch bg-[#300808]">
          {/* Left Typographic Column */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <p className="text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-400 leading-relaxed">
              {profile.role}
            </p>

            <div className="mt-4 text-base sm:text-lg text-slate-700 dark:text-slate-300">
              <span className="mr-2 text-slate-500 dark:text-slate-400">Currently growing as a</span>
              <TypingText phrases={profile.typingRoles} />
            </div>

            <h1 className="mt-4 font-display text-3xl sm:text-4xl lg:text-[3.1rem] font-bold tracking-tight text-slate-950 dark:text-white leading-[1.12] [text-wrap:balance]">
              {profile.headline}
            </h1>

            <p className="mt-5 max-w-2xl text-base sm:text-[1.0625rem] leading-relaxed text-slate-600 dark:text-slate-300">
              {profile.intro}
            </p>

            {/* Primary & Secondary Action Row */}
            <div className="mt-8 flex flex-wrap items-center gap-3.5">
              <a
                href="#projects"
                className="inline-flex min-h-[44px] items-center gap-2 rounded-lg bg-gradient-to-r from-violet-600 to-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-violet-600/20 transition-all duration-150 hover:from-violet-500 hover:to-blue-500 active:scale-[0.98] whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-[#07080D]"
              >
                <span>View Projects</span>
                <ArrowRight className="h-4 w-4" />
              </a>

              <button
                type="button"
                onClick={onOpenResume}
                className="inline-flex min-h-[44px] items-center gap-2 rounded-lg border border-slate-300 dark:border-white/15 bg-white dark:bg-[#11131C] px-5 py-2.5 text-sm font-semibold text-slate-800 dark:text-slate-100 transition-colors duration-150 hover:border-violet-500/50 hover:bg-slate-100 dark:hover:bg-white/5 active:scale-[0.98] whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500"
              >
                <Download className="h-4 w-4 text-violet-600 dark:text-violet-400" />
                <span>Download Resume</span>
              </button>

              <div className="flex items-center gap-2 pl-1">
                {githubValid ? (
                  <a
                    href={contact.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub Profile"
                    className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-slate-200 dark:border-white/10 bg-white dark:bg-[#11131C] text-slate-700 dark:text-slate-200 hover:border-violet-500/50 hover:text-violet-600 dark:hover:text-violet-400 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500"
                  >
                    <Github className="h-4.5 w-4.5" />
                  </a>
                ) : (
                  <a
                    href="#contact"
                    title="Add your GitHub URL in Contact"
                    aria-label="Configure GitHub URL in Contact section"
                    className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-slate-200 dark:border-white/10 bg-white dark:bg-[#11131C] text-slate-500 dark:text-slate-400 hover:border-violet-500/50 hover:text-violet-600 dark:hover:text-violet-400 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500"
                  >
                    <Github className="h-4.5 w-4.5" />
                  </a>
                )}

                {linkedinValid ? (
                  <a
                    href={contact.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn Profile"
                    className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-slate-200 dark:border-white/10 bg-white dark:bg-[#11131C] text-slate-700 dark:text-slate-200 hover:border-blue-500/50 hover:text-blue-600 dark:hover:text-blue-400 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500"
                  >
                    <Linkedin className="h-4.5 w-4.5" />
                  </a>
                ) : (
                  <a
                    href="#contact"
                    title="Add your LinkedIn URL in Contact"
                    aria-label="Configure LinkedIn URL in Contact section"
                    className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-slate-200 dark:border-white/10 bg-white dark:bg-[#11131C] text-slate-500 dark:text-slate-400 hover:border-blue-500/50 hover:text-blue-600 dark:hover:text-blue-400 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500"
                  >
                    <Linkedin className="h-4.5 w-4.5" />
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Right Portrait Column */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="relative flex-1 min-h-[340px] sm:min-h-[400px] overflow-hidden rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#11131C] shadow-xl shadow-slate-900/5 dark:shadow-black/40">
              <SafeImage
                src={profile.portraitUrl}
                alt={`Portrait of ${profile.name}`}
                fallbackTitle={`${profile.name} — Profile Portrait`}
                fallbackIcon={<User className="h-12 w-12" />}
                className="h-full w-full object-cover object-center"
              />

              {/* Subtle bottom contrast scrim with clean name/status metadata */}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-5">
                <p className="font-display text-lg font-semibold text-white">
                  {profile.name}
                </p>
                <p className="text-xs text-slate-200">
                  Computer Science &amp; Data Science <span aria-hidden="true">·</span> Undergraduate
                </p>
              </div>

              {isEditMode && (
                <div className="absolute top-3 right-3">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    className="sr-only"
                    aria-label="Upload custom profile image"
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-black/75 backdrop-blur-md border border-white/20 px-3 py-1.5 text-xs font-medium text-white hover:bg-black/90 transition-colors"
                  >
                    <Upload className="h-3.5 w-3.5" />
                    <span>Replace Photo</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
