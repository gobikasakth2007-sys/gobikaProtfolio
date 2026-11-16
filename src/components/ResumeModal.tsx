import { Download, Printer, X } from 'lucide-react';
import type { PortfolioData } from '../types/portfolio';

interface ResumeModalProps {
  data: PortfolioData;
  onClose: () => void;
}

export function ResumeModal({ data, onClose }: ResumeModalProps) {
  const { profile, skills, projects, education, achievements, contact } = data;

  const handleDownloadTxt = () => {
    const lines: string[] = [
      profile.name.toUpperCase(),
      profile.role,
      `Email: ${contact.email} | LinkedIn: ${contact.linkedinUrl} | GitHub: ${contact.githubUrl}`,
      '',
      'SUMMARY',
      profile.intro,
      '',
      'EDUCATION',
      ...education.map(
        (e) => `- ${e.degree} | ${e.institution} | ${e.status} | Expected Graduation: ${e.graduationYear}`
      ),
      '',
      'TECHNICAL SKILLS',
      `Programming: ${skills
        .filter((s) => s.category === 'Programming')
        .map((s) => s.name)
        .join(', ')}`,
      `Database: ${skills
        .filter((s) => s.category === 'Database')
        .map((s) => s.name)
        .join(', ')}`,
      `Tools: ${skills
        .filter((s) => s.category === 'Tools')
        .map((s) => s.name)
        .join(', ')}`,
      '',
      'PROJECTS',
      ...projects
        .filter((p) => !p.isEditableTemplate)
        .map(
          (p) =>
            `- ${p.title} (${p.technologies.join(', ')})\n  ${p.description}${
              p.githubUrl ? `\n  GitHub: ${p.githubUrl}` : ''
            }`
        ),
      '',
      'CERTIFICATIONS & ACHIEVEMENTS',
      ...achievements
        .filter((a) => !a.isPlaceholder)
        .map((a) => `- [${a.category}] ${a.title} — ${a.issuer} (${a.date})`),
    ];

    const blob = new Blob([lines.join('\n')], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Gobika_S_Resume.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const completedAchievements = achievements.filter((a) => !a.isPlaceholder);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="resume-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden rounded-2xl border border-slate-200 dark:border-white/15 bg-white dark:bg-[#11131C] shadow-2xl"
      >
        {/* Modal Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 dark:border-white/10 px-6 py-4">
          <h2 id="resume-modal-title" className="font-display text-base font-semibold text-slate-950 dark:text-white">
            Resume Preview
          </h2>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => window.print()}
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 dark:border-white/10 px-3.5 py-2 text-xs font-medium text-slate-700 dark:text-slate-200 hover:border-violet-500/50 transition-colors"
            >
              <Printer className="h-3.5 w-3.5" />
              <span>Print / Save PDF</span>
            </button>
            <button
              type="button"
              onClick={handleDownloadTxt}
              className="inline-flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-violet-600 to-blue-600 px-3.5 py-2 text-xs font-semibold text-white hover:from-violet-500 hover:to-blue-500 transition-colors"
            >
              <Download className="h-3.5 w-3.5" />
              <span>Download (.txt)</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close resume modal"
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 dark:border-white/10 text-slate-500 hover:text-slate-950 dark:hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Printable Resume Sheet */}
        <div
          id="printable-resume"
          className="overflow-y-auto p-6 sm:p-10 bg-white text-slate-900 space-y-6 text-sm"
        >
          <div className="border-b border-slate-200 pb-5">
            <h3 className="font-display text-2xl font-bold text-slate-950">{profile.name}</h3>
            <p className="mt-1 text-xs font-medium text-violet-700">{profile.role}</p>
            <p className="mt-2 text-xs text-slate-600">
              Email: {contact.email} · LinkedIn: {contact.linkedinUrl} · GitHub: {contact.githubUrl}
            </p>
          </div>

          <div>
            <h4 className="font-display text-xs font-bold uppercase tracking-wider text-slate-500">
              Profile Summary
            </h4>
            <p className="mt-1.5 leading-relaxed text-slate-700">{profile.intro}</p>
          </div>

          <div>
            <h4 className="font-display text-xs font-bold uppercase tracking-wider text-slate-500">
              Education
            </h4>
            <div className="mt-2 space-y-2">
              {education.map((edu) => (
                <div key={edu.id} className="flex flex-wrap items-baseline justify-between gap-2">
                  <div>
                    <span className="font-semibold text-slate-900">{edu.degree}</span>
                    <span className="text-slate-600"> — {edu.institution}</span>
                  </div>
                  <span className="text-xs text-slate-500">
                    {edu.status} · Graduation: {edu.graduationYear}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-display text-xs font-bold uppercase tracking-wider text-slate-500">
              Technical Skills
            </h4>
            <div className="mt-2 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-slate-700">
              <div>
                <span className="font-semibold text-slate-900">Programming: </span>
                {skills
                  .filter((s) => s.category === 'Programming')
                  .map((s) => s.name)
                  .join(', ')}
              </div>
              <div>
                <span className="font-semibold text-slate-900">Database: </span>
                {skills
                  .filter((s) => s.category === 'Database')
                  .map((s) => s.name)
                  .join(', ')}
              </div>
              <div>
                <span className="font-semibold text-slate-900">Tools: </span>
                {skills
                  .filter((s) => s.category === 'Tools')
                  .map((s) => s.name)
                  .join(', ')}
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-display text-xs font-bold uppercase tracking-wider text-slate-500">
              Projects
            </h4>
            <div className="mt-2 space-y-3">
              {projects
                .filter((p) => !p.isEditableTemplate)
                .map((proj) => (
                  <div key={proj.id}>
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <span className="font-semibold text-slate-900">{proj.title}</span>
                      <span className="text-xs text-slate-500">{proj.technologies.join(' · ')}</span>
                    </div>
                    <p className="mt-1 text-xs leading-relaxed text-slate-600">
                      {proj.description}
                    </p>
                  </div>
                ))}
            </div>
          </div>

          {completedAchievements.length > 0 && (
            <div>
              <h4 className="font-display text-xs font-bold uppercase tracking-wider text-slate-500">
                Certifications &amp; Achievements
              </h4>
              <ul className="mt-2 space-y-1.5 text-xs text-slate-700 list-disc pl-4">
                {completedAchievements.map((ach) => (
                  <li key={ach.id}>
                    <span className="font-medium text-slate-900">{ach.title}</span> ({ach.category} · {ach.issuer} · {ach.date})
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
