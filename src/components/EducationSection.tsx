import { useState } from 'react';
import { GraduationCap, Edit3, Plus, Check, X } from 'lucide-react';
import type { EducationEntry } from '../types/portfolio';

interface EducationSectionProps {
  education: EducationEntry[];
  isEditMode: boolean;
  onUpdateEducation: (updated: EducationEntry) => void;
  onAddEducation: (entry: Omit<EducationEntry, 'id'>) => void;
}

export function EducationSection({
  education,
  isEditMode,
  onUpdateEducation,
  onAddEducation,
}: EducationSectionProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [draft, setDraft] = useState<EducationEntry | null>(null);
  const [showAdd, setShowAdd] = useState(false);

  const startEdit = (entry: EducationEntry) => {
    setEditingId(entry.id);
    setDraft({ ...entry });
  };

  const handleSaveEdit = () => {
    if (draft) {
      onUpdateEducation(draft);
    }
    setEditingId(null);
    setDraft(null);
  };

  const handleAddNew = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const degree = String(formData.get('degree') ?? '').trim();
    const institution = String(formData.get('institution') ?? '').trim();
    const status = String(formData.get('status') ?? '').trim();
    const graduationYear = String(formData.get('graduationYear') ?? '').trim();
    const notes = String(formData.get('notes') ?? '').trim();

    if (!degree || !institution) return;

    onAddEducation({
      degree,
      institution,
      status: status || 'Completed',
      graduationYear: graduationYear || '[Year]',
      notes,
    });
    setShowAdd(false);
  };

  return (
    <section
      id="education"
      className="py-20 sm:py-24 border-b border-slate-200/80 dark:border-white/10 bg-slate-50 dark:bg-[#07080D]"
    >
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-12">
          <div>
            <p className="text-xs font-medium tracking-wide text-violet-600 dark:text-violet-400">
              04. Academic Timeline
            </p>
            <h2 className="mt-2 font-display text-2xl sm:text-3xl font-bold tracking-tight text-slate-950 dark:text-white [text-wrap:balance]">
              Education
            </h2>
            <p className="mt-2 max-w-2xl text-sm text-slate-600 dark:text-slate-400">
              Degree title, college name, current standing, and expected graduation year are directly editable.
            </p>
          </div>

          {isEditMode && (
            <button
              type="button"
              onClick={() => setShowAdd((prev) => !prev)}
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 dark:border-white/10 bg-white dark:bg-[#11131C] px-3.5 py-2 text-xs font-medium text-slate-700 dark:text-slate-200 hover:border-violet-500/50 transition-colors"
            >
              <Plus className="h-3.5 w-3.5" />
              <span>Add Education Milestone</span>
            </button>
          )}
        </div>

        {showAdd && (
          <form
            onSubmit={handleAddNew}
            className="mb-10 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#11131C] p-6 space-y-4"
          >
            <div className="flex items-center justify-between">
              <h3 className="font-display text-base font-semibold text-slate-900 dark:text-white">
                Add Academic Entry
              </h3>
              <button
                type="button"
                onClick={() => setShowAdd(false)}
                aria-label="Cancel"
                className="text-slate-500 hover:text-slate-900 dark:hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                name="degree"
                required
                placeholder="Degree / Program Title"
                className="rounded-lg border border-slate-300 dark:border-white/15 bg-slate-50 dark:bg-[#07080D] px-3.5 py-2.5 text-sm text-slate-900 dark:text-white focus:border-violet-500 focus:outline-none"
              />
              <input
                name="institution"
                required
                placeholder="Institution / School Name"
                className="rounded-lg border border-slate-300 dark:border-white/15 bg-slate-50 dark:bg-[#07080D] px-3.5 py-2.5 text-sm text-slate-900 dark:text-white focus:border-violet-500 focus:outline-none"
              />
              <input
                name="status"
                placeholder="Current Status"
                className="rounded-lg border border-slate-300 dark:border-white/15 bg-slate-50 dark:bg-[#07080D] px-3.5 py-2.5 text-sm text-slate-900 dark:text-white focus:border-violet-500 focus:outline-none"
              />
              <input
                name="graduationYear"
                placeholder="Graduation Year (e.g., 2028)"
                className="rounded-lg border border-slate-300 dark:border-white/15 bg-slate-50 dark:bg-[#07080D] px-3.5 py-2.5 text-sm text-slate-900 dark:text-white focus:border-violet-500 focus:outline-none"
              />
            </div>
            <textarea
              name="notes"
              rows={2}
              placeholder="Coursework or focus areas (optional)"
              className="w-full rounded-lg border border-slate-300 dark:border-white/15 bg-slate-50 dark:bg-[#07080D] px-3.5 py-2.5 text-sm text-slate-900 dark:text-white focus:border-violet-500 focus:outline-none"
            />
            <div className="flex justify-end">
              <button
                type="submit"
                className="rounded-lg bg-gradient-to-r from-violet-600 to-blue-600 px-5 py-2 text-xs font-semibold text-white"
              >
                Save Entry
              </button>
            </div>
          </form>
        )}

        {/* Timeline Spine */}
        <div className="relative space-y-6">
          <div
            aria-hidden="true"
            className="hidden sm:block absolute left-6 top-6 bottom-6 w-px bg-slate-200 dark:bg-white/10"
          />

          {education.map((entry) => {
            const isEditing = editingId === entry.id && draft;

            return (
              <div key={entry.id} className="relative sm:pl-16">
                {/* Timeline Node */}
                <div
                  aria-hidden="true"
                  className="hidden sm:flex absolute left-2 top-6 h-8 w-8 items-center justify-center rounded-full border border-violet-500/40 bg-white dark:bg-[#11131C] text-violet-600 dark:text-violet-400 shadow-sm"
                >
                  <GraduationCap className="h-4 w-4" />
                </div>

                <div className="rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#11131C] p-6 sm:p-7">
                  {isEditing ? (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">
                            Degree Title
                          </label>
                          <input
                            type="text"
                            value={draft.degree}
                            onChange={(e) => setDraft({ ...draft, degree: e.target.value })}
                            className="w-full rounded-lg border border-slate-300 dark:border-white/15 bg-slate-50 dark:bg-[#07080D] px-3.5 py-2 text-sm text-slate-900 dark:text-white focus:border-violet-500 focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">
                            Institution
                          </label>
                          <input
                            type="text"
                            value={draft.institution}
                            onChange={(e) => setDraft({ ...draft, institution: e.target.value })}
                            className="w-full rounded-lg border border-slate-300 dark:border-white/15 bg-slate-50 dark:bg-[#07080D] px-3.5 py-2 text-sm text-slate-900 dark:text-white focus:border-violet-500 focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">
                            Current Status
                          </label>
                          <input
                            type="text"
                            value={draft.status}
                            onChange={(e) => setDraft({ ...draft, status: e.target.value })}
                            className="w-full rounded-lg border border-slate-300 dark:border-white/15 bg-slate-50 dark:bg-[#07080D] px-3.5 py-2 text-sm text-slate-900 dark:text-white focus:border-violet-500 focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">
                            Graduation Year
                          </label>
                          <input
                            type="text"
                            value={draft.graduationYear}
                            onChange={(e) => setDraft({ ...draft, graduationYear: e.target.value })}
                            className="w-full rounded-lg border border-slate-300 dark:border-white/15 bg-slate-50 dark:bg-[#07080D] px-3.5 py-2 text-sm text-slate-900 dark:text-white focus:border-violet-500 focus:outline-none"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">
                          Coursework &amp; Focus Notes
                        </label>
                        <textarea
                          rows={2}
                          value={draft.notes}
                          onChange={(e) => setDraft({ ...draft, notes: e.target.value })}
                          className="w-full rounded-lg border border-slate-300 dark:border-white/15 bg-slate-50 dark:bg-[#07080D] px-3.5 py-2 text-sm text-slate-900 dark:text-white focus:border-violet-500 focus:outline-none"
                        />
                      </div>

                      <div className="flex justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            setEditingId(null);
                            setDraft(null);
                          }}
                          className="rounded-lg border border-slate-200 dark:border-white/10 px-3.5 py-2 text-xs font-medium text-slate-600 dark:text-slate-300"
                        >
                          Cancel
                        </button>
                        <button
                          type="button"
                          onClick={handleSaveEdit}
                          className="inline-flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-violet-600 to-blue-600 px-4 py-2 text-xs font-semibold text-white"
                        >
                          <Check className="h-3.5 w-3.5" />
                          <span>Save Education</span>
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                      <div>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          <span>{entry.status}</span>
                          <span aria-hidden="true" className="mx-1.5">·</span>
                          <span className="font-mono-data">Graduation: {entry.graduationYear}</span>
                        </p>

                        <h3 className="mt-1.5 font-display text-xl font-semibold text-slate-950 dark:text-white">
                          {entry.degree}
                        </h3>

                        <p className="mt-1 text-sm font-medium text-violet-600 dark:text-violet-400">
                          {entry.institution}
                        </p>

                        {entry.notes && (
                          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                            {entry.notes}
                          </p>
                        )}
                      </div>

                      <button
                        type="button"
                        onClick={() => startEdit(entry)}
                        className="inline-flex items-center gap-1.5 self-start rounded-lg border border-slate-200 dark:border-white/10 px-3 py-1.5 text-xs font-medium text-slate-600 dark:text-slate-300 hover:border-violet-500/50 hover:text-violet-600 dark:hover:text-violet-400 transition-colors whitespace-nowrap shrink-0"
                      >
                        <Edit3 className="h-3.5 w-3.5" />
                        <span>Edit</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
