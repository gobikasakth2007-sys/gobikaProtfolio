import { useState } from 'react';
import { Code2, Edit3, Check } from 'lucide-react';
import type { ProfileInfo } from '../types/portfolio';
import { SafeImage } from './SafeImage';

interface AboutSectionProps {
  profile: ProfileInfo;
  isEditMode: boolean;
  onUpdateAbout: (paragraphs: string[]) => void;
}

export function AboutSection({ profile, isEditMode, onUpdateAbout }: AboutSectionProps) {
  const [editing, setEditing] = useState(false);
  const [draftText, setDraftText] = useState(profile.aboutParagraphs.join('\n\n'));

  const handleSave = () => {
    const cleaned = draftText
      .split(/\n\s*\n/)
      .map((p) => p.trim())
      .filter(Boolean);
    if (cleaned.length > 0) {
      onUpdateAbout(cleaned);
    }
    setEditing(false);
  };

  return (
    <section
      id="about"
      className="py-20 sm:py-24 border-b border-slate-200/80 dark:border-white/10 bg-white dark:bg-[#090B11]"
    >
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-12">
          <div>
            <p className="text-xs font-medium tracking-wide text-violet-600 dark:text-violet-400">
              01. Background &amp; Mindset
            </p>
            <h2 className="mt-2 font-display text-2xl sm:text-3xl font-bold tracking-tight text-slate-950 dark:text-white [text-wrap:balance]">
              About Me
            </h2>
          </div>

          {(isEditMode || editing) && (
            <button
              type="button"
              onClick={() => {
                if (editing) {
                  handleSave();
                } else {
                  setDraftText(profile.aboutParagraphs.join('\n\n'));
                  setEditing(true);
                }
              }}
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-[#11131C] px-3.5 py-2 text-xs font-medium text-slate-700 dark:text-slate-200 hover:border-violet-500/50 transition-colors"
            >
              {editing ? (
                <>
                  <Check className="h-3.5 w-3.5 text-emerald-500" />
                  <span>Save Bio</span>
                </>
              ) : (
                <>
                  <Edit3 className="h-3.5 w-3.5" />
                  <span>Edit Bio</span>
                </>
              )}
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
          {/* Left Visual Column */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="relative flex-1 min-h-[280px] sm:min-h-[340px] overflow-hidden rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-[#11131C]">
              <SafeImage
                src="/src/assets/images/about_developer_illustration_1794822393308.jpg"
                alt="Minimalist developer and data science workstation illustration"
                fallbackTitle="Software & Data Science Workspace"
                fallbackIcon={<Code2 className="h-12 w-12" />}
                className="h-full w-full object-cover"
              />
            </div>
          </div>

          {/* Right Narrative Column */}
          <div className="lg:col-span-7 flex flex-col justify-between gap-8">
            {editing ? (
              <div className="space-y-3">
                <label
                  htmlFor="about-bio-textarea"
                  className="block text-xs font-medium text-slate-600 dark:text-slate-400"
                >
                  Separate paragraphs with a blank line
                </label>
                <textarea
                  id="about-bio-textarea"
                  rows={8}
                  value={draftText}
                  onChange={(e) => setDraftText(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 dark:border-white/15 bg-slate-50 dark:bg-[#11131C] p-4 text-sm leading-relaxed text-slate-900 dark:text-slate-100 focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/30"
                />
              </div>
            ) : (
              <div className="space-y-4 text-[0.98rem] sm:text-base leading-relaxed text-slate-600 dark:text-slate-300 max-w-[68ch] bg-[#4c0b0b]">
                {profile.aboutParagraphs.map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>
            )}

            {/* Structured Focus Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-slate-200 dark:border-white/10">
              {profile.aboutFocusAreas.map((area) => (
                <div
                  key={area.title}
                  className="rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50/70 dark:bg-[#11131C] p-4"
                >
                  <h3 className="font-display text-sm font-semibold text-slate-900 dark:text-white">
                    {area.title}
                  </h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-slate-600 dark:text-slate-400">
                    {area.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
