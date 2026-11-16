import { useState } from 'react';
import { Award, Check, Edit3, Plus, Trash2, X } from 'lucide-react';
import type { AchievementCategory, AchievementItem } from '../types/portfolio';

interface CertificationsSectionProps {
  achievements: AchievementItem[];
  isEditMode: boolean;
  onUpdateAchievement: (updated: AchievementItem) => void;
  onAddAchievement: (item: Omit<AchievementItem, 'id'>) => void;
  onDeleteAchievement: (id: string) => void;
}

const CATEGORIES: AchievementCategory[] = [
  'Technical Certifications',
  'Workshops',
  'Hackathons',
  'Research Paper Publications',
  'Academic Achievements',
];

export function CertificationsSection({
  achievements,
  isEditMode,
  onUpdateAchievement,
  onAddAchievement,
  onDeleteAchievement,
}: CertificationsSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<'All' | AchievementCategory>('All');
  const [editingItem, setEditingItem] = useState<AchievementItem | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);

  const [newCategory, setNewCategory] = useState<AchievementCategory>('Technical Certifications');
  const [newTitle, setNewTitle] = useState('');
  const [newIssuer, setNewIssuer] = useState('');
  const [newDate, setNewDate] = useState('');
  const [newDesc, setNewDesc] = useState('');

  const visibleItems =
    selectedCategory === 'All'
      ? achievements
      : achievements.filter((item) => item.category === selectedCategory);

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem || !editingItem.title.trim()) return;
    onUpdateAchievement({
      ...editingItem,
      title: editingItem.title.trim(),
      issuer: editingItem.issuer.trim() || '[Organization]',
      date: editingItem.date.trim() || '[Year]',
      description: editingItem.description.trim(),
      isPlaceholder: false,
    });
    setEditingItem(null);
  };

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    onAddAchievement({
      category: newCategory,
      title: newTitle.trim(),
      issuer: newIssuer.trim() || '[Organization]',
      date: newDate.trim() || '[Year]',
      description: newDesc.trim(),
      isPlaceholder: false,
    });
    setNewTitle('');
    setNewIssuer('');
    setNewDate('');
    setNewDesc('');
    setShowAddForm(false);
  };

  return (
    <section
      id="certifications"
      className="py-20 sm:py-24 border-b border-slate-200/80 dark:border-white/10 bg-white dark:bg-[#090B11]"
    >
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
          <div>
            <p className="text-xs font-medium tracking-wide text-violet-600 dark:text-violet-400">
              05. Milestones &amp; Recognition
            </p>
            <h2 className="mt-2 font-display text-2xl sm:text-3xl font-bold tracking-tight text-slate-950 dark:text-white [text-wrap:balance]">
              Certifications &amp; Achievements
            </h2>
            <p className="mt-2 max-w-2xl text-sm text-slate-600 dark:text-slate-400">
              Editable sections for technical certifications, workshops, hackathons, research publications, and academic milestones.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setShowAddForm((prev) => !prev)}
            className="inline-flex items-center gap-1.5 self-start lg:self-auto rounded-lg border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-[#11131C] px-4 py-2 text-xs font-medium text-slate-700 dark:text-slate-200 hover:border-violet-500/50 transition-colors whitespace-nowrap shrink-0"
          >
            <Plus className="h-3.5 w-3.5 text-violet-600 dark:text-violet-400" />
            <span>Add Entry</span>
          </button>
        </div>

        {/* Category Filter Tabs */}
        <div
          role="tablist"
          aria-label="Filter certifications and achievements"
          className="mb-8 flex flex-wrap items-center gap-1 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-[#11131C] p-1 w-fit"
        >
          {(['All', ...CATEGORIES] as const).map((cat) => {
            const active = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setSelectedCategory(cat)}
                className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 ${
                  active
                    ? 'bg-gradient-to-r from-violet-600 to-blue-600 text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Add Entry Form */}
        {showAddForm && (
          <form
            onSubmit={handleCreate}
            className="mb-8 rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-[#11131C] p-6 space-y-4"
          >
            <div className="flex items-center justify-between">
              <h3 className="font-display text-base font-semibold text-slate-950 dark:text-white">
                Add Certification or Achievement
              </h3>
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                aria-label="Close form"
                className="text-slate-500 hover:text-slate-900 dark:hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <select
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value as AchievementCategory)}
                aria-label="Category"
                className="rounded-lg border border-slate-300 dark:border-white/15 bg-white dark:bg-[#07080D] px-3 py-2 text-sm text-slate-900 dark:text-white focus:border-violet-500 focus:outline-none"
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
              <input
                type="text"
                required
                placeholder="Title"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className="rounded-lg border border-slate-300 dark:border-white/15 bg-white dark:bg-[#07080D] px-3 py-2 text-sm text-slate-900 dark:text-white focus:border-violet-500 focus:outline-none"
              />
              <input
                type="text"
                placeholder="Issuer / Event"
                value={newIssuer}
                onChange={(e) => setNewIssuer(e.target.value)}
                className="rounded-lg border border-slate-300 dark:border-white/15 bg-white dark:bg-[#07080D] px-3 py-2 text-sm text-slate-900 dark:text-white focus:border-violet-500 focus:outline-none"
              />
              <input
                type="text"
                placeholder="Date / Year"
                value={newDate}
                onChange={(e) => setNewDate(e.target.value)}
                className="rounded-lg border border-slate-300 dark:border-white/15 bg-white dark:bg-[#07080D] px-3 py-2 text-sm text-slate-900 dark:text-white focus:border-violet-500 focus:outline-none"
              />
            </div>

            <textarea
              rows={2}
              placeholder="Summary or verification notes"
              value={newDesc}
              onChange={(e) => setNewDesc(e.target.value)}
              className="w-full rounded-lg border border-slate-300 dark:border-white/15 bg-white dark:bg-[#07080D] px-3 py-2 text-sm text-slate-900 dark:text-white focus:border-violet-500 focus:outline-none"
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

        {/* Entries Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {visibleItems.map((item) => {
            const isEditing = editingItem?.id === item.id;

            return (
              <div
                key={item.id}
                className="flex flex-col justify-between rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50/70 dark:bg-[#11131C] p-6 transition-colors hover:border-violet-500/40"
              >
                {isEditing && editingItem ? (
                  <form onSubmit={handleSaveEdit} className="space-y-3">
                    <select
                      value={editingItem.category}
                      onChange={(e) =>
                        setEditingItem({
                          ...editingItem,
                          category: e.target.value as AchievementCategory,
                        })
                      }
                      className="w-full rounded-lg border border-slate-300 dark:border-white/15 bg-white dark:bg-[#07080D] px-3 py-2 text-xs text-slate-900 dark:text-white"
                    >
                      {CATEGORIES.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                    <input
                      type="text"
                      required
                      value={editingItem.title}
                      onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                      className="w-full rounded-lg border border-slate-300 dark:border-white/15 bg-white dark:bg-[#07080D] px-3 py-2 text-sm text-slate-900 dark:text-white"
                    />
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        value={editingItem.issuer}
                        onChange={(e) => setEditingItem({ ...editingItem, issuer: e.target.value })}
                        placeholder="Issuer"
                        className="rounded-lg border border-slate-300 dark:border-white/15 bg-white dark:bg-[#07080D] px-3 py-2 text-xs text-slate-900 dark:text-white"
                      />
                      <input
                        type="text"
                        value={editingItem.date}
                        onChange={(e) => setEditingItem({ ...editingItem, date: e.target.value })}
                        placeholder="Year"
                        className="rounded-lg border border-slate-300 dark:border-white/15 bg-white dark:bg-[#07080D] px-3 py-2 text-xs text-slate-900 dark:text-white"
                      />
                    </div>
                    <textarea
                      rows={2}
                      value={editingItem.description}
                      onChange={(e) =>
                        setEditingItem({ ...editingItem, description: e.target.value })
                      }
                      className="w-full rounded-lg border border-slate-300 dark:border-white/15 bg-white dark:bg-[#07080D] px-3 py-2 text-xs text-slate-900 dark:text-white"
                    />
                    <div className="flex justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => setEditingItem(null)}
                        className="rounded-lg border border-slate-200 dark:border-white/10 px-3 py-1.5 text-xs text-slate-600 dark:text-slate-300"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="inline-flex items-center gap-1 rounded-lg bg-gradient-to-r from-violet-600 to-blue-600 px-3 py-1.5 text-xs font-semibold text-white"
                      >
                        <Check className="h-3.5 w-3.5" />
                        <span>Save</span>
                      </button>
                    </div>
                  </form>
                ) : (
                  <>
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <p className="text-xs text-violet-600 dark:text-violet-400 font-medium">
                          {item.category}
                        </p>
                        <Award className="h-4 w-4 text-slate-400 dark:text-slate-500 shrink-0" />
                      </div>

                      <h3 className="mt-2 font-display text-base font-semibold text-slate-950 dark:text-white">
                        {item.title}
                      </h3>

                      <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                        <span>{item.issuer}</span>
                        <span aria-hidden="true" className="mx-1.5">·</span>
                        <span className="font-mono-data">{item.date}</span>
                      </p>

                      {item.description && (
                        <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                          {item.description}
                        </p>
                      )}
                    </div>

                    <div className="mt-5 pt-3 border-t border-slate-200 dark:border-white/10 flex items-center justify-between gap-2">
                      <button
                        type="button"
                        onClick={() => setEditingItem({ ...item })}
                        className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-600 dark:text-slate-300 hover:text-violet-600 dark:hover:text-violet-400 transition-colors"
                      >
                        <Edit3 className="h-3.5 w-3.5" />
                        <span>{item.isPlaceholder ? 'Fill Placeholder' : 'Edit'}</span>
                      </button>

                      {isEditMode && (
                        <button
                          type="button"
                          onClick={() => onDeleteAchievement(item.id)}
                          aria-label={`Delete ${item.title}`}
                          className="inline-flex items-center gap-1 text-xs text-slate-400 hover:text-rose-500 transition-colors"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                          <span>Remove</span>
                        </button>
                      )}
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
