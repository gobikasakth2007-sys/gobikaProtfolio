import { useState } from 'react';
import { Plus, SlidersHorizontal, Trash2, Check, X } from 'lucide-react';
import type { SkillCategory, SkillItem } from '../types/portfolio';

interface SkillsSectionProps {
  skills: SkillItem[];
  isEditMode: boolean;
  onUpdateSkillLevel: (id: string, level: number | null) => void;
  onAddSkill: (skill: Omit<SkillItem, 'id'>) => void;
  onRemoveSkill: (id: string) => void;
}

const CATEGORIES: ('All' | SkillCategory)[] = ['All', 'Programming', 'Database', 'Tools'];

export function SkillsSection({
  skills,
  isEditMode,
  onUpdateSkillLevel,
  onAddSkill,
  onRemoveSkill,
}: SkillsSectionProps) {
  const [activeCategory, setActiveCategory] = useState<'All' | SkillCategory>('All');
  const [editingSkillId, setEditingSkillId] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newName, setNewName] = useState('');
  const [newCategory, setNewCategory] = useState<SkillCategory>('Programming');
  const [newNote, setNewNote] = useState('');
  const [newLevel, setNewLevel] = useState<string>('');

  const filteredSkills =
    activeCategory === 'All'
      ? skills
      : skills.filter((s) => s.category === activeCategory);

  const handleCreateSkill = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = newName.trim();
    if (!trimmed) return;
    const parsedLevel = newLevel.trim() === '' ? null : Math.min(100, Math.max(0, Number(newLevel)));
    onAddSkill({
      name: trimmed,
      category: newCategory,
      level: Number.isNaN(parsedLevel as number) ? null : parsedLevel,
      note: newNote.trim() || undefined,
    });
    setNewName('');
    setNewNote('');
    setNewLevel('');
    setShowAddForm(false);
  };

  return (
    <section
      id="skills"
      className="py-20 sm:py-24 border-b border-slate-200/80 dark:border-white/10 bg-slate-50 dark:bg-[#07080D]"
    >
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <p className="text-xs font-medium tracking-wide text-violet-600 dark:text-violet-400">
              02. Technical Stack
            </p>
            <h2 className="mt-2 font-display text-2xl sm:text-3xl font-bold tracking-tight text-slate-950 dark:text-white [text-wrap:balance]">
              Skills &amp; Developer Tools
            </h2>
            <p className="mt-2 max-w-2xl text-sm text-slate-600 dark:text-slate-400">
              Core languages, relational database technology, and workflow tools. Skill proficiency levels are intentionally editable so you can set honest self-assessments anytime.
            </p>
          </div>

          {/* Interactive Category Filter Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            <div
              role="tablist"
              aria-label="Filter skills by category"
              className="inline-flex items-center gap-1 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#11131C] p-1"
            >
              {CATEGORIES.map((cat) => {
                const isActive = activeCategory === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setActiveCategory(cat)}
                    className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 ${
                      isActive
                        ? 'bg-gradient-to-r from-violet-600 to-blue-600 text-white shadow-sm'
                        : 'text-slate-600 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white'
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>

            {isEditMode && (
              <button
                type="button"
                onClick={() => setShowAddForm((prev) => !prev)}
                className="inline-flex items-center gap-1.5 rounded-xl border border-violet-500/40 bg-violet-600/10 px-3.5 py-2 text-xs font-medium text-violet-700 dark:text-violet-300 hover:bg-violet-600/20 transition-colors whitespace-nowrap shrink-0"
              >
                <Plus className="h-3.5 w-3.5" />
                <span>Add Skill</span>
              </button>
            )}
          </div>
        </div>

        {/* Add Skill Inline Form */}
        {showAddForm && (
          <form
            onSubmit={handleCreateSkill}
            className="mb-8 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#11131C] p-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 items-end"
          >
            <div>
              <label htmlFor="new-skill-name" className="block text-xs font-medium text-slate-600 dark:text-slate-300 mb-1.5">
                Skill Name
              </label>
              <input
                id="new-skill-name"
                type="text"
                required
                placeholder="e.g., Spring Boot"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                className="w-full rounded-lg border border-slate-300 dark:border-white/15 bg-slate-50 dark:bg-[#07080D] px-3 py-2 text-sm text-slate-900 dark:text-white focus:border-violet-500 focus:outline-none"
              />
            </div>

            <div>
              <label htmlFor="new-skill-category" className="block text-xs font-medium text-slate-600 dark:text-slate-300 mb-1.5">
                Category
              </label>
              <select
                id="new-skill-category"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value as SkillCategory)}
                className="w-full rounded-lg border border-slate-300 dark:border-white/15 bg-slate-50 dark:bg-[#07080D] px-3 py-2 text-sm text-slate-900 dark:text-white focus:border-violet-500 focus:outline-none"
              >
                <option value="Programming">Programming</option>
                <option value="Database">Database</option>
                <option value="Tools">Tools</option>
              </select>
            </div>

            <div>
              <label htmlFor="new-skill-note" className="block text-xs font-medium text-slate-600 dark:text-slate-300 mb-1.5">
                Focus Note (optional)
              </label>
              <input
                id="new-skill-note"
                type="text"
                placeholder="e.g., REST APIs"
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                className="w-full rounded-lg border border-slate-300 dark:border-white/15 bg-slate-50 dark:bg-[#07080D] px-3 py-2 text-sm text-slate-900 dark:text-white focus:border-violet-500 focus:outline-none"
              />
            </div>

            <div>
              <label htmlFor="new-skill-level" className="block text-xs font-medium text-slate-600 dark:text-slate-300 mb-1.5">
                Proficiency % (optional)
              </label>
              <input
                id="new-skill-level"
                type="number"
                min={0}
                max={100}
                placeholder="Leave blank if unset"
                value={newLevel}
                onChange={(e) => setNewLevel(e.target.value)}
                className="w-full rounded-lg border border-slate-300 dark:border-white/15 bg-slate-50 dark:bg-[#07080D] px-3 py-2 text-sm text-slate-900 dark:text-white focus:border-violet-500 focus:outline-none"
              />
            </div>

            <div className="flex items-center gap-2">
              <button
                type="submit"
                className="flex-1 rounded-lg bg-gradient-to-r from-violet-600 to-blue-600 px-4 py-2 text-xs font-semibold text-white hover:from-violet-500 hover:to-blue-500 transition-colors"
              >
                Save Skill
              </button>
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                aria-label="Cancel adding skill"
                className="rounded-lg border border-slate-200 dark:border-white/10 p-2 text-slate-500 hover:text-slate-900 dark:hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </form>
        )}

        {/* Skills Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {filteredSkills.map((skill) => {
            const isEditingThis = isEditMode || editingSkillId === skill.id;
            const hasLevel = skill.level !== null;

            return (
              <div
                key={skill.id}
                className="group rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#11131C] p-5 transition-colors duration-150 hover:border-violet-500/40"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {skill.category}
                      {skill.note ? (
                        <>
                          <span aria-hidden="true" className="mx-1.5">·</span>
                          <span>{skill.note}</span>
                        </>
                      ) : null}
                    </p>
                    <h3 className="mt-1 font-display text-lg font-semibold text-slate-950 dark:text-white">
                      {skill.name}
                    </h3>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() =>
                        setEditingSkillId((prev) => (prev === skill.id ? null : skill.id))
                      }
                      aria-label={`Adjust level for ${skill.name}`}
                      title="Set or edit proficiency level"
                      className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5 hover:text-violet-600 dark:hover:text-violet-400 transition-colors"
                    >
                      {editingSkillId === skill.id ? (
                        <Check className="h-4 w-4 text-emerald-500" />
                      ) : (
                        <SlidersHorizontal className="h-3.5 w-3.5" />
                      )}
                    </button>

                    {isEditMode && (
                      <button
                        type="button"
                        onClick={() => onRemoveSkill(skill.id)}
                        aria-label={`Remove ${skill.name}`}
                        className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-rose-500/10 hover:text-rose-500 transition-colors"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    )}
                  </div>
                </div>

                {/* Animated Progress Track (Compositor transform only) */}
                <div className="mt-5">
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="text-slate-500 dark:text-slate-400">Proficiency</span>
                    <span className="font-mono-data font-medium text-slate-800 dark:text-slate-200">
                      {hasLevel ? `${skill.level}%` : 'Editable · Not set'}
                    </span>
                  </div>

                  <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-white/10">
                    <div
                      className="h-full w-full origin-left rounded-full bg-gradient-to-r from-violet-600 to-blue-500 transition-transform duration-300 ease-out"
                      style={{
                        transform: `scaleX(${hasLevel ? (skill.level ?? 0) / 100 : 0})`,
                      }}
                    />
                  </div>
                </div>

                {/* Interactive Level Control */}
                {isEditingThis && (
                  <div className="mt-4 pt-3 border-t border-slate-200 dark:border-white/10 space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <label
                        htmlFor={`range-${skill.id}`}
                        className="text-[11px] font-medium text-slate-600 dark:text-slate-400"
                      >
                        Set level
                      </label>
                      {hasLevel && (
                        <button
                          type="button"
                          onClick={() => onUpdateSkillLevel(skill.id, null)}
                          className="text-[11px] text-slate-500 hover:text-slate-900 dark:hover:text-white underline"
                        >
                          Clear
                        </button>
                      )}
                    </div>
                    <input
                      id={`range-${skill.id}`}
                      type="range"
                      min={0}
                      max={100}
                      step={5}
                      value={skill.level ?? 0}
                      onChange={(e) => onUpdateSkillLevel(skill.id, Number(e.target.value))}
                      className="w-full accent-violet-600 cursor-pointer"
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
